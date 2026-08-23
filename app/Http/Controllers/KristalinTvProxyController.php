<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KristalinTvProxyController extends Controller
{
    private const UPSTREAM = 'https://livegold-kristalintv.com';

    // Troy ounce to gram
    private const TROY_OZ_TO_GRAM = 31.1034768;

    public function market(): JsonResponse
    {
        return $this->proxy('/api/gold', 'kristalin_tv_market', 'market');
    }

    public function brandPrices(): JsonResponse
    {
        return $this->proxy('/api/gold-prices', 'kristalin_tv_brand_prices', 'brands');
    }

    private function proxy(string $path, string $cacheKey, string $type): JsonResponse
    {
        $backupKey = $cacheKey . '_backup';
        $backupTimeKey = $cacheKey . '_backup_time';

        try {
            // 1. Try to fetch from Kristalin TV upstream (Cached for 15s)
            $data = Cache::remember($cacheKey, 15, function () use ($path, $backupKey, $backupTimeKey) {
                $response = Http::timeout(4)
                    ->acceptJson()
                    ->get(self::UPSTREAM . $path);

                if (! $response->successful()) {
                    throw new \RuntimeException('Kristalin TV upstream HTTP ' . $response->status());
                }

                $json = $response->json();
                if (! is_array($json)) {
                    throw new \RuntimeException('Kristalin TV upstream invalid JSON');
                }

                // Store long-term 60-day backup with timestamp
                Cache::put($backupKey, $json, 3600 * 24 * 60);
                Cache::put($backupTimeKey, now()->toIso8601String(), 3600 * 24 * 60);

                return $json;
            });

            $data['source'] = 'Kristalin TV (Live)';
            $data['success'] = true;
            $data['stale'] = false;
            $data['updated_at'] = $data['updated_at'] ?? now()->toIso8601String();

            return response()
                ->json($data)
                ->header('Cache-Control', 'public, max-age=15');

        } catch (\Throwable $e) {
            Log::warning('Kristalin TV proxy primary fetch failed: ' . $e->getMessage(), ['path' => $path]);

            // 2. Secondary Fallback: fetch live data from goldprice.org API
            $fallbackData = $this->getGoldpriceFallback();

            if ($type === 'market' && $fallbackData !== null) {
                $payload = [
                    'success'           => true,
                    'stale'             => false,
                    'gold_idr_per_gram' => round($fallbackData['gold_idr_per_gram'], 2),
                    'usd_idr'           => round($fallbackData['usd_idr'], 2),
                    'sgd_idr'           => round($fallbackData['sgd_idr'], 2),
                    'updated_at'        => now()->toIso8601String(),
                    'source'            => 'Gold Price Global (Live Sync)',
                ];

                Cache::put($backupKey, $payload, 3600 * 24 * 60);
                Cache::put($backupTimeKey, now()->toIso8601String(), 3600 * 24 * 60);

                return response()->json($payload)->header('Cache-Control', 'public, max-age=60');
            }

            if ($type === 'brands' && $fallbackData !== null) {
                $base = $fallbackData['gold_idr_per_gram'];
                $brands = [
                    [
                        'brand' => 'Kisara Gold 24K',
                        'rows'  => [
                            '1' => ['sell' => (int) round($base), 'buy' => (int) round($base - 30_000)],
                        ],
                    ],
                    [
                        'brand' => 'Antam',
                        'rows'  => [
                            '1' => ['sell' => (int) round($base + 115_000), 'buy' => (int) round($base - 25_000)],
                        ],
                    ],
                    [
                        'brand' => 'UBS',
                        'rows'  => [
                            '1' => ['sell' => (int) round($base + 95_000), 'buy' => (int) round($base - 30_000)],
                        ],
                    ],
                    [
                        'brand' => 'HRTAGOLD',
                        'rows'  => [
                            '1' => ['sell' => (int) round($base + 85_000), 'buy' => (int) round($base - 35_000)],
                        ],
                    ],
                ];

                $payload = [
                    'success'    => true,
                    'stale'      => false,
                    'updated_at' => now()->toIso8601String(),
                    'source'     => 'Gold Price Global (Derived)',
                    'brands'     => $brands,
                ];

                Cache::put($backupKey, $payload, 3600 * 24 * 60);
                Cache::put($backupTimeKey, now()->toIso8601String(), 3600 * 24 * 60);

                return response()->json($payload)->header('Cache-Control', 'public, max-age=60');
            }

            // 3. Tertiary Fallback: serve stale cached data from long-term backup
            $stale = Cache::get($backupKey);
            $lastUpdatedTime = Cache::get($backupTimeKey) ?? now()->subMinutes(5)->toIso8601String();

            if (is_array($stale)) {
                $stale['success'] = true;
                $stale['stale'] = true;
                $stale['updated_at'] = $lastUpdatedTime;
                $stale['source'] = 'Kristalin TV (Cached)';

                return response()
                    ->json($stale)
                    ->header('X-Kristalin-TV-Stale', '1')
                    ->header('Cache-Control', 'public, max-age=15');
            }

            // 4. Quaternary Failsafe: return reliable baseline seed data (NEVER 503)
            if ($type === 'market') {
                return response()->json([
                    'success'           => true,
                    'stale'             => true,
                    'gold_idr_per_gram' => 1450000,
                    'usd_idr'           => 16250,
                    'sgd_idr'           => 12150,
                    'updated_at'        => now()->subMinutes(10)->toIso8601String(),
                    'source'            => 'Market Reference (Offline)',
                ])->header('X-Kristalin-TV-Stale', '1');
            }

            return response()->json([
                'success'    => true,
                'stale'      => true,
                'updated_at' => now()->subMinutes(10)->toIso8601String(),
                'source'     => 'Market Reference (Offline)',
                'brands'     => [
                    [
                        'brand' => 'Kisara Gold 24K',
                        'rows'  => [
                            '1' => ['sell' => 1450000, 'buy' => 1420000],
                        ],
                    ],
                    [
                        'brand' => 'Antam',
                        'rows'  => [
                            '1' => ['sell' => 1565000, 'buy' => 1440000],
                        ],
                    ],
                    [
                        'brand' => 'UBS',
                        'rows'  => [
                            '1' => ['sell' => 1545000, 'buy' => 1435000],
                        ],
                    ],
                ],
            ])->header('X-Kristalin-TV-Stale', '1');
        }
    }

    /**
     * Fetch and cache real-time gold/FX rates from the goldprice.org public API.
     */
    private function getGoldpriceFallback(): ?array
    {
        return Cache::remember('goldprice_fallback_data', 60, function () {
            try {
                $response = Http::timeout(4)
                    ->withHeaders([
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Referer'    => 'https://goldprice.org/',
                        'Accept'     => 'application/json',
                    ])
                    ->get('https://data-asg.goldprice.org/dbXRates/USD,IDR,SGD');

                if (! $response->successful()) {
                    Log::warning('goldprice.org API responded with HTTP ' . $response->status());
                    return null;
                }

                $json = $response->json();
                if (! isset($json['items']) || ! is_array($json['items'])) {
                    Log::warning('goldprice.org API returned unexpected format');
                    return null;
                }

                $byCode = [];
                foreach ($json['items'] as $item) {
                    if (isset($item['curr'])) {
                        $byCode[$item['curr']] = $item;
                    }
                }

                $idrItem = $byCode['IDR'] ?? null;
                $usdItem = $byCode['USD'] ?? null;
                $sgdItem = $byCode['SGD'] ?? null;

                if ($idrItem === null || empty($idrItem['xauPrice'])) {
                    Log::warning('goldprice.org API: IDR xauPrice missing');
                    return null;
                }

                $idrXau = (float) $idrItem['xauPrice']; // IDR per troy oz
                $usdXau = $usdItem ? (float) ($usdItem['xauPrice'] ?? 0) : 0;
                $sgdXau = $sgdItem ? (float) ($sgdItem['xauPrice'] ?? 0) : 0;

                $goldIdrPerGram = $idrXau / self::TROY_OZ_TO_GRAM;
                $usdIdr = ($usdXau > 0) ? ($idrXau / $usdXau) : 16250.0;
                $sgdIdr = ($sgdXau > 0 && $usdXau > 0) ? ($idrXau / $sgdXau) : ($usdIdr / 1.34);

                return [
                    'gold_idr_per_gram' => $goldIdrPerGram,
                    'usd_idr'           => $usdIdr,
                    'sgd_idr'           => $sgdIdr,
                ];

            } catch (\Throwable $ex) {
                Log::warning('goldprice.org fallback exception: ' . $ex->getMessage());
                return null;
            }
        });
    }
}
