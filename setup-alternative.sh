#!/bin/bash

# Alternative setup script for Replit deployment
echo "🚀 Setting up Kristalin Laravel project on Replit (Alternative Method)..."

# Function to handle errors
handle_error() {
    echo "❌ Error occurred at line $1"
    echo "🔧 Please check the error and try again"
    exit 1
}

# Set error handling
trap 'handle_error $LINENO' ERR

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Build frontend assets
echo "🔨 Building frontend assets..."
npm run build

# Create environment file from scratch for Replit
echo "⚙️ Creating environment file for Replit..."
cat > .env << 'EOF'
APP_NAME=Kristalin
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://your-repl-name.your-username.repl.co

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Database configuration for Replit (SQLite)
DB_CONNECTION=sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@kristalin.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
EOF

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate

# Create SQLite database file
echo "🗄️ Creating SQLite database..."
touch database/database.sqlite

# Set up database
echo "🗄️ Setting up database..."
php artisan migrate --force

# Seed database if needed
echo "🌱 Seeding database..."
php artisan db:seed --force

# Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache

# Clear caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

echo "✅ Setup complete! Your Laravel app is ready to run."
echo "🌐 Access your app at: https://your-repl-name.your-username.repl.co"
echo ""
echo "📝 IMPORTANT: Update APP_URL in .env with your actual Replit URL!"
echo "🗄️ Database: SQLite file created at database/database.sqlite"
echo ""
echo "🔧 To run the app: php artisan serve --host=0.0.0.0 --port=443"
