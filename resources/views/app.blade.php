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

        <meta name="description" content="PT Kristalin Ekalestari — Pioneering sustainable gold mining in Papua since 1989. Licensed IUP Production Operation holder in Nabire with strong ESG commitment and indigenous community empowerment.">
        <meta name="author" content="PT Kristalin Ekalestari">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <link rel="canonical" href="{{ url()->current() }}">

        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="48x48" href="{{ asset('favicon-48x48.png') }}">
        <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('favicon-96x96.png') }}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('favicon-192x192.png') }}">
        <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('favicon-512x512.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
        <meta name="msapplication-TileImage" content="{{ asset('favicon-512x512.png') }}">
        <meta name="theme-color" content="#FFD700">

        {{-- SEO & Open Graph --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="PT Kristalin Ekalestari">
        <meta property="og:title" content="PT Kristalin Ekalestari — Sustainable Gold Mining in Papua">
        <meta property="og:description" content="Pioneering sustainable gold mining and mineral processing in Papua since 1989. Licensed IUP Production Operation holder with strong ESG commitment and indigenous community empowerment.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('kristalin-og-preview.jpg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        @php
            $currentAppLocale = app()->getLocale();
            $localeToOgMap = [
                'id' => 'id_ID',
                'en' => 'en_US',
                'zh' => 'zh_CN',
            ];
            $currentOgLocale = $localeToOgMap[$currentAppLocale] ?? 'en_US';
            $alternateOgLocales = array_values(array_filter($localeToOgMap, fn ($loc) => $loc !== $currentOgLocale));
        @endphp
        <meta property="og:locale" content="{{ $currentOgLocale }}">
        @foreach ($alternateOgLocales as $altOgLocale)
        <meta property="og:locale:alternate" content="{{ $altOgLocale }}">
        @endforeach

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="PT Kristalin Ekalestari — Sustainable Gold Mining in Papua">
        <meta name="twitter:description" content="Pioneering sustainable gold mining and value-added mineral processing in Papua, Indonesia since 1989.">
        <meta name="twitter:image" content="{{ asset('kristalin-og-preview.jpg') }}">

        {{-- Structured Data --}}
        <script type="application/ld+json">
        {!! json_encode([
          '@context' => 'https://schema.org',
          '@graph' => [
            [
              '@type' => ['Organization', 'Corporation'],
              '@id' => 'https://kristalin.co.id/#organization',
              'name' => 'PT Kristalin Ekalestari',
              'alternateName' => ['Kristalin', 'Kristalin Ekalestari', 'PT KEL'],
              'url' => 'https://kristalin.co.id',
              'logo' => [
                '@type' => 'ImageObject',
                'url' => asset('kristalin-logo-seo.png'),
              ],
              'image' => asset('kristalin-og-preview.jpg'),
              'description' => 'A leading sustainable gold mining and mineral processing company in Indonesia, holding an official Production Operation Mining Permit (IUP OP) in Nabire, Papua.',
              'foundingDate' => '1989',
              'email' => 'info@kristalin.co.id',
              'telephone' => '+622122978900',
              'sameAs' => [
                'https://instagram.com/kristalin_ekalestari',
              ],
              'address' => [
                [
                  '@type' => 'PostalAddress',
                  'name' => 'Headquarters',
                  'streetAddress' => 'Menara 165, Lt. 4, Jl. TB Simatupang Kav. 1, Cilandak Timur',
                  'addressLocality' => 'Jakarta Selatan',
                  'addressRegion' => 'DKI Jakarta',
                  'postalCode' => '12560',
                  'addressCountry' => 'ID',
                ],
                [
                  '@type' => 'PostalAddress',
                  'name' => 'Operational Mine Site Office',
                  'addressLocality' => 'Nabire',
                  'addressRegion' => 'Papua Tengah / Papua Barat',
                  'addressCountry' => 'ID',
                ],
              ],
              'contactPoint' => [
                [
                  '@type' => 'ContactPoint',
                  'contactType' => 'Corporate Affairs & Customer Service',
                  'telephone' => '+622122978900',
                  'email' => 'info@kristalin.co.id',
                  'url' => 'https://kristalin.co.id/contact',
                  'availableLanguage' => ['id', 'en', 'zh'],
                ],
              ],
              'additionalProperty' => [
                [
                  '@type' => 'PropertyValue',
                  'name' => 'Legal Mining Permit (IUP OP)',
                  'value' => 'IUP Operasi Produksi No. 561/2021/DESDM (Registered on ESDM MODI/MOMI)',
                ],
                [
                  '@type' => 'PropertyValue',
                  'name' => 'IUP Validity Period',
                  'value' => '2020 - 2030 (10 Years Active Production Permit)',
                ],
                [
                  '@type' => 'PropertyValue',
                  'name' => 'Concession Area',
                  'value' => '198 Hectares, Nabire, Papua',
                ],
                [
                  '@type' => 'PropertyValue',
                  'name' => 'Core Commodity',
                  'value' => 'Gold Exploration, Production, Refining & Kisara Gold Bullion',
                ],
              ],
            ],
            [
              '@type' => 'WebSite',
              '@id' => 'https://kristalin.co.id/#website',
              'url' => 'https://kristalin.co.id',
              'name' => 'PT Kristalin Ekalestari',
              'alternateName' => 'Kristalin',
              'publisher' => [
                '@id' => 'https://kristalin.co.id/#organization',
              ],
            ],
          ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
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

        <noscript>
            <div style="padding: 2rem; font-family: sans-serif; background: #fafafa; color: #111; max-width: 900px; margin: 0 auto;">
                <h1>PT Kristalin Ekalestari</h1>
                <p><strong>Pioneering Sustainable Gold &amp; Mineral Mining in Papua, Indonesia.</strong></p>
                <p>PT Kristalin Ekalestari is a mining and mineral processing company committed to delivering economic value through responsible mining practices, environmentally friendly technology, and structured CSR programs for indigenous communities in Papua.</p>
                
                <h2>Business Lines &amp; Portfolio</h2>
                <ul>
                    <li><strong>Gold Exploration &amp; Mining:</strong> Environmentally conscious mining operations in Papua with the highest safety and ESG standards.</li>
                    <li><strong>Precious Metals (Kisara Gold):</strong> High-quality and trusted gold bullion products for retail and institutional markets.</li>
                    <li><strong>Heavy Equipment &amp; Logistics (PT Torindo):</strong> Integrated heavy equipment fleet for operational efficiency and infrastructure.</li>
                    <li><strong>Agribusiness (PT Abadi Bersama Sentosa):</strong> Modern rice milling in Boyolali for national food security.</li>
                </ul>

                <h2>Site Navigation</h2>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/board-of-directors">Board of Directors &amp; Management</a></li>
                    <li><a href="/line-of-business">Business Portfolio &amp; Subsidiaries</a></li>
                    <li><a href="/business-activity">Mining Operations</a></li>
                    <li><a href="/csr">Corporate Social Responsibility (CSR)</a></li>
                    <li><a href="/news">News &amp; Press Releases</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
        </noscript>
    </body>
</html>

