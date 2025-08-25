<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- SEO Meta Tags for Kristalin Branding --}}
        <meta name="description" content="PT Kristalin Ekalestari - Leading sustainable gold mining company in Indonesia. Committed to excellence, environmental responsibility, and community development.">
        <meta name="keywords" content="Kristalin, PT Kristalin Ekalestari, gold mining, sustainable mining, Indonesia mining, CSR, community development">
        <meta name="author" content="PT Kristalin Ekalestari">
        <meta property="og:title" content="PT Kristalin Ekalestari - Sustainable Gold Mining">
        <meta property="og:description" content="Leading sustainable gold mining company in Indonesia. Committed to excellence, environmental responsibility, and community development.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://kristalin.co.id">
        <meta property="og:image" content="https://kristalin.co.id/kristalinlogotransisi1.png">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="PT Kristalin Ekalestari - Sustainable Gold Mining">
        <meta name="twitter:description" content="Leading sustainable gold mining company in Indonesia.">
        <meta name="twitter:image" content="https://kristalin.co.id/kristalinlogotransisi1.png">

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

        <title inertia>{{ config('app.name', 'Kristalin') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

