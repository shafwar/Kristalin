<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class LanguageController extends Controller
{
    /**
     * Switch the application language
     */
    public function switch(Request $request, $locale)
    {
        // Define supported locales
        $supportedLocales = ['en', 'id', 'zh'];
        
        // Validate the locale
        if (!in_array($locale, $supportedLocales)) {
            return redirect()->back()->with('error', 'Unsupported language');
        }
        
        // Store the locale in session and set persistent 1-year cookie
        Session::put('locale', $locale);
        
        // Get the current URL and redirect back
        $url = $request->header('referer', '/');
        
        return redirect($url)
            ->withCookie(cookie('locale', $locale, 60 * 24 * 365, '/', null, false, false))
            ->with('success', 'Language changed successfully');
    }
    
    /**
     * Get available translations for the frontend
     */
    public function getTranslations(Request $request)
    {
        $locale = app()->getLocale();
        
        // Load translations
        $translations = [
            'messages' => trans('messages', [], $locale),
        ];
        
        return response()->json([
            'locale' => $locale,
            'translations' => $translations,
        ]);
    }
}