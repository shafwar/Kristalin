# Railway Commands Reference

## 🚀 Deployment Commands

### Initial Setup
```bash
# Login to Railway
railway login

# Link project to Railway
railway link

# Check project status
railway status
```

### Environment Variables
```bash
# List all variables
railway variables

# Set single variable
railway variables set APP_KEY=your_key_here

# Set multiple variables
railway variables set APP_NAME=Kristalin APP_ENV=production

# Remove variable
railway variables unset VARIABLE_NAME
```

### Deployment
```bash
# Deploy to Railway
railway up

# Deploy with specific service
railway up --service web

# Deploy from specific branch
railway up --branch main
```

### Database Operations
```bash
# Run migrations
railway run php artisan migrate

# Run migrations with force
railway run php artisan migrate --force

# Rollback migrations
railway run php artisan migrate:rollback

# Seed database
railway run php artisan db:seed

# Reset database
railway run php artisan migrate:fresh --seed
```

### Laravel Commands
```bash
# Clear caches
railway run php artisan config:clear
railway run php artisan route:clear
railway run php artisan view:clear
railway run php artisan cache:clear

# Cache for production
railway run php artisan config:cache
railway run php artisan route:cache
railway run php artisan view:cache

# Generate key
railway run php artisan key:generate

# List routes
railway run php artisan route:list

# Tinker
railway run php artisan tinker
```

### Monitoring & Logs
```bash
# View logs
railway logs

# View logs for specific service
railway logs --service web

# Follow logs (real-time)
railway logs --follow

# View deployment logs
railway logs --deployment
```

### Service Management
```bash
# List services
railway service list

# Connect to service shell
railway shell

# Restart service
railway service restart

# Scale service
railway service scale 2
```

### Domain Management
```bash
# List domains
railway domain list

# Add custom domain
railway domain add yourdomain.com

# Remove domain
railway domain remove yourdomain.com
```

## 🔧 Development Commands

### Local Development
```bash
# Start local development
railway dev

# Run specific service locally
railway dev --service web

# Stop local development
railway dev --stop
```

### Testing
```bash
# Run tests
railway run php artisan test

# Run specific test
railway run php artisan test --filter TestName
```

## 📊 Monitoring Commands

### Health Checks
```bash
# Check health endpoint
curl https://your-app-name.railway.app/health

# Expected response:
# {"status":"healthy","database":"connected","environment":"production"}
```

### Performance
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-app-name.railway.app

# Monitor memory usage
railway run php artisan about
```

## 🐛 Troubleshooting Commands

### Debug Issues
```bash
# Check environment
railway run php artisan about

# Check configuration
railway run php artisan config:show

# Check database connection
railway run php artisan tinker --execute="DB::connection()->getPdo();"

# Check storage permissions
railway run ls -la storage/
```

### Reset & Recovery
```bash
# Reset to last working deployment
railway rollback

# Force rebuild
railway up --force

# Clear all caches
railway run php artisan optimize:clear
```

## 📝 Useful Aliases

Add these to your `.bashrc` or `.zshrc`:

```bash
# Railway aliases
alias rw='railway'
alias rwup='railway up'
alias rwlogs='railway logs --follow'
alias rwshell='railway shell'
alias rwrun='railway run'
alias rwvars='railway variables'
alias rwstatus='railway status'
```

## 🔐 Security Commands

### Key Management
```bash
# Generate new APP_KEY
openssl rand -hex 16

# Set new key in Railway
railway variables set APP_KEY=your_new_key

# Regenerate application key
railway run php artisan key:generate --force
```

### Database Security
```bash
# Check database connection security
railway run php artisan tinker --execute="DB::connection()->getConfig();"

# Backup database (if supported)
railway run php artisan db:backup
``` 
