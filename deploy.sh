#!/bin/bash

# Railway Deployment Script for Kristalin
echo "🚀 Starting Railway deployment..."

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --optimize-autoloader --no-dev

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm ci

# Build frontend assets
echo "🔨 Building frontend assets..."
npm run build

# Generate application key if not exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate
fi

# Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Clear and cache configurations
echo "⚡ Optimizing Laravel for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
echo "🔒 Setting file permissions..."
chmod -R 755 storage bootstrap/cache

echo "✅ Deployment script completed!"
