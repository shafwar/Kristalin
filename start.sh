#!/bin/bash
set -e

echo "=== Starting PT Kristalin Ekalestari Production Server ==="

# 1. Clear and rebuild framework caches with runtime env vars
php artisan optimize:clear || true
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# 2. Ensure log directory exists
mkdir -p storage/logs

# 3. Start Inertia Node.js SSR Daemon in background
echo "Starting Inertia Node SSR Daemon..."
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
SSR_PID=$!
echo "Inertia SSR started with PID $SSR_PID"

# 4. Wait for SSR daemon to respond on port 13714
for i in {1..10}; do
    if curl -s -o /dev/null http://127.0.0.1:13714 || true; then
        echo "Inertia SSR server is responding on port 13714."
        break
    fi
    sleep 0.5
done

# 5. Start PHP Web Server in foreground
PORT_TO_USE="${PORT:-8000}"
echo "Starting PHP Web Server on 0.0.0.0:${PORT_TO_USE}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT_TO_USE}"
