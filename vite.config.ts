import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: { include: ['react', 'react-dom', '@inertiajs/react'] },
}))
