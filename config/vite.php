<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Vite Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure the Vite settings for your Laravel application.
    | This configuration is used by the Laravel Vite plugin to determine
    | where to find the manifest file and how to handle asset loading.
    |
    */

    'manifest' => public_path('build/.vite/manifest.json'),
    'build_path' => 'build',
    'dev_server_url' => env('VITE_DEV_SERVER_URL', 'http://localhost:5173'),
];
