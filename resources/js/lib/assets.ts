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
    return `${assetBase}/${objectPath}`;
}
