<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FeedbackReportController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\PageContentController;
use App\Http\Controllers\Admin\ImageUploadController;

/**
|--------------------------------------------------------------------------
| Web Routes - Public Pages
|--------------------------------------------------------------------------
| Routes untuk halaman publik website PT Kristalin Eka Lestari
| Semua halaman menggunakan Inertia.js untuk rendering
*/

// Home/Welcome Page
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Company Information Pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/company-overview', function () {
    return Inertia::render('CompanyOverview');
})->name('company-overview');

Route::get('/milestones', function () {
    return Inertia::render('Milestones');
})->name('milestones');

// Vision & Values Pages
Route::get('/vision-mission', function () {
    return Inertia::render('VisionMission');
})->name('vision-mission');

Route::get('/core-values', function () {
    return Inertia::render('CoreValues');
})->name('core-values');

Route::get('/leadership-traits', function () {
    return Inertia::render('LeadershipTraits');
})->name('leadership-traits');

Route::get('/message-from-founder', function () {
    return Inertia::render('MessageFromFounder');
})->name('message-from-founder');

// Business Pages
Route::get('/line-of-business', function () {
    return Inertia::render('LineOfBusiness');
})->name('line-of-business');

Route::get('/business-activity', function () {
    return Inertia::render('BusinessActivity');
})->name('business-activity');

// News & CSR Pages
Route::get('/news', function () {
    return Inertia::render('News');
})->name('news');

Route::get('/csr', function () {
    return Inertia::render('Csr');
})->name('csr');

// Contact Page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

/**
|--------------------------------------------------------------------------
| Feedback System Routes
|--------------------------------------------------------------------------
| Public routes untuk sistem feedback/laporan
| Tidak memerlukan authentication
*/

Route::post('/feedback', [FeedbackReportController::class, 'store'])
    ->name('feedback.store');

Route::get('/feedback/{ticket_number}', [FeedbackReportController::class, 'showByTicket'])
    ->name('feedback.show');

/**
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
| Routes yang memerlukan authentication tapi bukan admin
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User profile routes
    Route::get('/profile', function () {
        return Inertia::render('Profile/Show');
    })->name('profile.show');

    Route::get('/profile/edit', function () {
        return Inertia::render('Profile/Edit');
    })->name('profile.edit');
});

/**
|--------------------------------------------------------------------------
| Admin Routes - Protected Area
|--------------------------------------------------------------------------
| Semua routes admin dilindungi dengan AdminMiddleware
| Base URL: /admin
*/

Route::middleware(['auth', \App\Http\Middleware\AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Redirect /admin ke dashboard
        Route::redirect('/', '/admin/dashboard');

        // Admin Dashboard
        Route::get('/dashboard', [AdminController::class, 'dashboard'])
            ->name('dashboard');

        /**
         * Page Content Management Routes
         * Untuk mengelola konten semua halaman website
         */
        Route::prefix('pages')->name('pages.')->group(function () {
            // Pages overview/index
            Route::get('/', [PageContentController::class, 'index'])
                ->name('index');

            // Edit specific page
            Route::get('/{page}', [PageContentController::class, 'show'])
                ->name('show')
                ->where('page', '[a-z0-9\-]+');

            // Update page content
            Route::put('/{page}', [PageContentController::class, 'update'])
                ->name('update')
                ->where('page', '[a-z0-9\-]+');

            // Alternative PATCH method for updates
            Route::patch('/{page}', [PageContentController::class, 'update'])
                ->name('patch')
                ->where('page', '[a-z0-9\-]+');
        });

        /**
         * Image Upload Management Routes
         * Untuk mengelola upload dan penyimpanan gambar
         */
        Route::prefix('images')->name('image.')->group(function () {
            // List all images for a specific page
            Route::get('/list', [ImageUploadController::class, 'index'])
                ->name('list');

            // Show/serve image file
            Route::get('/{filename}', [ImageUploadController::class, 'show'])
                ->name('show')
                ->where('filename', '[a-zA-Z0-9\-_\.]+');

            // Delete image and thumbnail
            Route::delete('/{filename}', [ImageUploadController::class, 'destroy'])
                ->name('destroy')
                ->where('filename', '[a-zA-Z0-9\-_\.]+');
        });

        // Upload image route (separate from images prefix for cleaner URL)
        Route::post('/upload/image', [ImageUploadController::class, 'upload'])
            ->name('image.upload');

        /**
         * Bulk Operations Routes
         * Untuk operasi bulk pada content dan images
         */
        Route::prefix('bulk')->name('bulk.')->group(function () {
            // Bulk delete images
            Route::post('/images/delete', [ImageUploadController::class, 'bulkDelete'])
                ->name('images.delete');

            // Content export/import
            Route::post('/content/export', [PageContentController::class, 'export'])
                ->name('content.export');

            Route::post('/content/import', [PageContentController::class, 'import'])
                ->name('content.import');
        });

        /**
         * Admin Settings Routes
         * Untuk pengaturan sistem admin
         */
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Admin/Settings/Index');
            })->name('index');

            Route::get('/general', function () {
                return Inertia::render('Admin/Settings/General');
            })->name('general');

            Route::get('/users', function () {
                return Inertia::render('Admin/Settings/Users');
            })->name('users');

            Route::get('/security', function () {
                return Inertia::render('Admin/Settings/Security');
            })->name('security');

            // Save settings
            Route::post('/general', function () {
                // Handle general settings save
                return redirect()->back()->with('success', 'Settings updated successfully!');
            })->name('general.store');
        });

        /**
         * Admin Utilities Routes
         * Helper routes untuk admin functionality
         */
        Route::prefix('utils')->name('utils.')->group(function () {
            // Clear application cache
            Route::post('/cache/clear', function () {
                try {
                    \Artisan::call('cache:clear');
                    \Artisan::call('config:clear');
                    \Artisan::call('view:clear');
                    \Artisan::call('route:clear');

                    return response()->json([
                        'success' => true,
                        'message' => 'All caches cleared successfully',
                        'timestamp' => now()->toISOString()
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to clear cache: ' . $e->getMessage()
                    ], 500);
                }
            })->name('cache.clear');

            // Optimize application
            Route::post('/optimize', function () {
                try {
                    \Artisan::call('config:cache');
                    \Artisan::call('route:cache');
                    \Artisan::call('view:cache');

                    return response()->json([
                        'success' => true,
                        'message' => 'Application optimized successfully'
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Optimization failed: ' . $e->getMessage()
                    ], 500);
                }
            })->name('optimize');

            // System information
            Route::get('/system-info', function () {
                $diskSpace = disk_free_space('/');
                $totalDiskSpace = disk_total_space('/');

                return response()->json([
                    'php_version' => PHP_VERSION,
                    'laravel_version' => app()->version(),
                    'environment' => app()->environment(),
                    'debug_mode' => config('app.debug'),
                    'timezone' => config('app.timezone'),
                    'storage_writable' => is_writable(storage_path()),
                    'cache_writable' => is_writable(storage_path('framework/cache')),
                    'disk_free_space' => $diskSpace ? round($diskSpace / 1024 / 1024 / 1024, 2) . ' GB' : 'Unknown',
                    'disk_total_space' => $totalDiskSpace ? round($totalDiskSpace / 1024 / 1024 / 1024, 2) . ' GB' : 'Unknown',
                    'memory_limit' => ini_get('memory_limit'),
                    'max_execution_time' => ini_get('max_execution_time'),
                    'max_upload_size' => ini_get('upload_max_filesize'),
                    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
                    'timestamp' => now()->toISOString()
                ]);
            })->name('system.info');

            // Generate Ziggy routes
            Route::post('/generate-routes', function () {
                try {
                    \Artisan::call('ziggy:generate');
                    return response()->json([
                        'success' => true,
                        'message' => 'Frontend routes generated successfully'
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to generate routes: ' . $e->getMessage()
                    ], 500);
                }
            })->name('generate.routes');
        });

        /**
         * Content Analytics Routes (Future Enhancement)
         */
        Route::prefix('analytics')->name('analytics.')->group(function () {
            Route::get('/overview', function () {
                return Inertia::render('Admin/Analytics/Overview');
            })->name('overview');

            Route::get('/pages', function () {
                return Inertia::render('Admin/Analytics/Pages');
            })->name('pages');

            Route::get('/images', function () {
                return Inertia::render('Admin/Analytics/Images');
            })->name('images');
        });
    });

/**
|--------------------------------------------------------------------------
| API Routes (Public & Internal)
|--------------------------------------------------------------------------
| Routes untuk API endpoints
*/

Route::prefix('api/v1')->name('api.')->group(function () {
    // Public API endpoints (tidak perlu auth)
    Route::get('/pages/{page}/content', [PageContentController::class, 'apiShow'])
        ->name('pages.content')
        ->where('page', '[a-z0-9\-]+');

    Route::get('/images/{filename}', [ImageUploadController::class, 'apiShow'])
        ->name('images.show')
        ->where('filename', '[a-zA-Z0-9\-_\.]+');

    // Health check endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'version' => '1.0.0',
            'environment' => app()->environment()
        ]);
    })->name('health');
});

/**
|--------------------------------------------------------------------------
| Development/Testing Routes
|--------------------------------------------------------------------------
| Routes khusus untuk development dan testing
| HAPUS PADA PRODUCTION!
*/

if (app()->environment(['local', 'testing', 'staging'])) {
    // Test Intervention Image v3.11
    Route::get('/test/intervention-v3', function () {
        try {
            $manager = new \Intervention\Image\ImageManager(
                new \Intervention\Image\Drivers\Gd\Driver()
            );

            // Test basic functionality
            $testImage = $manager->create(100, 100);

            return response()->json([
                'success' => true,
                'version' => '3.11',
                'driver' => 'GD',
                'message' => 'Intervention Image v3.11 working perfectly!',
                'test_image_created' => true,
                'timestamp' => now()->toISOString()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : 'Trace hidden'
            ], 500);
        }
    })->name('test.intervention');

    // Test upload functionality
    Route::post('/test/upload', function (\Illuminate\Http\Request $request) {
        try {
            $file = $request->file('image');
            if (!$file) {
                return response()->json(['error' => 'No file uploaded'], 400);
            }

            $path = $file->store('test-uploads');

            return response()->json([
                'success' => true,
                'path' => $path,
                'url' => \Storage::url($path),
                'size' => $file->getSize(),
                'type' => $file->getMimeType(),
                'original_name' => $file->getClientOriginalName(),
                'timestamp' => now()->toISOString()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : 'Trace hidden'
            ], 500);
        }
    })->name('test.upload');

    // Test route helper
    Route::get('/test/routes', function () {
        try {
            return response()->json([
                'ziggy_available' => function_exists('route'),
                'sample_routes' => [
                    'admin_dashboard' => route('admin.dashboard'),
                    'admin_pages' => route('admin.pages.index'),
                    'admin_page_edit' => route('admin.pages.show', 'about'),
                    'image_upload' => route('admin.image.upload'),
                ],
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    })->name('test.routes');

    // Debug all routes
    Route::get('/debug/routes', function () {
        $routes = collect(\Route::getRoutes())->map(function ($route) {
            return [
                'method' => implode('|', $route->methods()),
                'uri' => $route->uri(),
                'name' => $route->getName(),
                'action' => $route->getActionName(),
                'middleware' => $route->gatherMiddleware(),
            ];
        })->sortBy('uri');

        return response()->json([
            'total_routes' => $routes->count(),
            'routes' => $routes->values()
        ]);
    })->name('debug.routes');

    // Test database connection
    Route::get('/test/database', function () {
        try {
            \DB::connection()->getPdo();
            $pageCount = \App\Models\PageContent::count();

            return response()->json([
                'success' => true,
                'database_connected' => true,
                'page_content_count' => $pageCount,
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'database_connected' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    })->name('test.database');
}

/**
|--------------------------------------------------------------------------
| Include Additional Route Files
|--------------------------------------------------------------------------
| Load additional route files
*/

// Include auth routes (login, register, etc.)
require __DIR__.'/auth.php';

// Include settings routes if exists
if (file_exists(__DIR__.'/settings.php')) {
    require __DIR__.'/settings.php';
}

/**
|--------------------------------------------------------------------------
| Fallback Routes
|--------------------------------------------------------------------------
| Handle 404 errors untuk unknown routes
*/

// Specific fallback for admin area
Route::fallback(function () {
    if (request()->is('admin/*')) {
        return Inertia::render('admin/errors/404');
    }

    return Inertia::render('errors/404');
})->name('fallback');
