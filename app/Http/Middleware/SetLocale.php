<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Define supported locales
        $supportedLocales = ['en', 'id', 'zh'];
        $defaultLocale = config('app.locale', 'en');
        
        // Get locale from request (URL segment, query parameter, session, or cookie)
        $locale = null;
        
        // 1. Check if locale is in URL path (e.g., /en/about, /id/tentang)
        $segments = $request->segments();
        if (!empty($segments) && in_array($segments[0], $supportedLocales, true)) {
            $locale = $segments[0];
        }
        
        // 2. Check if locale is in query parameter (e.g., ?lang=id)
        if (!$locale && $request->has('lang') && in_array($request->get('lang'), $supportedLocales, true)) {
            $locale = $request->get('lang');
        }
        
        // 3. Check session for stored locale
        if (!$locale && Session::has('locale') && in_array(Session::get('locale'), $supportedLocales, true)) {
            $locale = Session::get('locale');
        }

        // 4. Check persistent cookie for stored locale
        if (!$locale && $request->hasCookie('locale') && in_array($request->cookie('locale'), $supportedLocales, true)) {
            $locale = $request->cookie('locale');
        }
        
        // 5. Fall back to application default locale ('id')
        if (!$locale || !in_array($locale, $supportedLocales, true)) {
            $locale = $defaultLocale;
        }
        
        // Set the application locale
        App::setLocale($locale);
        
        // Store locale in session for future requests
        Session::put('locale', $locale);
        
        // Only refresh cookie when the value has changed (avoids redundant Set-Cookie on every response)
        if ($request->cookie('locale') !== $locale) {
            cookie()->queue(cookie('locale', $locale, 60 * 24 * 365, '/', null, false, false));
        }
        
        // Share locale with all views (including Inertia)
        $request->attributes->set('locale', $locale);
        
        return $next($request);
    }
}