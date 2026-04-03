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

export function getWelcomeGridBundle(id: WelcomeGridImageId, tier: NetworkImageTier): PapuaHeroBundle {
    if (tier === 'minimal') {
        return bundleFor(id, [640], '(max-width: 1023px) 96vw, 48vw', 640);
    }
    if (tier === 'conserve') {
        return bundleFor(id, [640, 960], '(max-width: 1023px) 98vw, 50vw', 960);
    }
    return bundleFor(id, [640, 960, 1280], '(max-width: 1023px) 100vw, 50vw', 1280);
}

export function legacyGridJpg(id: WelcomeGridImageId): string {
    return imageUrl(`${id}.jpg`);
}
