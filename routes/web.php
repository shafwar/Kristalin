<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Controllers\FeedbackReportController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\InternalReportController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\KristalinTvProxyController;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    if (request()->has('p') || request()->has('page_id') || request()->has('post_type')) {
        return redirect('/', 301);
    }
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

Route::get('/investor', function () {
    return Inertia::render('investor');
})->name('investor');

Route::get('/company-profile-report', function () {
    return Inertia::render('CompanyProfileReport');
})->name('company-profile-report');

Route::get('/company-profile', function () {
    return Inertia::render('CompanyProfileReport');
})->name('company-profile');

Route::get('/download-company-profile', function () {
    $pdfPath = public_path('Company-Profile-PT-Kristalin-Ekalestari.pdf');
    if (! file_exists($pdfPath)) {
        $pdfPath = public_path('Company Profile _ PT Kristalin Ekalestari.pdf');
    }
    if (! file_exists($pdfPath)) {
        $pdfPath = base_path('Company Profile _ PT Kristalin Ekalestari.pdf');
    }
    if (file_exists($pdfPath)) {
        $filename = 'Company-Profile-PT-Kristalin-Ekalestari.pdf';
        return response()->download($pdfPath, $filename, [
            'Content-Type' => 'application/pdf',
            'Content-Description' => 'File Transfer',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Content-Transfer-Encoding' => 'binary',
            'Accept-Ranges' => 'bytes',
            'Expires' => '0',
            'Cache-Control' => 'private, must-revalidate, post-check=0, pre-check=0',
            'Pragma' => 'public',
            'Content-Length' => (string) filesize($pdfPath),
        ]);
    }
    return redirect('/Company-Profile-PT-Kristalin-Ekalestari.pdf');
})->name('download-company-profile');

Route::get('/line-of-business', function () {
    return Inertia::render('line-of-business');
})->name('line-of-business');

Route::get('/b2c', function () {
    return Inertia::render('b2c');
})->name('b2c');

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

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('terms');

// Search
Route::get('/api/kristalin-tv/gold', [KristalinTvProxyController::class, 'market']);
Route::get('/api/kristalin-tv/gold-prices', [KristalinTvProxyController::class, 'brandPrices']);

Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/careers', function () {
    return Inertia::render('careers');
})->name('careers');

Route::post('/feedback', [FeedbackReportController::class, 'store']);
Route::get('/feedback/{ticket_number}', [FeedbackReportController::class, 'showByTicket']);
Route::post('/contact-message', [ContactMessageController::class, 'store']);

// Internal Feedback (Whistle Blower) – email via Resend only; no admin panel
Route::get('/internal-feedback', [InternalReportController::class, 'showForm'])->name('internal-feedback');
Route::post('/internal-feedback', [InternalReportController::class, 'store'])->name('internal-feedback.store');
Route::get('/internal-feedback/attachments/{token}', [InternalReportController::class, 'downloadAttachment'])
    ->middleware('throttle:60,1')
    ->name('internal-feedback.attachment');

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
        $possibleR2Paths[] = r2_object_path("kristalin-assets/public/{$cleanPath}"); // IMPORTANT: This is where December images are stored
        
        // Also try direct paths without r2_object_path (in case file was uploaded with full path)
        // This handles cases where r2_object_path strips prefixes but file exists with full path
        $possibleR2Paths[] = "kristalin-assets/public/{$cleanPath}"; // Direct path without normalization
        $possibleR2Paths[] = $cleanPath; // Direct clean path
        
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
        
        // If not found in R2, fallback to most likely path (kristalin-assets/public/ first, then clean path)
        // This ensures December images and other assets in kristalin-assets/public/ are found
        $fallbackPaths = [
            r2_object_path("kristalin-assets/public/{$cleanPath}"), // Most likely for December images
            r2_object_path($cleanPath), // Standard path
        ];
        
        foreach ($fallbackPaths as $objectPath) {
            try {
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
            } catch (\Exception $e) {
                // Try next fallback path
                continue;
            }
        }
        
        // Last resort: use first fallback path
        $objectPath = r2_object_path("kristalin-assets/public/{$cleanPath}");
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

// Direct Static Build Asset Handler (Fail-safe for PHP built-in server in cloud containers)
Route::get('/build/{path}', function ($path) {
    $fullPath = public_path("build/{$path}");
    if (file_exists($fullPath) && is_file($fullPath)) {
        $ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
        $mime = match ($ext) {
            'js', 'mjs' => 'application/javascript; charset=utf-8',
            'css' => 'text/css; charset=utf-8',
            'json' => 'application/json; charset=utf-8',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'jpg', 'jpeg' => 'image/jpeg',
            'webp' => 'image/webp',
            'avif' => 'image/avif',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            default => mime_content_type($fullPath) ?: 'application/octet-stream',
        };
        return response()->file($fullPath, [
            'Content-Type' => $mime,
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
    abort(404, 'Asset not found: ' . $path);
})->where('path', '.*');


// Common Aliases & Legacy Indonesian/English Route Redirects (301 Permanent)
Route::redirect('/about-us', '/about', 301);
Route::redirect('/about-kristalin', '/about', 301);
Route::redirect('/tentang-kami', '/about', 301);
Route::redirect('/profile', '/company-overview', 301);
Route::redirect('/tentang-perusahaan', '/company-overview', 301);
Route::redirect('/contact-us', '/contact', 301);
Route::redirect('/hubungi-kami', '/contact', 301);
Route::redirect('/kontak', '/contact', 301);
Route::redirect('/berita', '/news', 301);
Route::redirect('/artikel', '/news', 301);
Route::redirect('/blog', '/news', 301);
Route::redirect('/karir', '/careers', 301);
Route::redirect('/career', '/careers', 301);
Route::redirect('/business-activities', '/business-activity', 301);
Route::redirect('/kegiatan-usaha', '/business-activity', 301);
Route::redirect('/lini-bisnis', '/line-of-business', 301);
Route::redirect('/modi', '/company-profile-report', 301);
Route::redirect('/company-profile', '/company-profile-report', 301);
Route::redirect('/csr-kristalin', '/csr', 301);
Route::redirect('/tanggung-jawab-sosial', '/csr', 301);
Route::redirect('/investor-relations', '/investor', 301);
Route::redirect('/kebijakan-privasi', '/privacy-policy', 301);
Route::redirect('/syarat-ketentuan', '/terms', 301);

// Purge / Intercept Legacy WordPress URLs (Redirecting 301 to purge old search index)
Route::any('/wp-login.php', fn() => redirect('/', 301));
Route::any('/xmlrpc.php', fn() => redirect('/', 301));
Route::any('/hello-world', fn() => redirect('/news', 301));
Route::any('/hello-world/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/welcome-to-wordpress', fn() => redirect('/news', 301));
Route::any('/welcome-to-wordpress/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/2019/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/2020/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/2021/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/wp-admin/{any?}', fn() => redirect('/', 301))->where('any', '.*');
Route::any('/wp-includes/{any?}', fn() => redirect('/', 301))->where('any', '.*');
Route::any('/wp-content/{any?}', fn() => redirect('/', 301))->where('any', '.*');
Route::any('/wp-json/{any?}', fn() => redirect('/', 301))->where('any', '.*');
Route::any('/feed/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/rss', fn() => redirect('/news', 301));
Route::any('/category/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/tag/{any?}', fn() => redirect('/news', 301))->where('any', '.*');
Route::any('/author/{any?}', fn() => redirect('/about', 301))->where('any', '.*');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Fallback for unknown routes – return Inertia 404 page
Route::fallback(function () {
    return Inertia::render('not-found')
        ->toResponse(request())
        ->setStatusCode(404);
});
