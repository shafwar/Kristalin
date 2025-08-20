import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    // Remove base configuration to prevent double /build/ paths
    // base: mode === 'production' ? '/build/' : '/',

    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            // Use default build directory
            buildDirectory: 'build',
        }),
        react(),
        tailwindcss(),
    ],

    esbuild: { jsx: 'automatic' },

    resolve: {
        alias: { 'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy') },
    },

    build: {
        outDir: 'public/build',
        assetsDir: 'assets',
        sourcemap: mode === 'development',
        manifest: true,
        // Improved asset optimization for production
        rollupOptions: {
            output: {
                // Ensure assets are properly chunked and named
                assetFileNames: (assetInfo) => {
                    if (!assetInfo.name) return 'assets/[name]-[hash].[ext]';
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/\.(css)$/.test(assetInfo.name)) {
                        return `assets/[name]-[hash].${ext}`;
                    }
                    return `assets/[name]-[hash].${ext}`;
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: { include: ['react', 'react-dom', '@inertiajs/react'] },
}));
