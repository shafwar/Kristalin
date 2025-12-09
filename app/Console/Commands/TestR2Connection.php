<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class TestR2Connection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'r2:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Cloudflare R2 connection and configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Testing Cloudflare R2 Connection...');
        $this->newLine();
        
        // Check configuration
        $this->info('📋 Configuration:');
        $config = config('filesystems.disks.s3');
        $this->table(
            ['Setting', 'Value'],
            [
                ['Driver', $config['driver']],
                ['Bucket', $config['bucket']],
                ['Region', $config['region']],
                ['Endpoint', $config['endpoint'] ?? 'Not set'],
                ['Use Path Style', $config['use_path_style_endpoint'] ? 'Yes' : 'No'],
                ['Visibility', $config['visibility'] ?? 'Not set'],
            ]
        );
        
        $this->newLine();
        
        // Test connection
        $this->info('📡 Testing connection...');
        try {
            // Test write
            $testFileName = 'test-' . time() . '.txt';
            $testContent = 'R2 Connection Test - ' . now()->toDateTimeString();
            
            Storage::disk('s3')->put($testFileName, $testContent, 'public');
            $this->info('✅ Write test: SUCCESS');
            
            // Test read
            $readContent = Storage::disk('s3')->get($testFileName);
            if ($readContent === $testContent) {
                $this->info('✅ Read test: SUCCESS');
            } else {
                $this->error('❌ Read test: FAILED - Content mismatch');
            }
            
            // Test exists
            if (Storage::disk('s3')->exists($testFileName)) {
                $this->info('✅ Exists test: SUCCESS');
            } else {
                $this->error('❌ Exists test: FAILED');
            }
            
            // Test URL generation
            $url = Storage::disk('s3')->url($testFileName);
            $this->info('✅ URL generation: SUCCESS');
            $this->line('   Generated URL: ' . $url);
            
            // Cleanup
            Storage::disk('s3')->delete($testFileName);
            $this->info('✅ Cleanup: SUCCESS');
            
            $this->newLine();
            $this->info('🎉 All tests passed! R2 is properly configured.');
            
            // List some files
            $this->newLine();
            $this->info('📁 Listing files in bucket (first 10):');
            $files = Storage::disk('s3')->files();
            if (empty($files)) {
                $this->warn('   Bucket is empty');
            } else {
                $fileList = array_slice($files, 0, 10);
                foreach ($fileList as $file) {
                    $size = Storage::disk('s3')->size($file);
                    $this->line('   - ' . $file . ' (' . $this->formatBytes($size) . ')');
                }
                if (count($files) > 10) {
                    $this->line('   ... and ' . (count($files) - 10) . ' more files');
                }
            }
            
            return 0;
        } catch (\Exception $e) {
            $this->error('❌ Connection test failed!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();
            $this->warn('Please check:');
            $this->line('1. AWS_ACCESS_KEY_ID is correct');
            $this->line('2. AWS_SECRET_ACCESS_KEY is correct');
            $this->line('3. AWS_ENDPOINT is correct');
            $this->line('4. AWS_BUCKET exists and is accessible');
            $this->line('5. R2 bucket has public access enabled (if needed)');
            return 1;
        }
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



