<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupR2Root extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'r2:cleanup-root {--dry-run : Show what would be deleted without deleting}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove R2 objects that are not inside the configured public prefix';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $prefix = r2_prefix();
        if ($prefix === '') {
            $this->error('R2_PREFIX is empty. Cleanup aborted to avoid deleting all objects.');
            return Command::FAILURE;
        }

        $targetPrefix = $prefix . '/';

        $this->info("🔍 Scanning R2 bucket for objects outside \"{$targetPrefix}\"");

        $allFiles = Storage::disk('s3')->allFiles(); // recursive

        $orphans = array_values(array_filter($allFiles, function (string $path) use ($targetPrefix) {
            return !str_starts_with($path, $targetPrefix);
        }));

        $inPrefix = array_values(array_filter($allFiles, function (string $path) use ($targetPrefix) {
            return str_starts_with($path, $targetPrefix);
        }));

        $this->info('📊 Total objects: ' . count($allFiles));
        $this->info('🗂️  Inside prefix: ' . count($inPrefix));
        $this->info('🗂️  Outside prefix: ' . count($orphans));

        if (empty($orphans)) {
            $this->info('✅ Nothing to clean up.');
            return Command::SUCCESS;
        }

        $this->table(['Sample outside paths'], array_map(fn ($p) => [$p], array_slice($orphans, 0, 10)));

        if ($this->option('dry-run')) {
            $this->warn('Dry run only. No files deleted.');
            return Command::SUCCESS;
        }

        $this->info('🧹 Deleting orphaned objects...');
        Storage::disk('s3')->delete($orphans);

        $this->info('✅ Cleanup complete.');
        return Command::SUCCESS;
    }
}
