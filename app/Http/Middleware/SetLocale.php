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
        $defaultLocale = 'en';
        
        // Get locale from request (URL segment, query parameter, or session)
        $locale = null;
        
        // Check if locale is in URL path (e.g., /en/about, /id/tentang)
        $segments = $request->segments();
        if (!empty($segments) && in_array($segments[0], $supportedLocales)) {
            $locale = $segments[0];
        }
        
        // Check if locale is in query parameter (e.g., ?lang=en)
        if (!$locale && $request->has('lang') && in_array($request->get('lang'), $supportedLocales)) {
            $locale = $request->get('lang');
        }
        
        // Check session for stored locale
        if (!$locale && Session::has('locale') && in_array(Session::get('locale'), $supportedLocales)) {
            $locale = Session::get('locale');
        }
        
        // Fall back to default locale
        if (!$locale || !in_array($locale, $supportedLocales)) {
            $locale = $defaultLocale;
        }
        
        // Set the application locale
        App::setLocale($locale);
        
        // Store locale in session for future requests
        Session::put('locale', $locale);
        
        // Share locale with all views (including Inertia)
        $request->attributes->set('locale', $locale);
        
        return $next($request);
    }
}