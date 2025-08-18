<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;

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

        // Custom Vite asset URL handling for production
        if (config('app.env') === 'production') {
            Vite::useHotFile('build/hot')
                ->useBuildDirectory('build')
                ->withEntryPoints(['resources/css/app.css', 'resources/js/app.tsx']);
        }
    }
}
