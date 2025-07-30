#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Laravel application..."

# Wait for database to be ready (if needed)
if [ -n "$DB_HOST" ]; then
    echo "⏳ Waiting for database connection..."
    while ! php artisan tinker --execute="DB::connection()->getPdo();" > /dev/null 2>&1; do
        echo "Database not ready, waiting..."
        sleep 2
    done
    echo "✅ Database connection established"
fi

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
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

# Start Apache
echo "🌐 Starting Apache server..."
apache2-foreground
