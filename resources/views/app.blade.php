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

        <meta name="keywords" content="PT Kristalin Ekalestari, Kristalin, Pertambangan Emas Papua Barat, Sustainable Mining Indonesia, Tambang Nabire, Emas Batangan Kisara Gold, Investasi Tambang Emas, Dewan Adat Meyah, CSR Papua, PT Torindo, PT Abadi Bersama Sentosa">
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
        <meta property="og:title" content="{{ config('app.name', 'PT Kristalin Ekalestari') }} - Sustainable Mining & Natural Resources">
        <meta property="og:description" content="PT Kristalin Ekalestari adalah pelopor pertambangan emas berkelanjutan di Papua Barat, memadukan keunggulan operasional, inovasi teknologi, dan pemberdayaan masyarakat adat.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('kristalin-og-preview.jpg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="{{ str_replace('-', '_', app()->getLocale()) }}">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'PT Kristalin Ekalestari') }} - Sustainable Mining">
        <meta name="twitter:description" content="Pelopor pertambangan emas berkelanjutan dan pengolahan mineral bernilai tambah di Indonesia.">
        <meta name="twitter:image" content="{{ asset('kristalin-og-preview.jpg') }}">

        {{-- Structured Data --}}
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["Organization", "Corporation"],
              "@id": "https://kristalin.co.id/#organization",
              "name": "PT Kristalin Ekalestari",
              "alternateName": ["Kristalin", "Kristalin Ekalestari", "PT KEL"],
              "url": "https://kristalin.co.id",
              "logo": {
                "@type": "ImageObject",
                "url": "{{ asset('kristalin-logo-seo.png') }}"
              },
              "image": "{{ asset('kristalin-og-preview.jpg') }}",
              "description": "Perusahaan pertambangan emas dan pengolahan mineral berkelanjutan terkemuka di Indonesia yang memegang Izin Usaha Pertambangan Operasi Produksi (IUP OP) resmi di Nabire, Papua.",
              "foundingDate": "1989",
              "email": "info@kristalin.co.id",
              "telephone": "+622122978900",
              "sameAs": [
                "https://instagram.com/kristalin_ekalestari"
              ],
              "address": [
                {
                  "@type": "PostalAddress",
                  "name": "Headquarters",
                  "streetAddress": "Menara 165, Lt. 4, Jl. TB Simatupang Kav. 1, Cilandak Timur",
                  "addressLocality": "Jakarta Selatan",
                  "addressRegion": "DKI Jakarta",
                  "postalCode": "12560",
                  "addressCountry": "ID"
                },
                {
                  "@type": "PostalAddress",
                  "name": "Operational Mine Site Office",
                  "addressLocality": "Nabire",
                  "addressRegion": "Papua Tengah / Papua Barat",
                  "addressCountry": "ID"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Corporate Affairs & Customer Service",
                  "telephone": "+622122978900",
                  "email": "info@kristalin.co.id",
                  "url": "https://kristalin.co.id/contact",
                  "availableLanguage": ["id", "en", "zh"]
                }
              ],
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Legal Mining Permit (IUP OP)",
                  "value": "IUP Operasi Produksi No. 561/2021/DESDM (Registered on ESDM MODI/MOMI)"
                },
                {
                  "@type": "PropertyValue",
                  "name": "IUP Validity Period",
                  "value": "2020 - 2030 (10 Years Active Production Permit)"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Concession Area",
                  "value": "198 Hectares, Nabire, Papua"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Core Commodity",
                  "value": "Gold Exploration, Production, Refining & Kisara Gold Bullion"
                }
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://kristalin.co.id/#website",
              "url": "https://kristalin.co.id",
              "name": "PT Kristalin Ekalestari Official Website",
              "publisher": {
                "@id": "https://kristalin.co.id/#organization"
              }
            }
          ]
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

        <noscript>
            <div style="padding: 2rem; font-family: sans-serif; background: #fafafa; color: #111; max-width: 900px; margin: 0 auto;">
                <h1>PT Kristalin Ekalestari</h1>
                <p><strong>Pelopor Pertambangan Emas &amp; Mineral Berkelanjutan di Papua Barat, Indonesia.</strong></p>
                <p>PT Kristalin Ekalestari adalah perusahaan pertambangan dan pengolahan mineral yang berkomitmen menghadirkan nilai tambah ekonomi melalui praktik penambangan yang bertanggung jawab, pemanfaatan teknologi ramah lingkungan, serta program CSR terstruktur untuk masyarakat adat di Papua Barat.</p>
                
                <h2>Lini Usaha &amp; Portofolio Bisnis</h2>
                <ul>
                    <li><strong>Eksplorasi &amp; Penambangan Emas:</strong> Operasi tambang berwawasan lingkungan di Papua Barat dengan standar keselamatan dan ESG tertinggi.</li>
                    <li><strong>Logam Mulia (Kisara Gold):</strong> Produk emas batangan berkualitas tinggi dan terpercaya untuk pasar ritel dan institusi.</li>
                    <li><strong>Alat Berat &amp; Logistik (PT Torindo):</strong> Armada alat berat terpadu untuk efisiensi operasional dan infrastruktur.</li>
                    <li><strong>Agribisnis (PT Abadi Bersama Sentosa):</strong> Penggilingan padi modern di Boyolali untuk ketahanan pangan nasional.</li>
                </ul>

                <h2>Navigasi Halaman</h2>
                <ul>
                    <li><a href="/about">Tentang Kami / About Us</a></li>
                    <li><a href="/company-overview">Company Overview</a></li>
                    <li><a href="/vision-mission">Visi &amp; Misi</a></li>
                    <li><a href="/board-of-directors">Dewan Direksi &amp; Manajemen</a></li>
                    <li><a href="/line-of-business">Lini Bisnis</a></li>
                    <li><a href="/business-activity">Kegiatan Usaha</a></li>
                    <li><a href="/csr">Corporate Social Responsibility (CSR)</a></li>
                    <li><a href="/news">Berita &amp; Siaran Pers</a></li>
                    <li><a href="/contact">Hubungi Kami</a></li>
                </ul>
            </div>
        </noscript>
    </body>
</html>

