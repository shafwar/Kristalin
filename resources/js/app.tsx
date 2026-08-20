import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

// Global resilience handlers for dynamic import / chunk load failures during redeployments
if (typeof window !== 'undefined') {
    window.addEventListener('vite:preloadError', (event) => {
        event.preventDefault();
        window.location.reload();
    });

    window.addEventListener('unhandledrejection', (event) => {
        if (
            event.reason &&
            typeof event.reason.message === 'string' &&
            (event.reason.message.includes('Failed to fetch dynamically imported module') ||
                event.reason.message.includes('Importing a module script failed') ||
                event.reason.message.includes('error loading dynamically imported module'))
        ) {
            event.preventDefault();
            const lastReload = sessionStorage.getItem('chunk_reload_ts');
            const now = Date.now();
            if (!lastReload || now - Number(lastReload) > 10000) {
                sessionStorage.setItem('chunk_reload_ts', String(now));
                window.location.reload();
            }
        }
    });
}

const appName = import.meta.env.VITE_APP_NAME || 'Kristalin Ekalestari';

createInertiaApp({
    title: (title) => (title ? (title.toLowerCase().includes('kristalin') ? title : `${title} | ${appName}`) : `PT ${appName}`),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        return resolvePageComponent(`./pages/${name}.tsx`, pages).catch((err) => {
            const lastReload = sessionStorage.getItem('chunk_reload_ts');
            const now = Date.now();
            if (!lastReload || now - Number(lastReload) > 10000) {
                sessionStorage.setItem('chunk_reload_ts', String(now));
                window.location.reload();
            }
            throw err;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
