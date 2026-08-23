#!/bin/bash
set -e

echo "=== Starting PT Kristalin Ekalestari Production Server (Optimized) ==="

# ==============================================================================
# Point 3 & 5 Cost Optimization: Low-RAM Memory Tuning & Production Caching
# ==============================================================================

# 1. Set Conservative Worker Limits & Node Heap Caps (Saves ~150MB-250MB RAM)
export PHP_CLI_SERVER_WORKERS="${PHP_CLI_SERVER_WORKERS:-2}"
export NODE_OPTIONS="--max-old-space-size=96"

# 2. Build Full Laravel Production Caches (Drastically reduces CPU cycles per request)
echo "⚡ Building Laravel Production Caches..."
php -d memory_limit=128M artisan config:clear || true
php -d memory_limit=128M artisan optimize || true
php -d memory_limit=128M artisan event:cache || true

# 3. Ensure essential directories exist with proper permissions
mkdir -p storage/logs storage/framework/{cache,sessions,views} bootstrap/cache
chmod -R 775 storage bootstrap/cache || true

# 4. Start Inertia Node.js SSR Daemon with Memory Cap (if SSR bundle exists)
if [ -f "bootstrap/ssr/ssr.js" ]; then
    echo "Starting Inertia Node SSR Daemon (Capped at 96MB Heap)..."
    nohup node --max-old-space-size=96 bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
    SSR_PID=$!
    echo "Inertia SSR started with PID $SSR_PID"

    # Wait for SSR daemon to respond on port 13714
    for i in {1..10}; do
        if curl -s -o /dev/null http://127.0.0.1:13714 || true; then
            echo "Inertia SSR server is responding on port 13714."
            break
        fi
        sleep 0.5
    done
fi

# 5. Start Optimized PHP Web Server with OPcache & Memory Limit
PORT_TO_USE="${PORT:-8000}"
echo "Starting Optimized PHP Server on 0.0.0.0:${PORT_TO_USE} (Workers: ${PHP_CLI_SERVER_WORKERS})..."

exec php \
    -d memory_limit=128M \
    -d opcache.enable=1 \
    -d opcache.enable_cli=1 \
    -d opcache.memory_consumption=48 \
    -d opcache.interned_strings_buffer=8 \
    -d opcache.max_accelerated_files=10000 \
    -d opcache.validate_timestamps=0 \
    artisan serve --host=0.0.0.0 --port="${PORT_TO_USE}"
