import type { NetworkImageTier } from '@/hooks/useNetworkProfile';
import { imageUrl } from '@/lib/assets';
import type { PapuaHeroBundle } from '@/lib/papuaHeroImage';

/**
 * B2C hero (quarry / operations) — responsive AVIF/WebP/JPEG under kristalin-assets/public.
 * Source art ratio 3:2 (5184×3456); display box uses 1280×853 intrinsic.
 */
const DIR = '/kristalin-assets/public';

export function b2cHeroFile(name: string): string {
    return `${DIR}/${name}`;
}

export const B2C_HERO_WIDTH = 1280;
export const B2C_HERO_HEIGHT = 853;

const responsive = {
    avifSrcSet: `${b2cHeroFile('b2c-kristalin-hero-640w.avif')} 640w, ${b2cHeroFile('b2c-kristalin-hero-960w.avif')} 960w, ${b2cHeroFile('b2c-kristalin-hero-1280w.avif')} 1280w`,
    webpSrcSet: `${b2cHeroFile('b2c-kristalin-hero-640w.webp')} 640w, ${b2cHeroFile('b2c-kristalin-hero-960w.webp')} 960w, ${b2cHeroFile('b2c-kristalin-hero-1280w.webp')} 1280w`,
    jpgSrcSet: `${b2cHeroFile('b2c-kristalin-hero-640w.jpg')} 640w, ${b2cHeroFile('b2c-kristalin-hero-960w.jpg')} 960w, ${b2cHeroFile('b2c-kristalin-hero-1280w.jpg')} 1280w`,
    jpgFallback: b2cHeroFile('b2c-kristalin-hero-1280w.jpg'),
} as const;

export function getB2cHeroBundle(tier: NetworkImageTier): PapuaHeroBundle {
    const f = b2cHeroFile;
    if (tier === 'minimal') {
        return {
            avifSrcSet: `${f('b2c-kristalin-hero-640w.avif')} 640w`,
            webpSrcSet: `${f('b2c-kristalin-hero-640w.webp')} 640w`,
            jpgSrcSet: `${f('b2c-kristalin-hero-640w.jpg')} 640w`,
            jpgFallback: f('b2c-kristalin-hero-640w.jpg'),
            sizes: '100vw',
        };
    }
    if (tier === 'conserve') {
        return {
            avifSrcSet: `${f('b2c-kristalin-hero-640w.avif')} 640w, ${f('b2c-kristalin-hero-960w.avif')} 960w`,
            webpSrcSet: `${f('b2c-kristalin-hero-640w.webp')} 640w, ${f('b2c-kristalin-hero-960w.webp')} 960w`,
            jpgSrcSet: `${f('b2c-kristalin-hero-640w.jpg')} 640w, ${f('b2c-kristalin-hero-960w.jpg')} 960w`,
            jpgFallback: f('b2c-kristalin-hero-960w.jpg'),
            sizes: '100vw',
        };
    }
    return {
        avifSrcSet: responsive.avifSrcSet,
        webpSrcSet: responsive.webpSrcSet,
        jpgSrcSet: responsive.jpgSrcSet,
        jpgFallback: responsive.jpgFallback,
        sizes: '100vw',
    };
}

/** Original full-resolution JPEG filename (spaces); CDN path via imageUrl */
export const b2cHeroLegacyJpg = (): string => imageUrl('kristalin-assets/public/b2c kristalin image.jpg');
