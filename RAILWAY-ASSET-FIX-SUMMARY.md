# Railway Asset Loading Fix Summary

## Problem Description
Laravel + Inertia + Vite deployment on Railway with Cloudflare proxy was failing to load JS/CSS assets in production. Assets were being requested from `/assets/` instead of `/build/assets/`.

## Root Cause Analysis
1. **Vite Configuration**: Base path not properly set for production
2. **Environment Variables**: Missing `ASSET_URL` and proper `APP_URL` configuration
3. **Blade Template**: Incorrect Vite directive usage
4. **Laravel Configuration**: Missing custom asset URL handling for production
5. **Nix Build Error**: Incorrect nixpacks.toml configuration causing build failures

## Fixes Implemented

### 1. Updated vite.config.ts
```typescript
// Key changes:
base: mode === 'production' ? '/build/' : '/',
manifest: true,
```

**Why**: Ensures production builds use `/build/` as the base path for assets.

### 2. Updated Environment Variables
```bash
APP_URL=https://kristalin.co.id
ASSET_URL=https://kristalin.co.id
VITE_BASE_URL=https://kristalin.co.id
```

**Why**: Properly configures asset URLs for production domain.

### 3. Fixed Blade Template (app.blade.php)
```php
@vite(['resources/css/app.css', 'resources/js/app.tsx'])
```

**Why**: Simplified Vite directive to load main entry points correctly.

### 4. Enhanced AppServiceProvider
```php
// Custom Vite asset URL handling for production
if (config('app.env') === 'production') {
    Vite::useHotFile('build/hot')
        ->useBuildDirectory('build')
        ->withEntryPoints(['resources/css/app.css', 'resources/js/app.tsx']);
}
```

**Why**: Ensures Laravel properly handles Vite assets in production.

### 5. Updated Deployment Script (deploy.sh)
- Added proper build commands
- Included asset permission settings
- Added storage link creation

### 6. Fixed Nix Build Configuration
- Removed problematic `nixpacks.toml` file
- Using Railway's auto-detection for PHP + Node.js
- Created `railway.toml` for deployment configuration

### 7. Updated package.json
- Removed problematic `postinstall` script
- Cleaned up build scripts

## Railway Environment Variables Required

Set these in your Railway project:

```bash
APP_NAME=Kristalin
APP_ENV=production
APP_KEY=base64:8SI0lqu7TRlqxfh4wqaKH4CTbma9qgjZSZ0q5KHTZUk=
APP_DEBUG=false
APP_URL=https://kristalin.co.id
ASSET_URL=https://kristalin.co.id
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file
PHP_CLI_SERVER_WORKERS=4
BCRYPT_ROUNDS=12

# Logging
LOG_CHANNEL=errorlog
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Database (Railway auto-injects)
DB_CONNECTION=mysql
DB_HOST=${RAILWAY_PRIVATE_DOMAIN}
DB_PORT=${RAILWAY_TCP_PROXY_PORT}
DB_DATABASE=${MYSQL_DATABASE}
DB_USERNAME=root
DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

# Session & Cache
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.kristalin.co.id
SESSION_SECURE_COOKIE=true

# Broadcasting & Filesystem
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
CACHE_STORE=file
CACHE_PREFIX=kristalin_cache

# Vite Configuration
VITE_APP_NAME=Kristalin
VITE_BASE_URL=https://kristalin.co.id

# Inertia Configuration
INERTIA_SSR_ENABLED=false

# Node Environment
NODE_ENV=production

# Railway Build Commands
NIXPACKS_BUILD_COMMAND=composer install --no-dev --optimize-autoloader --no-scripts && npm ci && npm run build
NIXPACKS_START_COMMAND=php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache && chmod -R 755 public/build && php -S 0.0.0.0:${PORT} -t public
```

## Deployment Commands

### Using Railway CLI
```bash
# Update environment variables first
railway variables set DB_HOST=\${{RAILWAY_PRIVATE_DOMAIN}}
railway variables set DB_USERNAME=root
railway variables set VITE_BASE_URL=https://kristalin.co.id
railway variables unset MIX_ASSET_URL

# Deploy your code
git add .
git commit -m "Fix asset loading and Nix build configuration"
git push origin main

# Or deploy directly
railway up
```

### Manual Deployment
```bash
# Install dependencies
composer install --no-dev --optimize-autoloader
npm ci

# Build assets
npm run build

# Cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Set permissions
chmod -R 755 storage bootstrap/cache
chmod -R 755 public/build

# Create storage link
php artisan storage:link
```

### Using the Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

## Cloudflare Configuration

Ensure your Cloudflare proxy settings:

1. **SSL/TLS**: Set to "Full" or "Full (strict)"
2. **Always Use HTTPS**: Enabled
3. **Minify**: Disabled for JS/CSS (to avoid conflicts)
4. **Brotli**: Enabled
5. **Page Rules**: None that might interfere with `/build/` paths

## Verification Steps

After deployment, verify:

1. **Asset Loading**: Check browser dev tools for 200 status on `/build/assets/` files
2. **Manifest**: Verify `public/build/manifest.json` exists and is valid
3. **Permissions**: Ensure `public/build/` directory has proper permissions
4. **URLs**: Confirm assets load from `https://kristalin.co.id/build/assets/`

## Troubleshooting

### If assets still don't load:
1. Check Railway logs for build errors
2. Verify `public/build/` directory exists on server
3. Confirm environment variables are set correctly
4. Check Cloudflare cache and purge if necessary

### Common Issues:
- **404 on assets**: Check if `ASSET_URL` is set correctly
- **Build failures**: Ensure Node.js version compatibility
- **Permission errors**: Verify file permissions on `public/build/`
- **Nix build errors**: Use Railway's auto-detection instead of custom nixpacks.toml

## Expected Result

After implementing these fixes:
- Assets should load from `https://kristalin.co.id/build/assets/`
- No 404 errors in browser console
- Proper CSS styling and JavaScript functionality
- Fast asset loading with proper caching
- Successful Railway deployment without Nix build errors

## Files Modified
- `vite.config.ts`
- `resources/views/app.blade.php`
- `app/Providers/AppServiceProvider.php`
- `deploy.sh`
- `railway.toml` (new)
- `package.json`
- `railway-env-vars-corrected.txt`
- Removed: `nixpacks.toml` (causing build errors)

## Next Steps
1. Update Railway environment variables using CLI
2. Deploy to Railway with updated configuration
3. Monitor asset loading in production
4. Test all functionality with new asset paths
5. Optimize Cloudflare settings if needed
