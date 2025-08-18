#!/bin/bash

# Railway Deployment Script for Laravel + Inertia + Vite
# This script handles the build process and asset compilation

echo "🚀 Starting Railway deployment..."

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

# Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 storage bootstrap/cache
chmod -R 755 public/build

# Create storage link if it doesn't exist
echo "🔗 Creating storage link..."
php artisan storage:link

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should now be accessible at: https://kristalin.co.id"
