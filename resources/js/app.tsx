import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'react-hot-toast';
import { route as ziggyRoute } from 'ziggy-js';

// Make route globally available (avoid redeclare error)
declare global {
    interface Window {
        route: typeof ziggyRoute;
    }
}
window.route = ziggyRoute;

const appName = import.meta.env.VITE_APP_NAME || 'PT Kristalin Eka Lestari';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <Toaster
                    position="top-right"
                    containerClassName="toast-container"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#374151',
                            color: '#ffffff',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        },
                        success: {
                            style: {
                                background: '#059669',
                                color: '#ffffff',
                            },
                            iconTheme: {
                                primary: '#ffffff',
                                secondary: '#059669',
                            },
                        },
                        error: {
                            style: {
                                background: '#dc2626',
                                color: '#ffffff',
                            },
                            iconTheme: {
                                primary: '#ffffff',
                                secondary: '#dc2626',
                            },
                        },
                        loading: {
                            style: {
                                background: '#3b82f6',
                                color: '#ffffff',
                            },
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#3b82f6',
        showSpinner: true,
    },
});

// Initialize theme system
initializeTheme();

// Global error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (import.meta.env.DEV) {
        import('react-hot-toast').then(({ default: toast }) => {
            toast.error('An unexpected error occurred. Check console for details.');
        });
    }
});

if (import.meta.env.DEV) {
    console.log(
        '%c🚀 Kristalin Admin Panel %c- Development Mode',
        'color: #3b82f6; font-weight: bold; font-size: 16px;',
        'color: #6b7280; font-weight: normal; font-size: 14px;'
    );
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', import.meta.env.VITE_APP_URL);
}

if ('performance' in window && 'measure' in window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (perfData) {
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`📊 Page loaded in ${loadTime.toFixed(2)}ms`);
            }
        }, 0);
    });
}
