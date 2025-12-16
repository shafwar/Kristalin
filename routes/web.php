<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Controllers\FeedbackReportController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/company-overview', function () {
    return Inertia::render('company-overview');
})->name('company-overview');

Route::get('/milestones', function () {
    return Inertia::render('milestones');
})->name('milestones');

Route::get('/vision-mission', function () {
    return Inertia::render('vision-mission');
})->name('vision-mission');

Route::get('/core-values', function () {
    return Inertia::render('core-values');
})->name('core-values');

Route::get('/leadership-traits', function () {
    return Inertia::render('leadership-traits');
})->name('leadership-traits');

Route::get('/board-of-directors', function () {
    return Inertia::render('board-of-directors');
})->name('board-of-directors');



Route::get('/line-of-business', function () {
    return Inertia::render('line-of-business');
})->name('line-of-business');

Route::get('/news', function () {
    return Inertia::render('news');
})->name('news');

Route::get('/news/{id}', function ($id) {
    return Inertia::render('NewsDetail', ['id' => $id]);
})->name('news.detail');

Route::get('/business-activity', function () {
    return Inertia::render('business-activity');
})->name('business-activity');

Route::get('/csr', function () {
    return Inertia::render('csr');
})->name('csr');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Search
Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/careers', function () {
    return Inertia::render('careers');
})->name('careers');

Route::post('/feedback', [FeedbackReportController::class, 'store']);
Route::get('/feedback/{ticket_number}', [FeedbackReportController::class, 'showByTicket']);
Route::post('/contact-message', [ContactMessageController::class, 'store']);

// Language switching routes
Route::get('/language/{locale}', [LanguageController::class, 'switch'])->name('language.switch');
Route::get('/api/translations', [LanguageController::class, 'getTranslations'])->name('translations.get');

// Health check endpoint for Railway
Route::get('/health', [HealthController::class, 'check']);

// R2 Image Proxy - Serve images from R2 if using cloud storage
// This allows React components to use /images/ path which will redirect to R2
Route::get('/images/{path}', function ($path) {
    // If using R2, redirect to R2 URL
    if (config('filesystems.default') === 's3') {
        // Try multiple possible R2 paths
        $possibleR2Paths = [
            r2_object_path($path), // Standard path after normalization
            r2_object_path("kristalin-assets/public/{$path}"), // Path in kristalin-assets/public folder
        ];
        
        // Remove leading "public/" from path for R2 lookup
        $cleanPath = preg_replace('#^public/#', '', $path);
        $possibleR2Paths[] = r2_object_path($cleanPath);
        $possibleR2Paths[] = r2_object_path("kristalin-assets/public/{$cleanPath}");
        
        // Try each possible path in R2
        foreach ($possibleR2Paths as $objectPath) {
            if (Storage::disk('s3')->exists($objectPath)) {
                $url = Storage::disk('s3')->url($objectPath);
                // If AWS_URL is not set, construct R2 public URL
                if (empty(config('filesystems.disks.s3.url'))) {
                    $endpoint = config('filesystems.disks.s3.endpoint');
                    $bucket = config('filesystems.disks.s3.bucket');
                    if (preg_match('/https:\/\/([a-f0-9]+)\.r2\.cloudflarestorage\.com/', $endpoint, $matches)) {
                        $accountId = $matches[1];
                        $url = "https://{$accountId}.r2.cloudflarestorage.com/{$bucket}/{$objectPath}";
                    }
                }
                return redirect($url, 301);
            }
        }
        
        // If not found in R2, fallback to first normalized path (let R2 return 404 if file doesn't exist)
        $objectPath = r2_object_path($path);
        $url = Storage::disk('s3')->url($objectPath);
        if (empty(config('filesystems.disks.s3.url'))) {
            $endpoint = config('filesystems.disks.s3.endpoint');
            $bucket = config('filesystems.disks.s3.bucket');
            if (preg_match('/https:\/\/([a-f0-9]+)\.r2\.cloudflarestorage\.com/', $endpoint, $matches)) {
                $accountId = $matches[1];
                $url = "https://{$accountId}.r2.cloudflarestorage.com/{$bucket}/{$objectPath}";
            }
        }
        return redirect($url, 301);
    }
    // Fallback to local file
    // Remove leading "public/" if present to avoid double public path
    $cleanPath = preg_replace('#^public/#', '', $path);
    
    // Try multiple possible locations for assets
    $possiblePaths = [
        $cleanPath, // Direct path: pt-abadi-bersama-sentosa-meresmikan-penggilingan-padi-di-boy-4ubf.jpg
        "kristalin-assets/public/{$cleanPath}", // Common asset location: kristalin-assets/public/pt-abadi-bersama-sentosa-meresmikan-penggilingan-padi-di-boy-4ubf.jpg
        $path, // Original path with public prefix
        "kristalin-assets/public/{$path}", // Original path in assets folder
    ];
    
    $filePath = null;
    foreach ($possiblePaths as $tryPath) {
        $fullPath = public_path($tryPath);
        if (file_exists($fullPath)) {
            $filePath = $fullPath;
            break;
        }
    }
    
    if (!$filePath || !file_exists($filePath)) {
        abort(404, 'Image not found: ' . $path);
    }
    
    return response()->file($filePath);
})->where('path', '.*');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Fallback for unknown routes – return Inertia 404 page
Route::fallback(function () {
    return Inertia::render('not-found')
        ->toResponse(request())
        ->setStatusCode(404);
});
