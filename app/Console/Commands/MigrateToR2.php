<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class MigrateToR2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'r2:migrate {--dry-run : Show what would be migrated without actually uploading}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate all images and files from public folder to Cloudflare R2';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Starting migration to Cloudflare R2...');
        
        // Test R2 connection first
        $this->info('📡 Testing R2 connection...');
        try {
            Storage::disk('s3')->put('test-connection.txt', 'Connection test');
            Storage::disk('s3')->delete('test-connection.txt');
            $this->info('✅ R2 connection successful!');
        } catch (\Exception $e) {
            $this->error('❌ R2 connection failed: ' . $e->getMessage());
            return 1;
        }

        $publicPath = public_path();
        $dryRun = $this->option('dry-run');
        
        // Image extensions
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'];
        // Video extensions
        $videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'mkv'];
        // All allowed extensions
        $allowedExtensions = array_merge($imageExtensions, $videoExtensions);
        
        $this->info('📁 Scanning public folder...');
        
        $files = File::allFiles($publicPath);
        $filesToUpload = [];
        
        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            if (in_array($extension, $allowedExtensions)) {
                $filesToUpload[] = $file;
            }
        }
        
        $this->info('📊 Found ' . count($filesToUpload) . ' files to migrate');
        
        if (empty($filesToUpload)) {
            $this->warn('⚠️  No files found to migrate');
            return 0;
        }
        
        if ($dryRun) {
            $this->info('🔍 DRY RUN MODE - No files will be uploaded');
            $this->table(
                ['File', 'Size', 'Path'],
                array_map(function ($file) use ($publicPath) {
                    return [
                        $file->getFilename(),
                        $this->formatBytes($file->getSize()),
                        str_replace($publicPath . '/', '', $file->getPathname()),
                    ];
                }, $filesToUpload)
            );
            return 0;
        }
        
        $bar = $this->output->createProgressBar(count($filesToUpload));
        $bar->start();
        
        $uploaded = 0;
        $failed = 0;
        $skipped = 0;
        
        foreach ($filesToUpload as $file) {
            try {
                $relativePath = str_replace($publicPath . '/', '', $file->getPathname());
                
                // Check if file already exists in R2
                if (Storage::disk('s3')->exists($relativePath)) {
                    $skipped++;
                    $bar->advance();
                    continue;
                }
                
                // Upload to R2
                Storage::disk('s3')->putFileAs(
                    dirname($relativePath) === '.' ? '' : dirname($relativePath),
                    $file->getPathname(),
                    basename($relativePath),
                    'public'
                );
                
                $uploaded++;
            } catch (\Exception $e) {
                $failed++;
                $this->newLine();
                $this->error('Failed to upload: ' . $file->getFilename() . ' - ' . $e->getMessage());
            }
            
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine(2);
        
        $this->info('✅ Migration completed!');
        $this->table(
            ['Status', 'Count'],
            [
                ['Uploaded', $uploaded],
                ['Skipped (already exists)', $skipped],
                ['Failed', $failed],
                ['Total', count($filesToUpload)],
            ]
        );
        
        if ($failed > 0) {
            $this->warn('⚠️  Some files failed to upload. Please check the errors above.');
            return 1;
        }
        
        return 0;
    }
    
    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}


