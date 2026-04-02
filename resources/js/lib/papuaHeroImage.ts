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
