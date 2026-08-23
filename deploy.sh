#!/bin/bash
set -e

# Railway Deployment Script for Kristalin (Cost & Performance Optimized)
echo "🚀 Starting Railway deployment..."

# 1. Install PHP dependencies with Classmap Authoritative (Fastest Class Loading)
echo "📦 Installing PHP dependencies with optimizations..."
composer install --optimize-autoloader --no-dev --no-interaction --classmap-authoritative

# 2. Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm ci --prefer-offline --no-audit

# 3. Build frontend assets (Client & SSR)
echo "🔨 Building frontend assets..."
npm run build

# 4. Generate application key if not exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# 5. Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force || true

# 6. Clear and cache all configurations, routes, events, and views
echo "⚡ Optimizing Laravel for production..."
php artisan optimize:clear || true
php artisan optimize || true
php artisan event:cache || true

# 7. Set proper permissions
echo "🔒 Setting file permissions..."
mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "✅ Deployment script completed successfully!"
