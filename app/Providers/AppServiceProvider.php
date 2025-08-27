<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;

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

        // Ensure proper asset URL configuration
        if (config('app.env') === 'production' && env('ASSET_URL')) {
            Config::set('app.asset_url', env('ASSET_URL'));
        }

        // Add error handling for asset loading
        if (config('app.debug') === false) {
            // Disable detailed error reporting in production
            error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
        }
    }
}
