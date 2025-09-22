<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        // Fix for MySQL 5.7+ compatibility
        Schema::defaultStringLength(191);

        // Inertia asset versioning based on Vite manifest hash
        $manifestPath = public_path('build/manifest.json');
        if (file_exists($manifestPath)) {
            $hash = substr(md5_file($manifestPath), 0, 12);
            Inertia::version($hash);
        }
    }
}
