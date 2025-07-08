<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/message-from-founder', function () {
    return Inertia::render('message-from-founder');
})->name('message-from-founder');

Route::get('/line-of-business', function () {
    return Inertia::render('line-of-business');
})->name('line-of-business');

Route::get('/news', function () {
    return Inertia::render('news');
})->name('news');

Route::get('/business-activity', function () {
    return Inertia::render('business-activity');
})->name('business-activity');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
