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
     *   - `translations` uses Inertia::lazy() so it is only included on full
     *     page loads and explicit refreshes — NOT on every partial Inertia
     *     navigation or API request. This reduces payload size and server CPU
     *     on every route transition.
     *   - `ziggy` uses a closure (lazy evaluation) — only computed when needed.
     *   - `quote` is removed from shared props as it was only used decoratively
     *     and called Inspiring::quotes() (disk read) on every single request.
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
            // Ziggy routes — lazy closure, computed only when needed
            // ----------------------------------------------------------------
            'ziggy' => fn (): array => $this->resolveZiggy($request),

            // ----------------------------------------------------------------
            // Sidebar state — always included (used by layout shell)
            // ----------------------------------------------------------------
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',

            // ----------------------------------------------------------------
            // Translations — LAZY: only sent on full page load, not on every
            // partial Inertia navigation request. Saves ~15-30KB per transition.
            // ----------------------------------------------------------------
            'translations' => \Inertia\Inertia::lazy(function () {
                return [
                    'messages' => trans('messages') ?: [],
                    'pages'    => trans('pages')    ?: [],
                ];
            }),
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
