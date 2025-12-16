const rawBase = import.meta.env.VITE_ASSET_BASE_URL as string | undefined;
const rawPrefix = import.meta.env.VITE_ASSET_PREFIX as string | undefined;

// Normalize base path (allows full URL or /images proxy)
const assetBase = (rawBase && rawBase.trim() !== '' ? rawBase : '/images').replace(/\/+$/, '');
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
    
    return `${assetBase}/${encodedPath}`;
}
