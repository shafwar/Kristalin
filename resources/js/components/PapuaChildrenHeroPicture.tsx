import { PAPUA_HERO_HEIGHT, PAPUA_HERO_WIDTH, papuaHeroResponsive } from '@/lib/papuaHeroImage';

type Props = {
    alt: string;
    /** Classes on the inner <img> (e.g. object-cover, transitions) */
    className?: string;
    /** Classes on <picture> (e.g. absolute inset-0) */
    pictureClassName?: string;
    style?: React.CSSProperties;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
    onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * Responsive LCP-friendly hero for papua-children (AVIF → WebP → JPEG; PNG fallback on error).
 */
export function PapuaChildrenHeroPicture({
    alt,
    className,
    pictureClassName,
    style,
    sizes = '(max-width: 1023px) 100vw, 50vw',
    loading = 'eager',
    fetchPriority = 'high',
    onError,
}: Props) {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const el = e.currentTarget;
        if (!el.dataset.fallbackTried) {
            el.dataset.fallbackTried = '1';
            el.removeAttribute('srcset');
            el.src = papuaHeroResponsive.legacyPng;
            return;
        }
        onError?.(e);
    };

    return (
        <picture className={pictureClassName}>
            <source type="image/avif" srcSet={papuaHeroResponsive.avifSrcSet} sizes={sizes} />
            <source type="image/webp" srcSet={papuaHeroResponsive.webpSrcSet} sizes={sizes} />
            <img
                src={papuaHeroResponsive.jpgFallback}
                srcSet={papuaHeroResponsive.jpgSrcSet}
                sizes={sizes}
                width={PAPUA_HERO_WIDTH}
                height={PAPUA_HERO_HEIGHT}
                alt={alt}
                className={className ?? 'h-full w-full object-cover'}
                style={style}
                loading={loading}
                decoding="async"
                fetchPriority={fetchPriority}
                onError={handleError}
            />
        </picture>
    );
}
