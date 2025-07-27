# 🚀 Kristalin - Replit Deployment Guide

## 📋 Prerequisites
- Replit account
- Git repository access

## 🔧 Setup Instructions

### 1. Create New Repl
1. Go to [replit.com](https://replit.com)
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Enter your repository URL: `https://github.com/shafwar/Kristalin.git`
5. Choose "PHP" as the language

### 2. Run Setup Script
Once the repl is created, run the setup script:

```bash
./setup.sh
```

### 3. Manual Setup (if script fails)
If the setup script doesn't work, run these commands manually:

```bash
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
npm install

# Build frontend assets
npm run build

# Setup environment
cp .env.example .env

# Configure for Replit
sed -i 's/APP_NAME=Laravel/APP_NAME=Kristalin/' .env
sed -i 's/APP_ENV=local/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env
sed -i 's|APP_URL=http://localhost|APP_URL=https://your-repl-name.your-username.repl.co|' .env
sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=sqlite/' .env
sed -i 's/LOG_LEVEL=debug/LOG_LEVEL=error/' .env

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

## 📁 Project Structure
```
Kristalin/
├── app/                    # Laravel application logic
├── resources/js/           # React components
├── public/                 # Public assets
├── database/               # Migrations and seeders
├── routes/                 # Route definitions
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
