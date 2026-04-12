import { useNetworkProfile } from '@/hooks/useNetworkProfile';
import { B2C_HERO_HEIGHT, B2C_HERO_WIDTH, getB2cHeroBundle, b2cHeroLegacyJpg } from '@/lib/b2cHeroImage';

type Props = {
    alt: string;
    className?: string;
    pictureClassName?: string;
    style?: React.CSSProperties;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
};

/**
 * LCP-oriented hero: AVIF → WebP → responsive JPEG, with legacy JPG fallback on error.
 */
export function B2cHeroPicture({
    alt,
    className,
    pictureClassName,
    style,
    sizes: sizesProp,
    loading = 'eager',
    fetchPriority = 'high',
}: Props) {
    const { imageTier } = useNetworkProfile();
    const bundle = getB2cHeroBundle(imageTier);
    const sizes = sizesProp ?? bundle.sizes;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const el = e.currentTarget;
        if (!el.dataset.fallbackTried) {
            el.dataset.fallbackTried = '1';
            el.removeAttribute('srcset');
            el.src = b2cHeroLegacyJpg();
            return;
        }
        el.style.display = 'none';
    };

    return (
        <picture className={pictureClassName}>
            <source type="image/avif" srcSet={bundle.avifSrcSet} sizes={sizes} />
            <source type="image/webp" srcSet={bundle.webpSrcSet} sizes={sizes} />
            <img
                src={bundle.jpgFallback}
                srcSet={bundle.jpgSrcSet}
                sizes={sizes}
                width={B2C_HERO_WIDTH}
                height={B2C_HERO_HEIGHT}
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
