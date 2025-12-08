<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('r2_url')) {
    /**
     * Generate URL for a file stored in R2
     *
     * @param string $path
     * @return string
     */
    function r2_url($path)
    {
        // Remove leading slash if present
        $path = ltrim($path, '/');
        
        // If path starts with public/, remove it
        $path = preg_replace('/^public\//', '', $path);
        
        // Get the URL from Storage
        $url = Storage::disk('s3')->url($path);
        
        // If AWS_URL is set, use it; otherwise construct R2 public URL
        if (empty(config('filesystems.disks.s3.url'))) {
            $endpoint = config('filesystems.disks.s3.endpoint');
            $bucket = config('filesystems.disks.s3.bucket');
            
            // Extract account ID from endpoint
            if (preg_match('/https:\/\/([a-f0-9]+)\.r2\.cloudflarestorage\.com/', $endpoint, $matches)) {
                $accountId = $matches[1];
                // R2 public URL format: https://<account-id>.r2.cloudflarestorage.com/<bucket-name>/<object-key>
                $url = "https://{$accountId}.r2.cloudflarestorage.com/{$bucket}/{$path}";
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


