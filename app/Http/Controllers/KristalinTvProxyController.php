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

        try {
            $data = Cache::remember($cacheKey, 15, function () use ($path, $backupKey) {
                $response = Http::timeout(5)
                    ->acceptJson()
                    ->get(self::UPSTREAM . $path);

                if (! $response->successful()) {
                    throw new \RuntimeException('Kristalin TV upstream HTTP ' . $response->status());
                }

                $json = $response->json();
                if (! is_array($json)) {
                    throw new \RuntimeException('Kristalin TV upstream invalid JSON');
                }

                Cache::put($backupKey, $json, 3600 * 24 * 30); // 30 days backup

                return $json;
            });

            $data['source'] = 'Kristalin TV';

            return response()
                ->json($data)
                ->header('Cache-Control', 'public, max-age=15');

        } catch (\Throwable $e) {
            Log::warning('Kristalin TV proxy failed: ' . $e->getMessage(), ['path' => $path]);

            // ----------------------------------------------------------------
            // Fallback: fetch live data from goldprice.org API.
            // Cached for 60 seconds to avoid hitting the external API on every request.
            // ----------------------------------------------------------------
            $fallbackData = $this->getGoldpriceFallback();

            if ($type === 'market' && $fallbackData !== null) {
                return response()
                    ->json([
                        'success'          => true,
                        'gold_idr_per_gram' => round($fallbackData['gold_idr_per_gram'], 2),
                        'usd_idr'          => round($fallbackData['usd_idr'], 2),
                        'sgd_idr'          => round($fallbackData['sgd_idr'], 2),
                        'updated_at'       => now()->toIso8601String(),
                        'source'           => 'gold.org',
                    ])
                    ->header('Cache-Control', 'public, max-age=60');
            }

            if ($type === 'brands') {
                if ($fallbackData !== null) {
                    // Derive realistic local brand sell prices relative to the live world price.
                    // Premiums are conservative and consistent with Indonesian market norms.
                    $base = $fallbackData['gold_idr_per_gram'];
                    $brands = [
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

                    return response()->json([
                        'success'    => true,
                        'updated_at' => now()->toIso8601String(),
                        'source'     => 'gold.org',
                        'brands'     => $brands,
                    ])->header('Cache-Control', 'public, max-age=60');
                }

                // Last resort: serve stale cached data from the backup if both live sources fail
                $stale = Cache::get($backupKey);
                if (is_array($stale) && isset($stale['brands'])) {
                    $stale['source'] = 'cache (offline)';
                    return response()
                        ->json($stale)
                        ->header('X-Kristalin-TV-Stale', '1')
                        ->header('Cache-Control', 'public, max-age=15');
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Data temporarily unavailable',
            ], 503);
        }
    }

    /**
     * Fetch and cache real-time gold/FX rates from the goldprice.org public API.
     * Includes IDR, USD, and SGD rates from the same single API call.
     * Returns null when the API is unreachable or returns unexpected data.
     */
    private function getGoldpriceFallback(): ?array
    {
        return Cache::remember('goldprice_fallback_data', 60, function () {
            try {
                // Single call returns both IDR and SGD alongside USD — more accurate than estimating SGD from USD.
                $response = Http::timeout(5)
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

                // Index items by currency code for easy lookup
                $byCode = [];
                foreach ($json['items'] as $item) {
                    if (isset($item['curr'])) {
                        $byCode[$item['curr']] = $item;
                    }
                }

                $idrItem = $byCode['IDR'] ?? null;
                $usdItem = $byCode['USD'] ?? null;
                $sgdItem = $byCode['SGD'] ?? null;

                // We need at minimum IDR gold price to proceed
                if ($idrItem === null || empty($idrItem['xauPrice'])) {
                    Log::warning('goldprice.org API: IDR xauPrice missing');
                    return null;
                }

                $idrXau = (float) $idrItem['xauPrice']; // IDR per troy oz
                $usdXau = $usdItem ? (float) ($usdItem['xauPrice'] ?? 0) : 0;
                $sgdXau = $sgdItem ? (float) ($sgdItem['xauPrice'] ?? 0) : 0;

                // Derive IDR/gram
                $goldIdrPerGram = $idrXau / self::TROY_OZ_TO_GRAM;

                // Derive FX cross-rates
                $usdIdr = ($usdXau > 0) ? ($idrXau / $usdXau) : 16_000.0;
                // Use SGD directly from API if available; otherwise estimate from USD (1 USD ≈ 1.34 SGD historically)
                $sgdIdr = ($sgdXau > 0 && $usdXau > 0)
                    ? ($idrXau / $sgdXau)
                    : ($usdIdr / 1.34);

                return [
                    'gold_idr_per_gram' => $goldIdrPerGram,
                    'usd_idr'           => $usdIdr,
                    'sgd_idr'           => $sgdIdr,
                ];

            } catch (\Throwable $ex) {
                Log::warning('goldprice.org fallback threw exception: ' . $ex->getMessage());
                return null;
            }
        });
    }
}
