const rawBase = import.meta.env.VITE_ASSET_BASE_URL as string | undefined;
const rawPrefix = import.meta.env.VITE_ASSET_PREFIX as string | undefined;

// Gambar harus selalu dari https://cdn.kristalin.co.id/public/... (sama seperti 506paket1.jpg)
const CDN_BASE = 'https://cdn.kristalin.co.id';
let assetBase = (rawBase && rawBase.trim() !== '' ? rawBase : '/images').replace(/\/+$/, '');
if (assetBase.includes('cdn.kristalin.co.id') && assetBase.endsWith('/images')) {
    assetBase = assetBase.replace(/\/images$/i, '');
}
// Normalize object prefix (default to "public")
const assetPrefix = (rawPrefix && rawPrefix.trim() !== '' ? rawPrefix : 'public').replace(/^\/+|\/+$/g, '');

export function imageUrl(path: string): string {
    const normalizedPath = path.replace(/^\/+/, '');
    const needsPrefix = assetPrefix !== '' && !normalizedPath.startsWith(`${assetPrefix}/`);
    const objectPath = needsPrefix ? `${assetPrefix}/${normalizedPath}` : normalizedPath;
    
    // URL encode the path segments (but preserve slashes)
    // This handles special characters like parentheses in filenames
    // Note: encodeURIComponent doesn't encode ( and ) by default, so we need to manually encode them
    const encodedPath = objectPath
        .split('/')
        .map(segment => {
            // First use encodeURIComponent, then manually encode parentheses if needed
            let encoded = encodeURIComponent(segment);
            // Manually encode parentheses as they may cause issues with some CDNs
            encoded = encoded.replace(/\(/g, '%28').replace(/\)/g, '%29');
            return encoded;
        })
        .join('/');
    
    // Selalu pakai CDN untuk gambar; hindari kristalin.co.id/images/public/...
    const useBase =
        assetBase.startsWith(CDN_BASE) && !assetBase.endsWith('/images')
            ? assetBase
            : CDN_BASE;
    return `${useBase}/${encodedPath}`;
}
