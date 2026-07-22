<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Defer GA until after load so LCP/critical path are not competing with gtag --}}
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.addEventListener('load', function () {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-C6HXW60WWP';
                s.onload = function () {
                    gtag('js', new Date());
                    gtag('config', 'G-C6HXW60WWP');
                };
                document.head.appendChild(s);
            });
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

        {{-- SEO & Open Graph --}}
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'Kristalin Ekalestari') }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ image_url('Mark-Gold.webp') }}">
        <meta property="og:image:width" content="1200">

        {{-- Structured Data --}}
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Kristalin Ekalestari",
          "url": "{{ url('/') }}",
          "logo": "{{ image_url('Mark-Gold.webp') }}",
          "image": "{{ image_url('Mark-Gold.webp') }}"
        }
        </script>

        @php
            $cdnOrigin = rtrim((string) env('AWS_URL', 'https://cdn.kristalin.co.id'), '/');
            if (! str_starts_with($cdnOrigin, 'http')) {
                $cdnOrigin = 'https://' . ltrim($cdnOrigin, '/');
            }
        @endphp
        <link rel="dns-prefetch" href="{{ $cdnOrigin }}">
        <link rel="preconnect" href="{{ $cdnOrigin }}" crossorigin>

        @if(request()->routeIs('home'))
        {{-- One format per breakpoint avoids double fetch; AVIF skipped by engines that ignore type --}}
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-640w.avif') }}" media="(max-width: 640px)" fetchpriority="high">
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-960w.avif') }}" media="(min-width: 641px) and (max-width: 1023px)" fetchpriority="high">
        <link rel="preload" as="image" type="image/avif" href="{{ asset('kristalin-assets/public/papua-children-hero-1280w.avif') }}" media="(min-width: 1024px)" fetchpriority="high">
        @endif

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />
        </noscript>

        @routes
        @viteReactRefresh
@vite(["resources/js/app.tsx", "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

