<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Throwable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        try {
            $quoteStr = (string) Inspiring::quotes()->random();
            $parts = explode('-', $quoteStr, 2);
            $message = trim($parts[0] ?? 'PT Kristalin Ekalestari');
            $author = trim($parts[1] ?? 'Corporate');
        } catch (Throwable) {
            $message = 'PT Kristalin Ekalestari';
            $author = 'Corporate';
        }

        $flashSuccess = null;
        $flashError = null;
        if ($request->hasSession()) {
            try {
                $flashSuccess = $request->session()->get('success');
                $flashError = $request->session()->get('error');
            } catch (Throwable) {
                // Ignore session retrieval issues gracefully
            }
        }

        $user = null;
        try {
            $user = $request->user();
        } catch (Throwable) {
            $user = null;
        }

        return [
            ...parent::share($request),
            'flash' => [
                'success' => $flashSuccess,
                'error' => $flashError,
            ],
            'name' => config('app.name', 'PT Kristalin Ekalestari'),
            'quote' => ['message' => $message, 'author' => $author],
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => fn (): array => $this->resolveZiggy($request),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale' => app()->getLocale() ?: 'en',
            'translations' => [
                'messages' => trans('messages') ?: [],
                'pages' => trans('pages') ?: [],
            ],
        ];
    }

    /**
     * Safely resolve Ziggy routes array.
     */
    protected function resolveZiggy(Request $request): array
    {
        try {
            return [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ];
        } catch (Throwable) {
            return [
                'url' => config('app.url', 'https://kristalin.co.id'),
                'port' => null,
                'defaults' => [],
                'routes' => [],
                'location' => $request->url(),
            ];
        }
    }
}
