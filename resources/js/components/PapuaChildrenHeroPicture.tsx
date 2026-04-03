import { useNetworkProfile } from '@/hooks/useNetworkProfile';
import { PAPUA_HERO_HEIGHT, PAPUA_HERO_WIDTH, getPapuaHeroBundle, papuaHeroResponsive } from '@/lib/papuaHeroImage';

type Props = {
    alt: string;
    /** Classes on the inner <img> (e.g. object-cover, transitions) */
    className?: string;
    /** Classes on <picture> (e.g. absolute inset-0) */
    pictureClassName?: string;
    style?: React.CSSProperties;
    /** Override sizes (default derives from network tier) */
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
    onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * Responsive LCP-friendly hero for papua-children (AVIF → WebP → JPEG; PNG fallback on error).
 * Srcset depth adapts to Save-Data / effectiveType / prefers-reduced-data.
 */
export function PapuaChildrenHeroPicture({
    alt,
    className,
    pictureClassName,
    style,
    sizes: sizesProp,
    loading = 'eager',
    fetchPriority = 'high',
    onError,
}: Props) {
    const { imageTier } = useNetworkProfile();
    const bundle = getPapuaHeroBundle(imageTier);
    const sizes = sizesProp ?? bundle.sizes;

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
            <source type="image/avif" srcSet={bundle.avifSrcSet} sizes={sizes} />
            <source type="image/webp" srcSet={bundle.webpSrcSet} sizes={sizes} />
            <img
                src={bundle.jpgFallback}
                srcSet={bundle.jpgSrcSet}
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
