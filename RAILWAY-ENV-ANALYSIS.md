# Railway Environment Variables Analysis & Fixes

## Current Issues Found

### ❌ **Problems in Your Current Setup:**

1. **Missing Critical Variables:**
   - `APP_LOCALE`, `APP_FALLBACK_LOCALE`, `APP_FAKER_LOCALE`
   - `PHP_CLI_SERVER_WORKERS`, `BCRYPT_ROUNDS`
   - `LOG_STACK`, `LOG_DEPRECATIONS_CHANNEL`
   - `VITE_BASE_URL` (critical for asset loading)

2. **Incorrect Database Configuration:**
   - You're using both `DB_*` and `MYSQL*` variables (redundant)
   - `DB_HOST` should use `RAILWAY_PRIVATE_DOMAIN` for internal connections
   - `DB_USERNAME` should be `root` not `${MYSQLUSER}`

3. **Missing Cache Configuration:**
   - `CACHE_PREFIX` is good but missing other cache settings

4. **Session Configuration Issues:**
   - `SESSION_DOMAIN=.kristalin.co.id` is correct
   - `SESSION_SECURE_COOKIE=true` is good for HTTPS

5. **Build Commands:**
   - Your `NIXPACKS_BUILD_COMMAND` and `NIXPACKS_START_COMMAND` are good
   - But missing proper asset permissions

## ✅ **Corrected Environment Variables**

### **Variables to REMOVE:**
```bash
# Remove these (redundant or incorrect):
MIX_ASSET_URL="https://kristalin.co.id"  # Not needed for Vite
```

### **Variables to ADD:**
```bash
# Add these missing variables:
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
PHP_CLI_SERVER_WORKERS=4
BCRYPT_ROUNDS=12
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
VITE_BASE_URL=https://kristalin.co.id
```

### **Variables to FIX:**
```bash
# Fix database configuration:
DB_HOST=${RAILWAY_PRIVATE_DOMAIN}  # Use private domain for internal connections
DB_USERNAME=root  # Not ${MYSQLUSER}
```

## 🔧 **Complete Corrected Configuration**

```bash
# Application
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

# Database (Primary)
DB_CONNECTION=mysql
DB_HOST=${RAILWAY_PRIVATE_DOMAIN}
DB_PORT=${RAILWAY_TCP_PROXY_PORT}
DB_DATABASE=${MYSQL_DATABASE}
DB_USERNAME=root
DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

# MySQL Variables (Railway format)
MYSQLDATABASE=${MYSQL_DATABASE}
MYSQLHOST=${RAILWAY_PRIVATE_DOMAIN}
MYSQLPASSWORD=${MYSQL_ROOT_PASSWORD}
MYSQLPORT=3306
MYSQLUSER=root

# Session & Cache
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.kristalin.co.id
SESSION_SECURE_COOKIE=true
CACHE_STORE=file
CACHE_PREFIX=kristalin_cache

# Broadcasting & Filesystem
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@kristalin.com
MAIL_FROM_NAME=Kristalin

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

## 🚨 **Critical Changes Required**

### **1. Database Host Fix:**
```bash
# Change from:
DB_HOST=${RAILWAY_TCP_PROXY_DOMAIN}

# To:
DB_HOST=${RAILWAY_PRIVATE_DOMAIN}
```

**Why**: Use private domain for internal database connections, TCP proxy domain is for external access.

### **2. Add Missing Vite Base URL:**
```bash
VITE_BASE_URL=https://kristalin.co.id
```

**Why**: Critical for proper asset loading in production.

### **3. Fix Database Username:**
```bash
# Change from:
DB_USERNAME=${MYSQLUSER}

# To:
DB_USERNAME=root
```

**Why**: Railway MySQL uses `root` as the default username.

### **4. Add Asset Permissions to Start Command:**
```bash
# Add this to your NIXPACKS_START_COMMAND:
chmod -R 755 public/build &&
```

## 📋 **Action Items**

1. **Remove:** `MIX_ASSET_URL`
2. **Add:** All missing variables listed above
3. **Fix:** Database host and username
4. **Update:** Start command to include asset permissions

## 🔍 **Verification After Changes**

After updating the environment variables:

1. **Check Railway logs** for any configuration errors
2. **Verify database connection** works properly
3. **Test asset loading** from `https://kristalin.co.id/build/assets/`
4. **Confirm session handling** works with the domain configuration

## ⚠️ **Important Notes**

- **SESSION_DOMAIN=.kristalin.co.id** is correct for your domain
- **SESSION_SECURE_COOKIE=true** is good for HTTPS
- **LOG_CHANNEL=errorlog** is appropriate for Railway
- Your build commands are well-configured

The main issues are missing variables and incorrect database configuration. Fix these and your deployment should work properly.
