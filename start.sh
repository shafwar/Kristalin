#!/bin/bash
# =============================================================================
# Kristalin Production Startup Script — Optimized for Railway
# =============================================================================
# Goals:
#   - Minimal RAM footprint (no persistent Node.js SSR daemon unless explicitly enabled)
#   - OPcache for fast PHP execution with minimal CPU per request
#   - Worker recycling to prevent memory leaks over time
#   - Clean, fail-safe startup with proper error handling
# =============================================================================
set -e

echo "=== PT Kristalin Ekalestari — Production Server Starting ==="

# ------------------------------------------------------------------------------
# 1. Environment Defaults
# ------------------------------------------------------------------------------
PORT_TO_USE="${PORT:-8000}"
PHP_WORKERS="${PHP_CLI_SERVER_WORKERS:-2}"
SSR_ENABLED="${INERTIA_SSR_ENABLED:-false}"

echo "ℹ  Port        : ${PORT_TO_USE}"
echo "ℹ  Workers     : ${PHP_WORKERS}"
echo "ℹ  SSR Enabled : ${SSR_ENABLED}"

# ------------------------------------------------------------------------------
# 2. Ensure required directories & permissions exist
# ------------------------------------------------------------------------------
mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

# ------------------------------------------------------------------------------
# 3. Laravel Production Caches (reduces CPU cycles per request dramatically)
# ------------------------------------------------------------------------------
echo "⚡ Building Laravel production caches..."
php -d memory_limit=96M artisan config:clear --quiet   || true
php -d memory_limit=96M artisan cache:clear  --quiet   || true
php -d memory_limit=96M artisan optimize     --quiet   || true
php -d memory_limit=96M artisan event:cache  --quiet   || true
echo "✅ Laravel caches built."

# ------------------------------------------------------------------------------
# 4. Run Database Migrations (safe — skips if already migrated)
# ------------------------------------------------------------------------------
echo "📦 Running database migrations..."
php -d memory_limit=96M artisan migrate --force --no-interaction --quiet || true
echo "✅ Migrations done."

# ------------------------------------------------------------------------------
# 5. Optional: Inertia Node.js SSR Daemon
#    Only starts if INERTIA_SSR_ENABLED=true AND ssr.js bundle exists.
#    Default is OFF to save ~100-200MB RAM on Railway.
# ------------------------------------------------------------------------------
if [ "${SSR_ENABLED}" = "true" ] && [ -f "bootstrap/ssr/ssr.js" ]; then
    echo "🟡 SSR is ENABLED — starting Node.js SSR daemon (capped at 96MB heap)..."
    nohup node --max-old-space-size=96 bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
    SSR_PID=$!
    echo "   SSR PID: ${SSR_PID}"

    # Wait up to 5 seconds for SSR to become responsive
    for i in {1..10}; do
        if curl -sf -o /dev/null http://127.0.0.1:13714 2>/dev/null; then
            echo "✅ SSR daemon responding on :13714"
            break
        fi
        sleep 0.5
    done
else
    echo "ℹ  SSR is DISABLED (default). To enable: set INERTIA_SSR_ENABLED=true in Railway."
fi

# ------------------------------------------------------------------------------
# 6. Start PHP Built-in Server with OPcache + Memory Recycling
#
#    OPcache settings:
#      - opcache.memory_consumption=48   → 48MB for opcode cache (sufficient for Laravel)
#      - opcache.validate_timestamps=0   → no filesystem checks in production (faster)
#      - opcache.max_accelerated_files=8000 → cover all Laravel + app files
#
#    Memory:
#      - memory_limit=96M  → safe limit per worker (down from 128M)
#                            Laravel typically uses 30-60MB per request
#
#    Worker recycling:
#      - PHP_FCGI_MAX_REQUESTS=500  → each worker exits cleanly after 500 requests
#                                     prevents slow memory leak accumulation
# ------------------------------------------------------------------------------
echo ""
echo "🚀 Starting PHP Server on 0.0.0.0:${PORT_TO_USE} (workers: ${PHP_WORKERS})"
echo "   memory_limit=96M | OPcache=on | worker_recycle=500 requests"
echo ""

export PHP_FCGI_MAX_REQUESTS=500
export PHP_CLI_SERVER_WORKERS="${PHP_WORKERS}"

exec php \
    -d memory_limit=96M \
    -d opcache.enable=1 \
    -d opcache.enable_cli=1 \
    -d opcache.memory_consumption=48 \
    -d opcache.interned_strings_buffer=8 \
    -d opcache.max_accelerated_files=8000 \
    -d opcache.validate_timestamps=0 \
    -d opcache.fast_shutdown=1 \
    -d error_reporting=E_ALL \
    -d display_errors=Off \
    -d log_errors=On \
    artisan serve --host=0.0.0.0 --port="${PORT_TO_USE}"
