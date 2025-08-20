#!/bin/bash

# Laravel + Inertia + React + Vite Production Deployment Script
# Optimized for Railway + Cloudflare

set -e

echo "🚀 Starting deployment process..."

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm ci

# Build assets for production
echo "🔨 Building assets for production..."
npm run build

# Clear and cache Laravel configurations
echo "🧹 Clearing and caching Laravel configurations..."
php artisan config:clear
php artisan config:cache
php artisan route:clear
php artisan route:cache
php artisan view:clear
php artisan view:cache

# Optimize for production
echo "⚡ Optimizing for production..."
php artisan optimize

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Verify asset build
echo "✅ Verifying asset build..."
if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Asset build failed."
    exit 1
fi

echo "✅ Assets built successfully:"
ls -la public/build/assets/ | head -5

echo "🎉 Deployment completed successfully!"
echo "📝 Make sure to set ASSET_URL in your environment variables:"
echo "   ASSET_URL=https://your-app-name.railway.app/build"
