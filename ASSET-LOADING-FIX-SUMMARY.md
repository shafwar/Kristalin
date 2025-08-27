# Asset Loading Fix Summary

## Problem Analysis

**Issue:** Laravel + Inertia + React + Vite project with asset loading issues in production (Railway + Cloudflare). Assets return 404 because Laravel tries to load from `/assets/` instead of `/build/assets/`.

**Root Cause:** Missing `ASSET_URL` environment variable in production, causing Laravel to serve assets from the wrong path.

## Changes Made

### 1. **Environment Configuration** (`env.example`)

```bash
# Added ASSET_URL for production
ASSET_URL=https://your-app-name.railway.app/build
```

### 2. **Vite Configuration** (`vite.config.ts`)

**Improvements:**

- ✅ Base URL already correctly set to `/build/` in production
- ✅ Added explicit `buildDirectory: 'build'` to Laravel plugin
- ✅ Improved asset file naming and chunking
- ✅ Better TypeScript error handling

**Key Configuration:**

```typescript
base: mode === 'production' ? '/build/' : '/',
plugins: [
  laravel({
    input: ['resources/css/app.css', 'resources/js/app.tsx'],
    refresh: true,
    buildDirectory: 'build', // Explicit build directory
  }),
  // ...
],
build: {
  outDir: 'public/build',
  assetsDir: 'assets',
  // Improved asset optimization
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (!assetInfo.name) return 'assets/[name]-[hash].[ext]'
        const info = assetInfo.name.split('.')
        const ext = info[info.length - 1]
        return `assets/[name]-[hash].${ext}`
      },
      chunkFileNames: 'assets/[name]-[hash].js',
      entryFileNames: 'assets/[name]-[hash].js',
    },
  },
}
```

### 3. **Laravel Vite Configuration** (`config/vite.php`)

**Updated manifest path:**

```php
'manifest' => public_path('build/.vite/manifest.json'),
```

### 4. **Deployment Script** (`deploy.sh`)

**Enhanced deployment process:**

- Asset build verification
- Proper permissions setting
- Environment variable reminders
- Error handling for failed builds

### 5. **Railway Configuration** (`railway.toml`)

**Production-ready configuration:**

```toml
[env]
ASSET_URL = "https://${{RAILWAY_PUBLIC_DOMAIN}}/build"
NODE_ENV = "production"
APP_ENV = "production"
```

## How It Works

### **Development:**

- Vite serves assets from `/` (root)
- Hot module replacement works normally
- No `ASSET_URL` needed

### **Production:**

1. **Build Process:** Vite builds assets to `public/build/assets/`
2. **Asset URL:** Laravel uses `ASSET_URL` to determine asset base path
3. **Serving:** Assets served from `https://your-domain.com/build/assets/`
4. **Manifest:** Laravel reads `public/build/.vite/manifest.json` for asset mapping

## Deployment Steps

### **For Railway:**

1. Set environment variable: `ASSET_URL=https://your-app-name.railway.app/build`
2. Deploy using the updated `railway.toml`
3. Assets will be served from `/build/assets/`

### **For Other Platforms:**

1. Set `ASSET_URL` to your domain + `/build`
2. Run `npm run build` before deployment
3. Ensure `public/build/` directory is accessible

## Verification

### **Check Asset Paths:**

```bash
# Verify build output
ls -la public/build/assets/

# Check manifest location
ls -la public/build/.vite/manifest.json
```

### **Test in Production:**

- Assets should load from `/build/assets/` not `/assets/`
- No 404 errors for CSS/JS files
- Proper asset caching and compression

## Troubleshooting

### **If assets still 404:**

1. Verify `ASSET_URL` is set correctly
2. Check if `public/build/` directory exists
3. Ensure manifest.json is in the correct location
4. Clear Laravel cache: `php artisan config:clear`

### **If build fails:**

1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Check for TypeScript errors in components

## Summary

✅ **Fixed:** Asset loading issues in production  
✅ **Improved:** Build optimization and asset chunking  
✅ **Enhanced:** Deployment process and error handling  
✅ **Configured:** Proper environment variables for Railway

The application should now load assets correctly in production from `/build/assets/` instead of `/assets/`.
