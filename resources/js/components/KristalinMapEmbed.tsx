import { buildGoogleMapsEmbedUrl, buildGoogleMapsExternalUrl, type KristalinLocation } from '@/lib/kristalinLocations';
import clsx from 'clsx';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type KristalinMapEmbedProps = {
    location: KristalinLocation;
    title: string;
    address: string;
    subtitle?: string;
    note?: string;
    openMapsLabel?: string;
    className?: string;
    /** light = white card; dark = for contact page on black bg */
    tone?: 'light' | 'dark';
    lazy?: boolean;
};

export function KristalinMapEmbed({
    location,
    title,
    address,
    subtitle,
    note,
    openMapsLabel = 'Open in Google Maps',
    className,
    tone = 'light',
    lazy = true,
}: KristalinMapEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(!lazy);
    const [iframeReady, setIframeReady] = useState(false);
    const isDark = tone === 'dark';

    useEffect(() => {
        if (!lazy || shouldLoad) return;
        const node = containerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '120px' },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [lazy, shouldLoad]);

    const mapsUrl = buildGoogleMapsExternalUrl(location);

    return (
        <div
            ref={containerRef}
            className={clsx(
                'group relative overflow-hidden rounded-2xl p-[1px] shadow-xl',
                isDark
                    ? 'bg-gradient-to-br from-amber-400/40 via-amber-500/20 to-stone-600/30 shadow-black/40'
                    : 'bg-gradient-to-br from-amber-300/70 via-amber-400/40 to-stone-300/50 shadow-stone-300/30',
                className,
            )}
        >
            <div
                className={clsx(
                    'overflow-hidden rounded-[calc(1rem-1px)]',
                    isDark ? 'bg-stone-900' : 'bg-white',
                )}
            >
                {/* Header */}
                <div
                    className={clsx(
                        'relative px-5 py-4 sm:px-6 sm:py-5',
                        isDark
                            ? 'border-b border-white/10 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800'
                            : 'border-b border-stone-100 bg-gradient-to-r from-amber-50/80 via-white to-stone-50',
                    )}
                >
                    <div className="flex items-start gap-4">
                        <span
                            className={clsx(
                                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm',
                                isDark
                                    ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900'
                                    : 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 ring-1 ring-amber-200/60',
                            )}
                        >
                            <MapPin className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                            {subtitle ? (
                                <p
                                    className={clsx(
                                        'text-[11px] font-semibold tracking-[0.18em] uppercase',
                                        isDark ? 'text-amber-400/90' : 'text-amber-700/90',
                                    )}
                                >
                                    {subtitle}
                                </p>
                            ) : null}
                            <h3 className={clsx('text-base font-semibold sm:text-lg', isDark ? 'text-white' : 'text-stone-900')}>
                                {title}
                            </h3>
                            <p className={clsx('mt-1.5 text-sm leading-relaxed', isDark ? 'text-stone-400' : 'text-stone-600')}>
                                {address}
                            </p>
                            {note ? (
                                <p className={clsx('mt-2 text-xs leading-relaxed', isDark ? 'text-stone-500' : 'text-stone-500')}>
                                    {note}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Map frame */}
                <div className="relative">
                    <div
                        className={clsx(
                            'relative aspect-[16/10] w-full sm:aspect-[2/1]',
                            isDark ? 'bg-stone-800' : 'bg-stone-100',
                        )}
                    >
                        {!iframeReady && shouldLoad ? (
                            <div
                                className={clsx(
                                    'absolute inset-0 flex flex-col items-center justify-center gap-3',
                                    isDark ? 'bg-stone-800 text-stone-500' : 'bg-stone-100 text-stone-400',
                                )}
                            >
                                <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-amber-400/20">
                                    <MapPin className="h-6 w-6 text-amber-500" aria-hidden />
                                </span>
                                <span className="text-xs font-medium tracking-wide uppercase">Loading map…</span>
                            </div>
                        ) : null}

                        {!shouldLoad ? (
                            <div
                                className={clsx(
                                    'absolute inset-0 flex items-center justify-center text-sm',
                                    isDark ? 'text-stone-600' : 'text-stone-400',
                                )}
                            >
                                …
                            </div>
                        ) : (
                            <iframe
                                title={title}
                                src={buildGoogleMapsEmbedUrl(location)}
                                className={clsx(
                                    'absolute inset-0 h-full w-full border-0 transition-opacity duration-500',
                                    iframeReady ? 'opacity-100' : 'opacity-0',
                                )}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                onLoad={() => setIframeReady(true)}
                            />
                        )}

                        {/* Bottom gradient + CTA overlay */}
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
                            aria-hidden
                        />
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={clsx(
                                'absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-300',
                                'hover:-translate-y-0.5 hover:shadow-xl motion-reduce:hover:translate-y-0',
                                isDark
                                    ? 'bg-white/95 text-stone-900 hover:bg-white'
                                    : 'bg-stone-900/90 text-white hover:bg-stone-900',
                            )}
                        >
                            <Navigation className="h-3.5 w-3.5" aria-hidden />
                            {openMapsLabel}
                            <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
