<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PageContent;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class PageContentController extends Controller
{
    /**
     * Available pages configuration
     */
    private $availablePages = [
        'welcome' => [
            'title' => 'Welcome Page',
            'description' => 'Homepage content and hero section',
            'icon' => 'home'
        ],
        'about' => [
            'title' => 'About Us',
            'description' => 'Company information and history',
            'icon' => 'info'
        ],
        'company-overview' => [
            'title' => 'Company Overview',
            'description' => 'Detailed company overview',
            'icon' => 'building'
        ],
        'vision-mission' => [
            'title' => 'Vision & Mission',
            'description' => 'Company vision and mission statements',
            'icon' => 'target'
        ],
        'core-values' => [
            'title' => 'Core Values',
            'description' => 'Company core values and principles',
            'icon' => 'heart'
        ],
        'leadership-traits' => [
            'title' => 'Leadership Traits',
            'description' => 'Leadership characteristics and traits',
            'icon' => 'users'
        ],
        'message-from-founder' => [
            'title' => 'Message from Founder',
            'description' => 'Founder message and company story',
            'icon' => 'message-circle'
        ],
        'line-of-business' => [
            'title' => 'Line of Business',
            'description' => 'Business sectors and activities',
            'icon' => 'briefcase'
        ],
        'business-activity' => [
            'title' => 'Business Activity',
            'description' => 'Current business activities',
            'icon' => 'activity'
        ],
        'milestones' => [
            'title' => 'Milestones',
            'description' => 'Company milestones and achievements',
            'icon' => 'flag'
        ],
        'news' => [
            'title' => 'News & Updates',
            'description' => 'Latest news and company updates',
            'icon' => 'newspaper'
        ],
        'csr' => [
            'title' => 'Corporate Social Responsibility',
            'description' => 'CSR programs and initiatives',
            'icon' => 'globe'
        ],
        'contact' => [
            'title' => 'Contact Us',
            'description' => 'Contact information and form',
            'icon' => 'phone'
        ],
    ];

    /**
     * Display a listing of all pages
     */
    public function index()
    {
        try {
            // Get all pages with content count and last modified
            $pagesWithContent = PageContent::select('page_name')
                ->selectRaw('COUNT(*) as content_count')
                ->selectRaw('MAX(updated_at) as last_modified')
                ->selectRaw('COUNT(CASE WHEN status = "active" THEN 1 END) as active_count')
                ->selectRaw('COUNT(CASE WHEN status = "inactive" THEN 1 END) as inactive_count')
                ->groupBy('page_name')
                ->get()
                ->keyBy('page_name');

            // Merge with available pages configuration
            $pages = collect($this->availablePages)->map(function ($config, $pageName) use ($pagesWithContent) {
                $pageData = $pagesWithContent->get($pageName);

                return [
                    'name' => $pageName,
                    'title' => $config['title'],
                    'description' => $config['description'],
                    'icon' => $config['icon'],
                    'content_count' => $pageData->content_count ?? 0,
                    'active_count' => $pageData->active_count ?? 0,
                    'inactive_count' => $pageData->inactive_count ?? 0,
                    'last_modified' => $pageData ? Carbon::parse($pageData->last_modified)->diffForHumans() : 'Never',
                    'last_modified_date' => $pageData ? Carbon::parse($pageData->last_modified)->format('Y-m-d H:i:s') : null,
                    'has_content' => ($pageData->content_count ?? 0) > 0,
                    'edit_url' => route('admin.pages.show', $pageName),
                ];
            })->values();

            // Statistics
            $statistics = [
                'total_pages' => count($this->availablePages),
                'pages_with_content' => $pagesWithContent->count(),
                'total_content_items' => $pagesWithContent->sum('content_count'),
                'active_content_items' => $pagesWithContent->sum('active_count'),
                'inactive_content_items' => $pagesWithContent->sum('inactive_count'),
            ];

            // 🔧 CHANGE: Use lowercase path
            return Inertia::render('admin/pages/index', [
                'pages' => $pages,
                'statistics' => $statistics,
                'availablePages' => array_keys($this->availablePages),
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to load pages index: ' . $e->getMessage());

            // 🔧 CHANGE: Use lowercase path
            return Inertia::render('admin/pages/index', [
                'pages' => [],
                'statistics' => [],
                'error' => 'Failed to load pages. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified page for editing
     */
    public function show($page)
    {
        try {
            // Validate page exists
            if (!array_key_exists($page, $this->availablePages)) {
                return redirect()
                    ->route('admin.pages.index')
                    ->with('error', 'Page not found.');
            }

            // Get page contents grouped by section
            $contents = PageContent::where('page_name', $page)
                ->orderBy('section')
                ->orderBy('created_at')
                ->get()
                ->groupBy('section');

            // Get page configuration
            $pageConfig = $this->availablePages[$page];

            // 🔧 CHANGE: Use lowercase path
            return Inertia::render('admin/editor', [
                'page' => $page,
                'pageTitle' => $pageConfig['title'],
                'pageDescription' => $pageConfig['description'],
                'pageIcon' => $pageConfig['icon'],
                'contents' => $contents,
                'breadcrumbs' => [
                    ['name' => 'Dashboard', 'url' => route('admin.dashboard')],
                    ['name' => 'Pages', 'url' => route('admin.pages.index')],
                    ['name' => $pageConfig['title'], 'url' => null],
                ],
            ]);

        } catch (\Exception $e) {
            Log::error("Failed to load page '{$page}': " . $e->getMessage());

            return redirect()
                ->route('admin.pages.index')
                ->with('error', 'Failed to load page content.');
        }
    }

    /**
     * Update the specified page content
     */
    public function update(Request $request, $page)
    {
        try {
            // Validate page exists
            if (!array_key_exists($page, $this->availablePages)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Page not found.'
                ], 404);
            }

            // Validate request data
            $data = $request->validate([
                'sections' => 'required|array',
                'sections.*.section' => 'required|string|max:255',
                'sections.*.contents' => 'required|array',
                'sections.*.contents.*.id' => 'nullable|integer|exists:page_contents,id',
                'sections.*.contents.*.content_key' => 'required|string|max:255',
                'sections.*.contents.*.content_value' => 'nullable',
                'sections.*.contents.*.content_type' => 'required|in:text,rich_text,image,json',
                'sections.*.contents.*.meta' => 'nullable|array',
                'sections.*.contents.*.status' => 'required|in:active,inactive',
            ]);

            DB::beginTransaction();

            $updatedCount = 0;
            $createdCount = 0;

            foreach ($data['sections'] as $sectionData) {
                foreach ($sectionData['contents'] as $contentData) {
                    // Find existing content or create new
                    $content = isset($contentData['id']) && $contentData['id']
                        ? PageContent::find($contentData['id'])
                        : new PageContent([
                            'page_name' => $page,
                            'section' => $sectionData['section']
                        ]);

                    if (!$content) {
                        throw new \Exception("Content with ID {$contentData['id']} not found.");
                    }

                    // Validate JSON content if type is json
                    if ($contentData['content_type'] === 'json' && !empty($contentData['content_value'])) {
                        $jsonTest = json_decode($contentData['content_value']);
                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception("Invalid JSON in field: {$contentData['content_key']}");
                        }
                    }

                    // Update content
                    $isNew = !$content->exists;

                    $content->fill([
                        'content_key' => $contentData['content_key'],
                        'content_value' => $contentData['content_value'],
                        'content_type' => $contentData['content_type'],
                        'meta' => $contentData['meta'] ?? null,
                        'status' => $contentData['status'] ?? 'active',
                    ]);

                    $content->save();

                    if ($isNew) {
                        $createdCount++;
                    } else {
                        $updatedCount++;
                    }
                }
            }

            DB::commit();

            // Log the update
            Log::info("Page '{$page}' updated successfully", [
                'updated_items' => $updatedCount,
                'created_items' => $createdCount,
                'user_id' => auth()->id(),
            ]);

            return redirect()->back()->with('success',
                "Page updated successfully! Updated: {$updatedCount}, Created: {$createdCount} items."
            );

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to update page '{$page}': " . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to update page: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Export page content (Future Enhancement)
     */
    public function export(Request $request)
    {
        try {
            $pages = $request->input('pages', []);

            if (empty($pages)) {
                $pages = array_keys($this->availablePages);
            }

            $exportData = [];

            foreach ($pages as $page) {
                if (array_key_exists($page, $this->availablePages)) {
                    $contents = PageContent::where('page_name', $page)->get();
                    $exportData[$page] = [
                        'config' => $this->availablePages[$page],
                        'contents' => $contents->toArray(),
                    ];
                }
            }

            $fileName = 'kristalin_content_export_' . date('Y-m-d_H-i-s') . '.json';

            return response()->json($exportData)
                ->header('Content-Disposition', "attachment; filename=\"{$fileName}\"")
                ->header('Content-Type', 'application/json');

        } catch (\Exception $e) {
            Log::error('Failed to export content: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Export failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Import page content (Future Enhancement)
     */
    public function import(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:json|max:10240', // 10MB max
                'overwrite' => 'boolean',
            ]);

            $file = $request->file('file');
            $content = file_get_contents($file->getRealPath());
            $importData = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid JSON file format.');
            }

            DB::beginTransaction();

            $importedPages = 0;
            $importedItems = 0;

            foreach ($importData as $pageName => $pageData) {
                if (!array_key_exists($pageName, $this->availablePages)) {
                    continue; // Skip unknown pages
                }

                // Optionally delete existing content if overwrite is enabled
                if ($request->boolean('overwrite')) {
                    PageContent::where('page_name', $pageName)->delete();
                }

                foreach ($pageData['contents'] as $contentData) {
                    $content = new PageContent();
                    $content->fill([
                        'page_name' => $pageName,
                        'section' => $contentData['section'],
                        'content_key' => $contentData['content_key'],
                        'content_value' => $contentData['content_value'],
                        'content_type' => $contentData['content_type'],
                        'meta' => $contentData['meta'] ?? null,
                        'status' => $contentData['status'] ?? 'active',
                    ]);
                    $content->save();
                    $importedItems++;
                }

                $importedPages++;
            }

            DB::commit();

            Log::info('Content imported successfully', [
                'imported_pages' => $importedPages,
                'imported_items' => $importedItems,
                'user_id' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => "Successfully imported {$importedItems} items across {$importedPages} pages.",
                'imported_pages' => $importedPages,
                'imported_items' => $importedItems,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to import content: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Import failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * API endpoint to get page content (Public API)
     */
    public function apiShow($page)
    {
        try {
            if (!array_key_exists($page, $this->availablePages)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Page not found'
                ], 404);
            }

            $contents = PageContent::where('page_name', $page)
                ->where('status', 'active')
                ->orderBy('section')
                ->orderBy('created_at')
                ->get()
                ->groupBy('section');

            return response()->json([
                'success' => true,
                'page' => $page,
                'title' => $this->availablePages[$page]['title'],
                'contents' => $contents,
                'last_modified' => $contents->flatten()->max('updated_at'),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve page content'
            ], 500);
        }
    }
}
