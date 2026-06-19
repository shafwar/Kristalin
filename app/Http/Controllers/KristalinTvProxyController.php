<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KristalinTvProxyController extends Controller
{
    private const UPSTREAM = 'https://livegold-kristalintv.com';

    public function market(): JsonResponse
    {
        return $this->proxy('/api/gold', 'kristalin_tv_market');
    }

    public function brandPrices(): JsonResponse
    {
        return $this->proxy('/api/gold-prices', 'kristalin_tv_brand_prices');
    }

    private function proxy(string $path, string $cacheKey): JsonResponse
    {
        $backupKey = $cacheKey . '_backup';

        try {
            $data = Cache::remember($cacheKey, 15, function () use ($path, $backupKey) {
                $response = Http::timeout(10)
                    ->acceptJson()
                    ->get(self::UPSTREAM . $path);

                if (! $response->successful()) {
                    throw new \RuntimeException('Kristalin TV upstream HTTP ' . $response->status());
                }

                $json = $response->json();
                if (! is_array($json)) {
                    throw new \RuntimeException('Kristalin TV upstream invalid JSON');
                }

                Cache::put($backupKey, $json, 3600);

                return $json;
            });

            return response()
                ->json($data)
                ->header('Cache-Control', 'public, max-age=15');
        } catch (\Throwable $e) {
            Log::warning('Kristalin TV proxy failed: ' . $e->getMessage(), ['path' => $path]);

            $stale = Cache::get($backupKey);
            if (is_array($stale)) {
                return response()
                    ->json($stale)
                    ->header('Cache-Control', 'public, max-age=15')
                    ->header('X-Kristalin-TV-Stale', '1');
            }

            return response()->json([
                'success' => false,
                'message' => 'Kristalin TV data temporarily unavailable',
            ], 503);
        }
    }
}
