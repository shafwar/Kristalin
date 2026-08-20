import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Kristalin Ekalestari';

createServer((page) =>
    createInertiaApp({
        title: (title) => (title ? (title.toLowerCase().includes('kristalin') ? title : `${title} | ${appName}`) : appName),
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => {
            /* eslint-disable */
            const ziggyConfig = (page.props as any)?.ziggy || {};
            const locationUrl = ziggyConfig.location ? new URL(ziggyConfig.location) : new URL('https://kristalin.co.id');
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...ziggyConfig,
                    location: locationUrl,
                });
            /* eslint-enable */

            return <App {...props} />;
        },
    }),
);
