#!/bin/bash

# Setup script for Replit deployment
echo "🚀 Setting up Kristalin Laravel project on Replit..."

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Build frontend assets
echo "🔨 Building frontend assets..."
npm run build

# Copy environment file
echo "⚙️ Setting up environment..."
cp .env.example .env

# Update environment for Replit
echo "🔧 Configuring environment for Replit..."
sed -i 's/APP_NAME=Laravel/APP_NAME=Kristalin/' .env
sed -i 's/APP_ENV=local/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env
sed -i 's|APP_URL=http://localhost|APP_URL=https://your-repl-name.your-username.repl.co|' .env
sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=sqlite/' .env
sed -i 's/LOG_LEVEL=debug/LOG_LEVEL=error/' .env

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
