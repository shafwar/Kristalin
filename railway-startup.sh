#!/bin/bash

# Railway Native Startup Script for Laravel + Inertia + React
echo "🚀 Starting Laravel application on Railway..."

# Generate application key if not set
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

# Start Laravel application
echo "🌐 Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=$PORT 