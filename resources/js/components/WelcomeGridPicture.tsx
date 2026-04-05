import { useNetworkProfile } from '@/hooks/useNetworkProfile';
import {
    getWelcomeGridBundle,
    legacyGridJpg,
    type WelcomeGridImageId,
    type WelcomeGridBundleOptions,
    WELCOME_GRID_INTRINSIC,
} from '@/lib/welcomeGridImages';

type Props = {
    imageId: WelcomeGridImageId;
    alt: string;
    className?: string;
    pictureClassName?: string;
    style?: React.CSSProperties;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
    decoding?: 'async' | 'auto' | 'sync';
    /** Passed to getWelcomeGridBundle — limits largest srcset width (lighter on Slow 4G / large DPR). */
    bundleOptions?: WelcomeGridBundleOptions;
};

/**
 * Responsive AVIF/WebP/JPEG for welcome carousel + business activity cards.
 * Served from /kristalin-assets/public/; falls back to CDN JPG on error.
 */
export function WelcomeGridPicture({
    imageId,
    alt,
    className,
    pictureClassName,
    style,
    sizes: sizesOverride,
    loading = 'lazy',
    fetchPriority = 'low',
    decoding = 'async',
    bundleOptions,
}: Props) {
    const { imageTier } = useNetworkProfile();
    const bundle = getWelcomeGridBundle(imageId, imageTier, bundleOptions);
    const sizes = sizesOverride ?? bundle.sizes;
    const { width, height } = WELCOME_GRID_INTRINSIC[imageId];

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const el = e.currentTarget;
        if (!el.dataset.fallbackTried) {
            el.dataset.fallbackTried = '1';
            el.removeAttribute('srcset');
            el.src = legacyGridJpg(imageId);
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
                width={width}
                height={height}
                alt={alt}
                className={className ?? 'h-full w-full object-cover'}
                style={style}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                onError={handleError}
            />
        </picture>
    );
}
