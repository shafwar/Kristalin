const rawBase = import.meta.env.VITE_ASSET_BASE_URL as string | undefined;

// Normalize base path (allows full URL or /images proxy)
const assetBase = (rawBase && rawBase.trim() !== '' ? rawBase : '/images').replace(/\/+$/, '');

export function imageUrl(path: string): string {
    const normalizedPath = path.replace(/^\/+/, '');
    return `${assetBase}/${normalizedPath}`;
}
