#!/bin/bash

echo "🔧 Fixing Railway Deployment Issues..."

# Clear all Laravel caches
echo "🧹 Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

# Remove old build files
echo "🗑️ Removing old build files..."
rm -rf public/build

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
composer install --optimize-autoloader --no-dev --no-interaction
npm ci

# Rebuild assets
echo "🔨 Rebuilding assets..."
npm run build

# Cache for production
echo "⚡ Caching for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache
chmod -R 755 public/build

echo "✅ Railway fix completed!"
echo "🚀 Ready for deployment!"
