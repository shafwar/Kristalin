<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PushFileToR2 extends Command
{
    protected $signature = 'r2:push-file {path : Relative path from public/ (e.g. kristalin-assets/public/february news 01.jpg)}';
    protected $description = 'Upload a single file from public/ to Cloudflare R2 (same key pattern as r2:migrate)';

    public function handle(): int
    {
        $relativePath = ltrim($this->argument('path'), '/');
        $fullPath = public_path($relativePath);

        if (!is_file($fullPath)) {
            $this->error("File not found: {$fullPath}");
            return 1;
        }

        // Use s3 disk explicitly (no need to set FILESYSTEM_DISK=s3 globally)
        $bucket = config('filesystems.disks.s3.bucket');
        $key = config('filesystems.disks.s3.key');
        if (empty($bucket) || empty($key)) {
            $this->error('R2/S3 not configured. Set AWS_BUCKET and AWS_ACCESS_KEY_ID (and AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT) in .env to push to R2.');
            return 1;
        }

        $targetPath = r2_object_path($relativePath);
        $this->info("Uploading: {$relativePath} → R2 key: {$targetPath}");

        try {
            if (Storage::disk('s3')->exists($targetPath)) {
                $this->warn('File already exists in R2. Overwriting.');
            }
            Storage::disk('s3')->put(
                $targetPath,
                file_get_contents($fullPath),
                'public'
            );
            $url = Storage::disk('s3')->url($targetPath);
            $this->info('✅ Uploaded successfully.');
            $this->line('R2 URL: ' . $url);
            $this->line('Frontend: use imageUrl(\'february news 01.jpg\'); URL will resolve via /images/ proxy or CDN.');
            return 0;
        } catch (\Throwable $e) {
            $this->error('Upload failed: ' . $e->getMessage());
            return 1;
        }
    }
}
