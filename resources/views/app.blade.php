<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Google tag (gtag.js) --}}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C6HXW60WWP"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C6HXW60WWP');
        </script>

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

        <title inertia>{{ config('app.name', 'Kristalin Ekalestari') }}</title>

        <link rel="icon" href="{{ image_url('favicon.ico') }}" sizes="any">
        <link rel="icon" href="{{ image_url('favicon.svg') }}" type="image/svg+xml">
        <link rel="icon" href="{{ image_url('favicon-16x16.png') }}" sizes="16x16" type="image/png">
        <link rel="icon" href="{{ image_url('favicon-32x32.png') }}" sizes="32x32" type="image/png">
        <link rel="apple-touch-icon" href="{{ image_url('apple-touch-icon.png') }}" sizes="180x180">
        <meta name="msapplication-TileImage" content="{{ image_url('apple-touch-icon.png') }}">
        <meta name="theme-color" content="#FFD700">

        @php
            $cdnOrigin = rtrim((string) env('AWS_URL', 'https://cdn.kristalin.co.id'), '/');
            if (! str_starts_with($cdnOrigin, 'http')) {
                $cdnOrigin = 'https://' . ltrim($cdnOrigin, '/');
            }
        @endphp
        <link rel="dns-prefetch" href="{{ $cdnOrigin }}">
        <link rel="preconnect" href="{{ $cdnOrigin }}" crossorigin>

        @if(request()->routeIs('home'))
        {{-- AVIF preloads by viewport; browsers without AVIF skip and use <picture> WebP/JPEG --}}
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-640w.avif') }}" media="(max-width: 640px)" fetchpriority="high">
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-960w.avif') }}" media="(min-width: 641px) and (max-width: 1023px)" fetchpriority="high">
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-1280w.avif') }}" media="(min-width: 1024px)" fetchpriority="high">
        @endif

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />

        @routes
        @viteReactRefresh
@vite(["resources/js/app.tsx", "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

