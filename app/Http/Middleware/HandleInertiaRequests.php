<?php

namespace App\Http\Middleware;

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
     * Performance notes:
     *   - `translations` is always included — required on every page load AND
     *     on every Inertia partial navigation (language switcher depends on it).
     *     DO NOT make this lazy — it will break the multilanguage system.
     *   - `ziggy` uses a closure — only computed when actually serialized.
     *   - `Inspiring::quotes()` has been intentionally removed — it performed
     *     a disk read on every single request for a decorative quote unused in UI.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $flashSuccess = null;
        $flashError   = null;

        if ($request->hasSession()) {
            try {
                $flashSuccess = $request->session()->get('success');
                $flashError   = $request->session()->get('error');
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

            // ----------------------------------------------------------------
            // Flash messages — always included (lightweight, needed immediately)
            // ----------------------------------------------------------------
            'flash' => [
                'success' => $flashSuccess,
                'error'   => $flashError,
            ],

            // ----------------------------------------------------------------
            // App identity — always included (tiny, used by layout)
            // ----------------------------------------------------------------
            'name' => config('app.name', 'PT Kristalin Ekalestari'),

            // ----------------------------------------------------------------
            // Auth — always included (needed for auth guards on client)
            // ----------------------------------------------------------------
            'auth' => [
                'user' => $user,
            ],

            // ----------------------------------------------------------------
            // Current locale — always included (used by lang switcher)
            // ----------------------------------------------------------------
            'locale' => app()->getLocale() ?: 'en',

            // ----------------------------------------------------------------
            // Ziggy routes — closure, computed once per request only when needed
            // ----------------------------------------------------------------
            'ziggy' => fn (): array => $this->resolveZiggy($request),

            // ----------------------------------------------------------------
            // Sidebar state — always included (used by layout shell)
            // ----------------------------------------------------------------
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',

            // ----------------------------------------------------------------
            // Translations — ALWAYS INCLUDED (never lazy).
            // The multilanguage system reads this on every page load AND on
            // every Inertia partial navigation when the user switches language.
            // Making this lazy would break all text rendering across the site.
            // ----------------------------------------------------------------
            'translations' => [
                'messages' => trans('messages') ?: [],
                'pages'    => trans('pages')    ?: [],
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
                'url'      => config('app.url', 'https://kristalin.co.id'),
                'port'     => null,
                'defaults' => [],
                'routes'   => [],
                'location' => $request->url(),
            ];
        }
    }
}
