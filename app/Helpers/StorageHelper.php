<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('r2_prefix')) {
    /**
     * Get configured R2 root prefix (e.g. "public")
     */
    function r2_prefix(): string
    {
        // Allow override via config, fallback to env for quick tweaks
        return trim(config('filesystems.disks.s3.root_prefix', env('R2_PREFIX', '')), '/');
    }
}

if (!function_exists('r2_object_path')) {
    /**
     * Normalize object path with optional root prefix
     *
     * @param string $path
     * @return string
     */
    function r2_object_path(string $path): string
    {
        // Remove leading slash if present
        $normalizedPath = ltrim($path, '/');

        // Drop common local public prefixes so we don't duplicate them in R2
        $stripPrefixes = [
            'public/',
            'kristalin-assets/public/',
            'kristalin-assets/',
        ];

        foreach ($stripPrefixes as $prefix) {
            if (str_starts_with($normalizedPath, $prefix)) {
                $normalizedPath = substr($normalizedPath, strlen($prefix));
                break;
            }
        }

        $prefix = r2_prefix();

        return $prefix !== '' ? "{$prefix}/{$normalizedPath}" : $normalizedPath;
    }
}

if (!function_exists('r2_url')) {
    /**
     * Generate URL for a file stored in R2
     *
     * @param string $path
     * @return string
     */
    function r2_url($path)
    {
        $prefixedPath = r2_object_path($path);

        // Get the URL from Storage
        $url = Storage::disk('s3')->url($prefixedPath);

        // If AWS_URL is set, use it; otherwise construct R2 public URL
        if (empty(config('filesystems.disks.s3.url'))) {
            $endpoint = config('filesystems.disks.s3.endpoint');
            $bucket = config('filesystems.disks.s3.bucket');

            // Extract account ID from endpoint
            if (preg_match('/https:\/\/([a-f0-9]+)\.r2\.cloudflarestorage\.com/', $endpoint, $matches)) {
                $accountId = $matches[1];
                // R2 public URL format: https://<account-id>.r2.cloudflarestorage.com/<bucket-name>/<object-key>
                $url = "https://{$accountId}.r2.cloudflarestorage.com/{$bucket}/{$prefixedPath}";
            }
        }

        return $url;
    }
}

if (!function_exists('r2_asset')) {
    /**
     * Generate URL for an asset stored in R2
     * Similar to asset() helper but for R2
     *
     * @param string $path
     * @return string
     */
    function r2_asset($path)
    {
        // Remove leading slash if present
        $path = ltrim($path, '/');

        return r2_url($path);
    }
}

if (!function_exists('image_url')) {
    /**
     * Generate URL for an image
     * Automatically uses R2 if configured, otherwise falls back to local
     *
     * @param string $path
     * @return string
     */
    function image_url($path)
    {
        // Remove leading slash if present
        $path = ltrim($path, '/');

        // Check if default disk is s3
        if (config('filesystems.default') === 's3') {
            return r2_url($path);
        }

        // Fallback to local asset
        return asset($path);
    }
}


