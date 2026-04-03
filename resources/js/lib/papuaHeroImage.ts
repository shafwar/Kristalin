import type { NetworkImageTier } from '@/hooks/useNetworkProfile';
import { imageUrl } from './assets';

/**
 * Optimized papua-children hero assets (AVIF/WebP/JPEG, responsive widths).
 * Files live under public/kristalin-assets/public/ and ship with the app deploy.
 */
const DIR = '/kristalin-assets/public';

export function papuaHeroFile(name: string): string {
    return `${DIR}/${name}`;
}

/** Intrinsic dimensions of source art (1600×1121) for layout stability */
export const PAPUA_HERO_WIDTH = 1600;
export const PAPUA_HERO_HEIGHT = 1121;

export const papuaHeroResponsive = {
    avifSrcSet: `${papuaHeroFile('papua-children-hero-640w.avif')} 640w, ${papuaHeroFile('papua-children-hero-960w.avif')} 960w, ${papuaHeroFile('papua-children-hero-1280w.avif')} 1280w`,
    webpSrcSet: `${papuaHeroFile('papua-children-hero-640w.webp')} 640w, ${papuaHeroFile('papua-children-hero-960w.webp')} 960w, ${papuaHeroFile('papua-children-hero-1280w.webp')} 1280w`,
    jpgSrcSet: `${papuaHeroFile('papua-children-hero-640w.jpg')} 640w, ${papuaHeroFile('papua-children-hero-960w.jpg')} 960w, ${papuaHeroFile('papua-children-hero-1280w.jpg')} 1280w`,
    jpgFallback: papuaHeroFile('papua-children-hero-1280w.jpg'),
    jpgBackground: papuaHeroFile('papua-children-hero-1280w.jpg'),
    legacyPng: imageUrl('papua-children.png'),
} as const;

export type PapuaHeroBundle = {
    avifSrcSet: string;
    webpSrcSet: string;
    jpgSrcSet: string;
    jpgFallback: string;
    sizes: string;
};

/** Narrower `sizes` nudges the browser toward smaller candidates on weak networks */
export function getPapuaHeroBundle(tier: NetworkImageTier): PapuaHeroBundle {
    const f = papuaHeroFile;
    if (tier === 'minimal') {
        return {
            avifSrcSet: `${f('papua-children-hero-640w.avif')} 640w`,
            webpSrcSet: `${f('papua-children-hero-640w.webp')} 640w`,
            jpgSrcSet: `${f('papua-children-hero-640w.jpg')} 640w`,
            jpgFallback: f('papua-children-hero-640w.jpg'),
            sizes: '(max-width: 1023px) 92vw, 46vw',
        };
    }
    if (tier === 'conserve') {
        return {
            avifSrcSet: `${f('papua-children-hero-640w.avif')} 640w, ${f('papua-children-hero-960w.avif')} 960w`,
            webpSrcSet: `${f('papua-children-hero-640w.webp')} 640w, ${f('papua-children-hero-960w.webp')} 960w`,
            jpgSrcSet: `${f('papua-children-hero-640w.jpg')} 640w, ${f('papua-children-hero-960w.jpg')} 960w`,
            jpgFallback: f('papua-children-hero-960w.jpg'),
            sizes: '(max-width: 1023px) 96vw, 48vw',
        };
    }
    return {
        avifSrcSet: papuaHeroResponsive.avifSrcSet,
        webpSrcSet: papuaHeroResponsive.webpSrcSet,
        jpgSrcSet: papuaHeroResponsive.jpgSrcSet,
        jpgFallback: papuaHeroResponsive.jpgFallback,
        sizes: '(max-width: 1023px) 100vw, 50vw',
    };
}

export function papuaBackgroundForTier(tier: NetworkImageTier): string {
    if (tier === 'minimal') return papuaHeroFile('papua-children-hero-640w.jpg');
    if (tier === 'conserve') return papuaHeroFile('papua-children-hero-960w.jpg');
    return papuaHeroResponsive.jpgBackground;
}
