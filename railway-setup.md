# Railway Deployment Setup Guide

## Environment Variables untuk Railway

Set environment variables berikut di Railway dashboard:

### Required Variables:

```
APP_NAME=Kristalin
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-app-name.railway.app

LOG_CHANNEL=stderr
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=${MYSQLHOST}
DB_PORT=${MYSQLPORT}
DB_DATABASE=${MYSQLDATABASE}
DB_USERNAME=${MYSQLUSER}
DB_PASSWORD=${MYSQLPASSWORD}

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME=Kristalin
```

### Generate APP_KEY:

```bash
openssl rand -hex 16
```

## Railway Commands:

1. **Connect to Railway:**

```bash
railway login
railway link
```

2. **Set Environment Variables:**

```bash
railway variables set APP_KEY=your_generated_key
railway variables set APP_URL=https://your-app-name.railway.app
```

3. **Deploy:**

```bash
railway up
```

4. **View Logs:**

```bash
railway logs
```

## Database Setup:

1. Add MySQL service in Railway
2. Railway will automatically inject database variables
3. Run migrations: `railway run php artisan migrate`

## Health Check:

Visit: `https://your-app-name.railway.app/health`
