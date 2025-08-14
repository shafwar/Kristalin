<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SearchController extends Controller
{
    private function localizeKeyword(string $query, string $targetLocale): string
    {
        $q = mb_strtolower(trim($query));
        $map = [
            'perusahaan' => ['en' => 'company', 'zh' => '公司', 'id' => 'perusahaan'],
            'company' => ['id' => 'perusahaan', 'zh' => '公司', 'en' => 'company'],
            '公司' => ['id' => 'perusahaan', 'en' => 'company', 'zh' => '公司'],
        ];

        foreach ($map as $source => $translations) {
            if ($q === mb_strtolower($source)) {
                return $translations[$targetLocale] ?? $query;
            }
        }
        return $query;
    }
    /**
     * Handle search across translated page contents.
     */
    public function index(Request $request)
    {
        $query = trim((string) $request->input('q', ''));
        $page = max(1, (int) $request->input('page', 1));
        $perPage = 10;

        $locale = app()->getLocale();
        $localesToScan = ['id', 'en', 'zh'];
        if (!in_array($locale, $localesToScan, true)) {
            $localesToScan[] = $locale;
        }

        // Load translations for all locales we want to scan plus current locale
        $pagesByLocale = [];
        foreach ($localesToScan as $loc) {
            $pagesByLocale[$loc] = trans('pages', locale: $loc);
            if (!is_array($pagesByLocale[$loc])) {
                $pagesByLocale[$loc] = [];
            }
        }
        $pages = $pagesByLocale[$locale] ?? [];

        $routeMap = [
            'welcome' => '/',
            'about' => '/about',
            'company_overview' => '/company-overview',
            'milestones' => '/milestones',
            'vision_mission' => '/vision-mission',
            'core_values' => '/core-values',
            'leadership_traits' => '/leadership-traits',
            'line_of_business' => '/line-of-business',
            'business_activity' => '/business-activity',
            'csr' => '/csr',
            'news' => '/news',
            'contact' => '/contact',
            'message_from_founder' => '/message-from-founder',
        ];

        $results = [];
        if ($query !== '') {
            $lowerQuery = Str::lower($query);

            // First pass: find matching paths in ANY locale
            $matchedPaths = [];
            $scan = function ($value, $path) use (&$scan, $lowerQuery, &$matchedPaths) {
                if (is_array($value)) {
                    foreach ($value as $key => $child) {
                        $scan($child, array_merge($path, [(string) $key]));
                    }
                    return;
                }
                if (!is_string($value)) {
                    return;
                }
                $text = trim(preg_replace('/\s+/', ' ', $value));
                if ($text === '') {
                    return;
                }
                if (mb_stripos($text, $lowerQuery) !== false) {
                    $matchedPaths[implode('.', $path)] = true;
                }
            };

            foreach ($pagesByLocale as $loc => $tree) {
                $scan($tree, []);
            }

            // Second pass: build results using CURRENT locale content for each matched path
            foreach (array_keys($matchedPaths) as $pathString) {
                $segments = $pathString === '' ? [] : explode('.', $pathString);
                $text = data_get($pages, $pathString);
                if (!is_string($text) || trim($text) === '') {
                    // fallback to any locale text for snippet
                    foreach ($pagesByLocale as $tree) {
                        $fallback = data_get($tree, $pathString);
                        if (is_string($fallback) && trim($fallback) !== '') {
                            $text = $fallback;
                            break;
                        }
                    }
                    if (!is_string($text)) {
                        $text = '';
                    }
                }

                $topKey = $segments[0] ?? 'general';
                $url = $routeMap[$topKey] ?? '/';

                $title = null;
                if (isset($pages[$topKey]['page_title']) && is_string($pages[$topKey]['page_title'])) {
                    $title = $pages[$topKey]['page_title'];
                } elseif (isset($pages[$topKey]['title']) && is_string($pages[$topKey]['title'])) {
                    $title = $pages[$topKey]['title'];
                } else {
                    $title = Str::headline(str_replace('_', ' ', (string) $topKey));
                }

                $normalized = trim(preg_replace('/\s+/', ' ', (string) $text));
                $pos = mb_stripos($normalized, $lowerQuery);
                if ($pos === false) {
                    // If keyword not present in current-locale text, just take the first slice
                    $snippet = mb_substr($normalized, 0, 160) . (mb_strlen($normalized) > 160 ? ' …' : '');
                } else {
                    $start = max(0, (int) $pos - 80);
                    $length = mb_strlen($normalized);
                    $end = min($length, (int) $pos + mb_strlen($lowerQuery) + 80);
                    $snippet = ($start > 0 ? '… ' : '') . mb_substr($normalized, $start, $end - $start) . ($end < $length ? ' …' : '');
                }

                $results[] = [
                    'title' => $title,
                    'url' => $url,
                    'snippet' => $snippet,
                    'path' => $pathString,
                ];
            }
        }

        $results = collect($results)
            ->unique(fn ($r) => $r['url'] . '|' . $r['snippet'])
            ->values()
            ->all();

        $total = count($results);
        $totalPages = max(1, (int) ceil($total / $perPage));
        $page = min($page, $totalPages);
        $offset = ($page - 1) * $perPage;
        $pageItems = array_slice($results, $offset, $perPage);

        $displayQuery = $this->localizeKeyword($query, $locale);

        return Inertia::render('search', [
            'q' => $query,
            'displayQuery' => $displayQuery,
            'results' => $pageItems,
            'total' => $total,
            'perPage' => $perPage,
            'currentPage' => $page,
            'totalPages' => $totalPages,
        ]);
    }
}
 
