<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        {{-- SEO Meta Tags --}}
        <meta name="description" content="PT Kristalin Ekalestari. Trusted gold mining company since 1989. Leading gold mining operations in Indonesia with commitment to sustainable mining practices.">
        <meta name="keywords" content="Kristalin, gold mining, Indonesia, mining company, sustainable mining, Papua, gold production">
        <meta name="author" content="PT Kristalin Ekalestari">
        <meta name="robots" content="index, follow">
        
        {{-- Open Graph Meta Tags --}}
        <meta property="og:title" content="PT Kristalin Ekalestari - Trusted Gold Mining Company Since 1989">
        <meta property="og:description" content="Trusted gold mining company since 1989. Leading gold mining operations in Indonesia with commitment to sustainable mining practices.">
        <meta property="og:image" content="{{ url('/kristalinlogotransisi1.png') }}">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Kristalin Ekalestari">
        
        {{-- Twitter Card Meta Tags --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="PT Kristalin Ekalestari - Trusted Gold Mining Company Since 1989">
        <meta name="twitter:description" content="Trusted gold mining company since 1989. Leading gold mining operations in Indonesia with commitment to sustainable mining practices.">
        <meta name="twitter:image" content="{{ url('/kristalinlogotransisi1.png') }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>PT Kristalin Ekalestari - Trusted Gold Mining Company Since 1989</title>

        <link rel="icon" href="/kristalinlogotransisi1.png?v={{ time() }}" sizes="any">
        <link rel="icon" href="/kristalinlogotransisi1.png?v={{ time() }}" type="image/png">
        <link rel="icon" href="/kristalinlogotransisi1.png?v={{ time() }}" sizes="16x16" type="image/png">
        <link rel="icon" href="/kristalinlogotransisi1.png?v={{ time() }}" sizes="32x32" type="image/png">
        <link rel="apple-touch-icon" href="/kristalinlogotransisi1.png?v={{ time() }}" sizes="180x180">
        <meta name="msapplication-TileImage" content="/kristalinlogotransisi1.png?v={{ time() }}">
        <meta name="theme-color" content="#FFD700">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
@vite(["resources/js/app.tsx", "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

