# Railway Deployment Troubleshooting Guide

## 🚨 Common Error Solutions

### 1. Environment Variables Errors

#### Problem: `APP_KEY is not set`
```bash
# Solution: Generate and set APP_KEY
openssl rand -hex 16
# Copy the output and set in Railway
railway variables set APP_KEY=your_generated_key
```

#### Problem: Database connection variables missing
```bash
# Solution: Add MySQL service in Railway dashboard
# Railway will auto-inject: MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD
```

#### Problem: Multiple environment variable warnings
```bash
# Solution: Set all required variables in Railway dashboard
railway variables set APP_NAME=Kristalin
railway variables set APP_ENV=production
railway variables set APP_DEBUG=false
railway variables set LOG_CHANNEL=stderr
railway variables set CACHE_DRIVER=file
railway variables set SESSION_DRIVER=file
railway variables set QUEUE_CONNECTION=sync
```

### 2. Build Failures

#### Problem: Node.js build fails
```bash
# Solution: Check package.json and dependencies
railway run npm install
railway run npm run build
```

#### Problem: PHP dependencies fail
```bash
# Solution: Clear composer cache and reinstall
railway run composer clear-cache
railway run composer install --optimize-autoloader --no-dev
```

#### Problem: Vite build fails
```bash
# Solution: Check vite.config.ts and build process
railway run npm run build:production
```

### 3. Database Issues

#### Problem: Database connection failed
```bash
# Solution: Check MySQL service and variables
railway variables | grep MYSQL
railway run php artisan tinker --execute="DB::connection()->getPdo();"
```

#### Problem: Migration fails
```bash
# Solution: Run migrations with force
railway run php artisan migrate --force
```

#### Problem: Database table not found
```bash
# Solution: Check if migrations ran
railway run php artisan migrate:status
railway run php artisan migrate
```

### 4. Application Errors

#### Problem: 500 Internal Server Error
```bash
# Solution: Check logs and clear caches
railway logs
railway run php artisan config:clear
railway run php artisan route:clear
railway run php artisan view:clear
```

#### Problem: Assets not loading
```bash
# Solution: Rebuild assets and check paths
railway run npm run build
railway run php artisan optimize:clear
```

#### Problem: Health check fails
```bash
# Solution: Check health endpoint
curl https://your-app-name.railway.app/health
# Should return: {"status":"healthy","database":"connected"}
```

### 5. Performance Issues

#### Problem: Slow page loads
```bash
# Solution: Optimize Laravel and assets
railway run php artisan config:cache
railway run php artisan route:cache
railway run php artisan view:cache
railway run npm run build:production
```

#### Problem: Memory issues
```bash
# Solution: Check memory usage and optimize
railway run php artisan about
# Consider scaling up service if needed
```

## 🔧 Debug Commands

### Check Environment
```bash
# View all environment variables
railway variables

# Check Laravel environment
railway run php artisan about

# Check configuration
railway run php artisan config:show
```

### Check Logs
```bash
# View real-time logs
railway logs --follow

# View specific service logs
railway logs --service web

# View deployment logs
railway logs --deployment
```

### Check Database
```bash
# Test database connection
railway run php artisan tinker --execute="DB::connection()->getPdo();"

# Check database configuration
railway run php artisan tinker --execute="DB::connection()->getConfig();"

# List database tables
railway run php artisan tinker --execute="DB::select('SHOW TABLES');"
```

### Check File System
```bash
# Check storage permissions
railway run ls -la storage/

# Check bootstrap cache
railway run ls -la bootstrap/cache/

# Check public directory
railway run ls -la public/
```

## 🚀 Recovery Procedures

### Complete Reset
```bash
# 1. Clear all caches
railway run php artisan optimize:clear

# 2. Rebuild assets
railway run npm run build

# 3. Re-run migrations
railway run php artisan migrate:fresh --force

# 4. Re-deploy
railway up --force
```

### Database Reset
```bash
# Reset database completely
railway run php artisan migrate:fresh --seed --force

# Or rollback and re-run
railway run php artisan migrate:rollback --step=5
railway run php artisan migrate --force
```

### Service Restart
```bash
# Restart the service
railway service restart

# Or redeploy
railway up
```

## 📊 Monitoring & Alerts

### Health Check Monitoring
```bash
# Set up monitoring for health endpoint
curl -f https://your-app-name.railway.app/health || echo "Health check failed"
```

### Performance Monitoring
```bash
# Check response times
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://your-app-name.railway.app

# Check memory usage
railway run php artisan about | grep Memory
```

### Error Monitoring
```bash
# Monitor for errors in logs
railway logs --follow | grep -i error

# Check for failed requests
railway logs --follow | grep -i "500\|error\|exception"
```

## 🔒 Security Issues

### Environment Variable Security
```bash
# Check for exposed sensitive data
railway variables | grep -i password
railway variables | grep -i key
railway variables | grep -i secret
```

### Database Security
```bash
# Check database connection security
railway run php artisan tinker --execute="DB::connection()->getConfig();"
```

### Application Security
```bash
# Check if debug mode is disabled
railway run php artisan tinker --execute="echo config('app.debug');"

# Check HTTPS enforcement
railway run php artisan tinker --execute="echo config('app.env');"
```

## 📞 Getting Help

### Railway Support
- Check Railway documentation: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Railway status: https://status.railway.app/

### Laravel Support
- Laravel documentation: https://laravel.com/docs
- Laravel community: https://laracasts.com/discuss

### Debug Information to Collect
```bash
# Collect debug information
echo "=== Railway Status ==="
railway status

echo "=== Environment Variables ==="
railway variables

echo "=== Laravel About ==="
railway run php artisan about

echo "=== Database Status ==="
railway run php artisan migrate:status

echo "=== Recent Logs ==="
railway logs --tail 50
``` 