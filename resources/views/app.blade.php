<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="PT Kristalin Eka Lestari">
    <meta name="description" content="PT Kristalin Eka Lestari - Gold Mining Company">

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

        /* Loading spinner for page transitions */
        .inertia-progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #06b6d4);
            z-index: 50;
            transition: opacity 0.2s;
        }

        /* Toast container positioning */
        .toast-container {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 9999;
        }
    </style>

    {{-- Page title with company name --}}
    <title inertia>{{ config('app.name', 'PT Kristalin Eka Lestari') }}</title>

    {{-- Favicons --}}
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

    {{-- Ziggy Routes for Frontend --}}
    @routes

    {{-- Vite Assets --}}
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

    {{-- Inertia Head --}}
    @inertiaHead

    {{-- Additional Meta for SEO (Optional) --}}
    @if(isset($seo))
        <meta property="og:title" content="{{ $seo['title'] ?? config('app.name') }}">
        <meta property="og:description" content="{{ $seo['description'] ?? 'PT Kristalin Eka Lestari - Gold Mining Company' }}">
        <meta property="og:image" content="{{ $seo['image'] ?? asset('images/og-image.jpg') }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta name="twitter:card" content="summary_large_image">
    @endif
</head>
<body class="font-sans antialiased">
    {{-- Inertia App Root --}}
    @inertia

    {{-- Additional Scripts (Optional) --}}
    @if(config('app.env') === 'local')
        {{-- Development only scripts --}}
        <script>
            // Console log for development
            console.log('🚀 Kristalin Admin Panel - Development Mode');
            console.log('Environment:', '{{ config("app.env") }}');
            console.log('Laravel Version:', '{{ app()->version() }}');
        </script>
    @endif
</body>
</html>
