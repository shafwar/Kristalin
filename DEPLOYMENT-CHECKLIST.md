# Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup
- [ ] Set `APP_KEY` in Railway dashboard
- [ ] Set `APP_URL` to your Railway domain
- [ ] Configure database variables (Railway auto-injects)
- [ ] Set `LOG_CHANNEL=stderr`
- [ ] Set `APP_DEBUG=false`

### 2. Database Setup
- [ ] Add MySQL service in Railway
- [ ] Railway will auto-inject: `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`
- [ ] Run migrations: `railway run php artisan migrate`

### 3. File Permissions
- [ ] Ensure `storage/` is writable
- [ ] Ensure `bootstrap/cache/` is writable

### 4. Build Process
- [ ] Frontend assets build correctly
- [ ] Laravel optimizations applied
- [ ] Health check endpoint working

## 🚀 Deployment Steps

### Step 1: Connect to Railway
```bash
railway login
railway link
```

### Step 2: Set Environment Variables
```bash
# Generate APP_KEY
openssl rand -hex 16

# Set in Railway
railway variables set APP_KEY=your_generated_key
railway variables set APP_URL=https://your-app-name.railway.app
```

### Step 3: Add MySQL Service
1. Go to Railway dashboard
2. Add MySQL service
3. Railway will auto-inject database variables

### Step 4: Deploy
```bash
railway up
```

### Step 5: Run Migrations
```bash
railway run php artisan migrate
```

## 🔍 Post-Deployment Verification

### 1. Health Check
- [ ] Visit: `https://your-app-name.railway.app/health`
- [ ] Should return: `{"status":"healthy","database":"connected"}`

### 2. Website Functionality
- [ ] Homepage loads correctly
- [ ] All routes work
- [ ] Images load properly
- [ ] Contact form works
- [ ] No 500 errors

### 3. Database
- [ ] Tables created successfully
- [ ] Contact messages can be saved
- [ ] Feedback system works

### 4. Performance
- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] Assets cached properly

## 🐛 Troubleshooting

### Common Issues:
1. **APP_KEY not set**: Generate with `openssl rand -hex 16`
2. **Database connection failed**: Check Railway MySQL service
3. **500 errors**: Check Railway logs with `railway logs`
4. **Assets not loading**: Ensure build completed successfully

### Useful Commands:
```bash
# View logs
railway logs

# Check environment variables
railway variables

# Run artisan commands
railway run php artisan migrate
railway run php artisan config:clear

# SSH into container
railway shell
```

## 📊 Monitoring

### Health Check Endpoint
- URL: `/health`
- Expected response: JSON with status and database connection
- Railway uses this for health monitoring

### Logs
- Railway automatically captures stdout/stderr
- View with: `railway logs`
- Laravel logs go to stderr in production

## 🔒 Security Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] HTTPS enforced (Railway handles this)
- [ ] Environment variables secured
- [ ] No sensitive data in logs
- [ ] Database credentials protected

## 📈 Performance Optimization

- [ ] Laravel config cached
- [ ] Routes cached
- [ ] Views cached
- [ ] Assets minified
- [ ] Images optimized
- [ ] CDN configured (if needed) 
