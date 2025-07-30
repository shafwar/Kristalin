<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    public function check(): JsonResponse
    {
        try {
            // Test database connection
            DB::connection()->getPdo();

            return response()->json([
                'status' => 'healthy',
                'timestamp' => now()->toISOString(),
                'database' => 'connected',
                'environment' => config('app.env'),
                'version' => '1.0.0'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'unhealthy',
                'timestamp' => now()->toISOString(),
                'database' => 'disconnected',
                'error' => $e->getMessage(),
                'environment' => config('app.env')
            ], 500);
        }
    }
}
