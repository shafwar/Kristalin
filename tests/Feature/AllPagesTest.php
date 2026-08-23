<?php

use Inertia\Testing\AssertableInertia as Assert;

test('home / welcome page renders successfully with Inertia', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('welcome'));
});

test('about page renders successfully', function () {
    $response = $this->get('/about');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('about'));
});

test('vision-mission page renders successfully', function () {
    $response = $this->get('/vision-mission');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('vision-mission'));
});

test('core-values page renders successfully', function () {
    $response = $this->get('/core-values');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('core-values'));
});

test('leadership-traits page renders successfully', function () {
    $response = $this->get('/leadership-traits');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('leadership-traits'));
});

test('milestones page renders successfully', function () {
    $response = $this->get('/milestones');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('milestones'));
});

test('board-of-directors page renders successfully', function () {
    $response = $this->get('/board-of-directors');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('board-of-directors'));
});

test('company-overview page renders successfully', function () {
    $response = $this->get('/company-overview');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('company-overview'));
});

test('company-profile-report page renders successfully', function () {
    $response = $this->get('/company-profile-report');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('CompanyProfileReport'));
});

test('business-activity page renders successfully', function () {
    $response = $this->get('/business-activity');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('business-activity'));
});

test('line-of-business page renders successfully', function () {
    $response = $this->get('/line-of-business');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('line-of-business'));
});

test('csr page renders successfully', function () {
    $response = $this->get('/csr');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('csr'));
});

test('investor page renders successfully', function () {
    $response = $this->get('/investor');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('investor'));
});

test('b2c page renders successfully', function () {
    $response = $this->get('/b2c');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('b2c'));
});

test('news listing page renders successfully', function () {
    $response = $this->get('/news');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('news'));
});

test('news detail pages render successfully', function () {
    $newsSlugs = [
        'feb26-1',
        'feb26-2',
        'feb26-3',
        'feb26-4',
        'mar26-1',
        'apr26-1',
        'feb-7',
    ];

    foreach ($newsSlugs as $slug) {
        $response = $this->get("/news/{$slug}");
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('NewsDetail'));
    }
});

test('contact page renders successfully', function () {
    $response = $this->get('/contact');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('contact'));
});

test('internal-feedback page renders successfully', function () {
    $response = $this->get('/internal-feedback');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('internal-feedback'));
});

test('privacy-policy page renders successfully', function () {
    $response = $this->get('/privacy-policy');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('PrivacyPolicy'));
});

test('terms of service page renders successfully', function () {
    $response = $this->get('/terms');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('TermsOfService'));
});

test('search route returns search results', function () {
    $response = $this->get('/search?q=emas');
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('search'));
});

test('language switch route updates locale and redirects', function () {
    foreach (['id', 'en', 'zh'] as $locale) {
        $response = $this->get("/language/{$locale}");
        $response->assertStatus(302);
        $response->assertSessionHas('locale', $locale);
    }
});

test('download-company-profile route serves valid PDF binary', function () {
    $response = $this->get('/download-company-profile');
    $response->assertStatus(200);
    $response->assertHeader('content-type', 'application/pdf');
    $response->assertHeader('content-disposition');
});

test('kristalin tv live gold api endpoint responds with json', function () {
    $response = $this->get('/api/kristalin-tv/gold');
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'source',
        'success',
    ]);
});

test('kristalin tv gold-prices api endpoint responds with json', function () {
    $response = $this->get('/api/kristalin-tv/gold-prices');
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'source',
        'brands',
    ]);
});
