# 🚀 Kristalin - Replit Deployment Guide

## 📋 Prerequisites

- Replit account
- Git repository access

## 🔄 Database Configuration

### **Local Development vs Replit Deployment**

| Environment | Database | Configuration          |
| ----------- | -------- | ---------------------- |
| **Local**   | MySQL    | `DB_CONNECTION=mysql`  |
| **Replit**  | SQLite   | `DB_CONNECTION=sqlite` |

### **Migration Compatibility**

✅ **Good News**: Laravel migration files are compatible with both MySQL and SQLite
✅ **No Code Changes**: Your existing code will work with both databases
✅ **Automatic Conversion**: Setup script will handle the database switch

## 🔧 Setup Instructions

### 1. Create New Repl

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Enter your repository URL: `https://github.com/shafwar/Kristalin.git`
5. Choose "PHP" as the language

### 2. Run Setup Script

Once the repl is created, you have two options:

#### **Option A: Standard Setup (Recommended)**

```bash
./setup.sh
```

#### **Option B: Alternative Setup (If Option A fails)**

```bash
./setup-alternative.sh
```

**What the scripts do:**

- ✅ Installs PHP and Node.js dependencies
- ✅ Builds frontend assets
- ✅ Converts MySQL config to SQLite
- ✅ Creates SQLite database file
- ✅ Runs migrations and seeders
- ✅ Sets proper permissions
- ✅ Includes error handling

### 3. Manual Setup (if both scripts fail)

If the setup scripts don't work, run these commands manually:

```bash
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
npm install

# Build frontend assets
npm run build

# Create environment file manually
cp .env.example .env

# Edit .env file manually and change:
# APP_NAME=Kristalin
# APP_ENV=production
# APP_DEBUG=false
# APP_URL=https://your-repl-name.your-username.repl.co
# DB_CONNECTION=sqlite
# LOG_LEVEL=error

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Setup database
php artisan migrate --force
php artisan db:seed --force

# Set permissions
chmod -R 755 storage bootstrap/cache

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

### 4. Configure Environment Variables

In Replit, go to "Tools" → "Secrets" and add:

```
APP_NAME=Kristalin
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-repl-name.your-username.repl.co
DB_CONNECTION=sqlite
```

### 5. Update APP_URL

**IMPORTANT**: After your repl is created, update the `APP_URL` in `.env` file with your actual Replit URL:

```bash
# Replace with your actual Replit URL
APP_URL=https://your-actual-repl-name.your-username.repl.co
```

### 6. Run the Application

Click the "Run" button or use:

```bash
php artisan serve --host=0.0.0.0 --port=443
```

## 🌐 Access Your Application

Your app will be available at:
`https://your-repl-name.your-username.repl.co`

## 🔧 Troubleshooting

### Common Issues:

1. **Permission Denied**

    ```bash
    chmod -R 755 storage bootstrap/cache
    ```

2. **Database Issues**

    ```bash
    touch database/database.sqlite
    php artisan migrate:fresh --force
    php artisan db:seed --force
    ```

3. **Asset Build Issues**

    ```bash
    npm run build
    ```

4. **Cache Issues**

    ```bash
    php artisan config:clear
    php artisan cache:clear
    php artisan view:clear
    php artisan route:clear
    ```

5. **Environment Issues**

    ```bash
    # Check if .env exists
    ls -la .env

    # Regenerate key if needed
    php artisan key:generate
    ```

6. **Database Connection Issues**

    ```bash
    # Check database file
    ls -la database/database.sqlite

    # Recreate database
    rm database/database.sqlite
    touch database/database.sqlite
    php artisan migrate --force
    ```

7. **Setup Script Fails**

    ```bash
    # Try alternative script
    ./setup-alternative.sh

    # Or check script permissions
    chmod +x setup.sh
    chmod +x setup-alternative.sh
    ```

8. **Composer/NPM Issues**

    ```bash
    # Clear composer cache
    composer clear-cache

    # Clear npm cache
    npm cache clean --force

    # Reinstall dependencies
    rm -rf vendor node_modules
    composer install --no-dev --optimize-autoloader
    npm install
    ```

## 📁 Project Structure

```
Kristalin/
├── app/                    # Laravel application logic
├── resources/js/           # React components
├── public/                 # Public assets
├── database/               # Migrations and seeders
│   └── database.sqlite     # SQLite database (created on Replit)
├── routes/                 # Route definitions
├── setup.sh               # Standard setup script
├── setup-alternative.sh   # Alternative setup script
└── config/                 # Configuration files
```

## 🔒 Security Notes

- `.env` file is ignored by git (secure)
- Database uses SQLite (included in Replit)
- All sensitive files are properly ignored
- Production environment settings applied

## 🚀 Features

- ✅ Laravel 12 backend
- ✅ React + TypeScript frontend
- ✅ Inertia.js for SPA experience
- ✅ Tailwind CSS for styling
- ✅ SQLite database (Replit compatible)
- ✅ Authentication system
- ✅ Contact form functionality
- ✅ Responsive design

## 📞 Support

If you encounter issues, check:

1. Replit logs in the console
2. Laravel logs in `storage/logs/`
3. Browser developer tools for frontend issues
4. Database file: `database/database.sqlite`

## 🔄 Database Migration Notes

- **Local Development**: Uses MySQL database
- **Replit Deployment**: Uses SQLite database
- Migration files are compatible with both databases
- No code changes needed for database switching
- Data will be fresh in Replit (no data from local MySQL)

## 📊 Data Migration (Optional)

If you want to migrate data from local MySQL to Replit SQLite:

1. **Export from MySQL**:

    ```bash
    mysqldump -u root -p kristalin > backup.sql
    ```

2. **Convert to SQLite** (requires manual conversion or tools)

3. **Import to Replit** (after deployment)

**Note**: For most cases, fresh data in Replit is sufficient for testing/demo purposes.

## 🛠️ Script Differences

| Script                 | Method                 | Use Case            |
| ---------------------- | ---------------------- | ------------------- |
| `setup.sh`             | Modifies existing .env | Standard deployment |
| `setup-alternative.sh` | Creates new .env       | When standard fails |
| Manual                 | Step-by-step           | Complete control    |

**Recommendation**: Try `setup.sh` first, then `setup-alternative.sh` if it fails.
