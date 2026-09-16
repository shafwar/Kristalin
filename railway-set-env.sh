#!/bin/bash
# =============================================================================
# Railway Environment Variables Setup — Kristalin Cost Optimization
# =============================================================================
# Usage:
#   1. Install Railway CLI: npm install -g @railway/cli
#   2. Login: railway login
#   3. Link to project: railway link
#   4. Run this script: bash railway-set-env.sh
#
# IMPORTANT: Run this script ONCE. After running, redeploy the service
# from Railway Dashboard to apply all changes.
# =============================================================================

set -e

echo "=== Setting Railway Environment Variables for Kristalin ==="
echo ""

# ------------------------------------------------------------------------------
# Core App Settings (Production hardening)
# ------------------------------------------------------------------------------
echo "📦 Setting core app variables..."
railway variables set APP_ENV=production
railway variables set APP_DEBUG=false
railway variables set LOG_LEVEL=warning
railway variables set LOG_CHANNEL=stderr

# ------------------------------------------------------------------------------
# SSR: DISABLED (root cause of high RAM cost)
# The Node.js SSR daemon consumes 100-200MB RAM 24/7 even with zero visitors.
# Keep this false unless you have strong SEO requirements and budget allows.
# ------------------------------------------------------------------------------
echo "🔴 Disabling Inertia SSR (saves ~$2-3/month RAM)..."
railway variables set INERTIA_SSR_ENABLED=false

# ------------------------------------------------------------------------------
# Session Driver: database (more efficient than file on Railway volumes)
# File sessions write to disk on EVERY request — adds I/O and volume usage.
# Database sessions reuse existing MySQL connection.
# ------------------------------------------------------------------------------
echo "💾 Setting session driver to database..."
railway variables set SESSION_DRIVER=database

# ------------------------------------------------------------------------------
# Cache Store: database (Railway has no Redis by default)
# Already was database, keeping consistent.
# ------------------------------------------------------------------------------
echo "📋 Confirming cache driver..."
railway variables set CACHE_STORE=database

# ------------------------------------------------------------------------------
# PHP Workers: 2 (conservative — reduces baseline RAM)
# More workers = more RAM even when idle.
# Company profile website doesn't need more than 2.
# ------------------------------------------------------------------------------
echo "⚙️  Setting PHP worker count..."
railway variables set PHP_CLI_SERVER_WORKERS=2

# ------------------------------------------------------------------------------
# Opcache memory (set via env for Railway)
# ------------------------------------------------------------------------------
railway variables set PHP_OPCACHE_MEMORY_CONSUMPTION=48

echo ""
echo "✅ All variables set!"
echo ""
echo "Next steps:"
echo "  1. Go to Railway Dashboard → kristalin project → your service"
echo "  2. Click 'Deploy' (or push a git commit to trigger redeploy)"
echo "  3. After deploy, check RAM graph — should drop from ~500MB to ~200-250MB"
echo "  4. Check Railway Usage after 24h — Network Egress should flatten"
echo ""
echo "To verify SSR is truly off after deploy, run:"
echo "  railway run php artisan tinker --execute=\"echo config('inertia.ssr.enabled') ? 'SSR ON' : 'SSR OFF';\""
