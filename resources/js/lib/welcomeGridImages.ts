import type { NetworkImageTier } from '@/hooks/useNetworkProfile';
import { imageUrl } from '@/lib/assets';
import type { PapuaHeroBundle } from '@/lib/papuaHeroImage';

const DIR = '/kristalin-assets/public';

export type WelcomeGridImageId = 'directorshero' | 'portofolio' | 'businessactivity';

/** Display dimensions match largest generated variant (layout stability) */
export const WELCOME_GRID_INTRINSIC: Record<WelcomeGridImageId, { width: number; height: number }> = {
    directorshero: { width: 1280, height: 1280 },
    portofolio: { width: 1280, height: 720 },
    businessactivity: { width: 1280, height: 853 },
};

function f(id: WelcomeGridImageId, w: 640 | 960 | 1280, ext: string): string {
    return `${DIR}/${id}-${w}w.${ext}`;
}

function bundleFor(
    id: WelcomeGridImageId,
    widths: readonly (640 | 960 | 1280)[],
    sizes: string,
    jpgFallbackW: 640 | 960 | 1280,
): PapuaHeroBundle {
    const avif = widths.map((w) => `${f(id, w, 'avif')} ${w}w`).join(', ');
    const webp = widths.map((w) => `${f(id, w, 'webp')} ${w}w`).join(', ');
    const jpg = widths.map((w) => `${f(id, w, 'jpg')} ${w}w`).join(', ');
    return {
        avifSrcSet: avif,
        webpSrcSet: webp,
        jpgSrcSet: jpg,
        jpgFallback: f(id, jpgFallbackW, 'jpg'),
        sizes,
    };
}

export type WelcomeGridBundleOptions = {
    /** Cap largest variant (e.g. 960 for full-bleed heroes — skips 1280w on fast connections). */
    maxWidth?: 640 | 960 | 1280;
    /**
     * Full-viewport / LCP heroes: on `minimal` image tier, still expose 960w so mobile Retina
     * does not upscale a 640px asset to the full screen (looks blocky with object-cover).
     */
    lcpHero?: boolean;
};

export function getWelcomeGridBundle(
    id: WelcomeGridImageId,
    tier: NetworkImageTier,
    options?: WelcomeGridBundleOptions,
): PapuaHeroBundle {
    const cap = options?.maxWidth;

    let widths: (640 | 960 | 1280)[];
    let sizes: string;
    let jpgFallbackW: 640 | 960 | 1280;

    if (tier === 'minimal') {
        if (options?.lcpHero) {
            widths = [640, 960];
            sizes = '(max-width: 1023px) 100vw, 50vw';
            jpgFallbackW = 960;
        } else {
            widths = [640];
            sizes = '(max-width: 1023px) 96vw, 48vw';
            jpgFallbackW = 640;
        }
    } else if (tier === 'conserve') {
        widths = [640, 960];
        sizes = '(max-width: 1023px) 98vw, 50vw';
        jpgFallbackW = 960;
    } else {
        widths = [640, 960, 1280];
        sizes = '(max-width: 1023px) 100vw, 50vw';
        jpgFallbackW = 1280;
    }

    if (cap) {
        widths = widths.filter((w) => w <= cap);
        if (widths.length === 0) widths = [640];
        jpgFallbackW = widths[widths.length - 1];
    }

    return bundleFor(id, widths, sizes, jpgFallbackW);
}

export function legacyGridJpg(id: WelcomeGridImageId): string {
    return imageUrl(`${id}.jpg`);
}
