<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!auth()->check()) {
            // Store intended URL untuk redirect setelah login
            session(['url.intended' => $request->url()]);

            return redirect()->route('login')->with('message', 'Please login to access admin panel.');
        }

        // Get current authenticated user
        $user = auth()->user();

        // Check if user model has role attribute
        if (!$user || !isset($user->role)) {
            // Log error untuk debugging
            \Log::error('AdminMiddleware: User role column missing', [
                'user_id' => $user?->id,
                'user_email' => $user?->email
            ]);

            abort(500, 'User role not configured. Please contact system administrator.');
        }

        // Check if user has admin role
        if ($user->role !== 'admin') {
            // Log unauthorized access attempt
            \Log::warning('AdminMiddleware: Unauthorized admin access attempt', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'user_role' => $user->role,
                'requested_url' => $request->url(),
                'ip_address' => $request->ip()
            ]);

            // Return 403 Forbidden dengan custom message
            abort(403, 'Access Denied. Admin privileges required to access this area.');
        }

        // Log successful admin access untuk security audit
        \Log::info('AdminMiddleware: Admin access granted', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'accessed_url' => $request->url(),
            'ip_address' => $request->ip()
        ]);

        return $next($request);
    }
}
