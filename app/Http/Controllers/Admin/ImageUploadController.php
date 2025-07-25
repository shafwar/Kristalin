<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Exception;

class ImageUploadController extends Controller
{
    private $imageManager;

    public function __construct()
    {
        // Initialize ImageManager dengan GD driver untuk v3.11
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * POST /admin/upload/image
     * Upload image with automatic resize and thumbnail generation
     */
    public function upload(Request $request)
    {
        try {
            // Validation
            $request->validate([
                'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:5120', // 5MB max
                'page' => 'nullable|string',
            ]);

            $file = $request->file('image');
            $page = $request->input('page', 'general');

            // Create folder structure
            $folder = 'admin/images/' . Str::slug($page);
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = Str::random(32) . '.' . $ext;

            // Ensure storage directory exists
            if (!Storage::exists($folder)) {
                Storage::makeDirectory($folder);
            }

            // Process main image (max width 1600px) - v3.11 syntax
            $image = $this->imageManager->read($file->getRealPath());

            // Auto-orient image and resize if needed
            $image = $image->orient();

            if ($image->width() > 1600) {
                $image = $image->scale(width: 1600);
            }

            // Save main image with quality 85%
            $mainImagePath = $folder . '/' . $filename;
            $encodedImage = $image->toJpeg(quality: 85);
            Storage::put($mainImagePath, $encodedImage);

            // Generate thumbnail (300px width)
            $thumb = $this->imageManager->read($file->getRealPath());
            $thumb = $thumb->orient()->scale(width: 300);

            $thumbname = 'thumb_' . $filename;
            $thumbPath = $folder . '/' . $thumbname;
            $encodedThumb = $thumb->toJpeg(quality: 80);
            Storage::put($thumbPath, $encodedThumb);

            // Get original dimensions for response
            $originalImage = $this->imageManager->read($file->getRealPath());

            return response()->json([
                'success' => true,
                'url' => Storage::url($mainImagePath),
                'thumb_url' => Storage::url($thumbPath),
                'filename' => $filename,
                'thumbname' => $thumbname,
                'folder' => $folder,
                'size' => $file->getSize(),
                'width' => $originalImage->width(),
                'height' => $originalImage->height(),
                'message' => 'Image uploaded successfully with v3.11'
            ]);

        } catch (Exception $e) {
            \Log::error('Image upload failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage(),
                'debug' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    /**
     * DELETE /admin/images/{filename}?page=about
     * Delete image and its thumbnail
     */
    public function destroy(Request $request, $filename)
    {
        try {
            $page = $request->input('page', 'general');
            $folder = 'admin/images/' . Str::slug($page);
            $thumbname = 'thumb_' . $filename;

            // Delete both main image and thumbnail
            $mainPath = $folder . '/' . $filename;
            $thumbPath = $folder . '/' . $thumbname;

            $deleted = [];
            if (Storage::exists($mainPath)) {
                Storage::delete($mainPath);
                $deleted[] = 'main image';
            }

            if (Storage::exists($thumbPath)) {
                Storage::delete($thumbPath);
                $deleted[] = 'thumbnail';
            }

            return response()->json([
                'success' => true,
                'message' => count($deleted) > 0 ? 'Deleted: ' . implode(', ', $deleted) : 'No files found to delete'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /admin/images/{filename}?page=about
     * Serve image file with proper headers
     */
    public function show(Request $request, $filename)
    {
        try {
            $page = $request->input('page', 'general');
            $folder = 'admin/images/' . Str::slug($page);
            $path = storage_path('app/' . $folder . '/' . $filename);

            if (!file_exists($path)) {
                abort(404, 'Image not found');
            }

            $mime = mime_content_type($path);

            return response()->file($path, [
                'Content-Type' => $mime,
                'Cache-Control' => 'public, max-age=31536000',
                'Expires' => gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT',
            ]);

        } catch (Exception $e) {
            abort(404, 'Image not found: ' . $e->getMessage());
        }
    }

    /**
     * GET /admin/images/list?page=about
     * List all images for a specific page
     */
    public function index(Request $request)
    {
        try {
            $page = $request->input('page', 'general');
            $folder = 'admin/images/' . Str::slug($page);

            if (!Storage::exists($folder)) {
                return response()->json([
                    'success' => true,
                    'images' => [],
                    'message' => 'No images found for page: ' . $page
                ]);
            }

            $files = Storage::files($folder);
            $images = [];

            foreach ($files as $file) {
                $filename = basename($file);

                // Skip thumbnails in the main list
                if (str_starts_with($filename, 'thumb_')) {
                    continue;
                }

                $thumbname = 'thumb_' . $filename;
                $thumbPath = $folder . '/' . $thumbname;

                $images[] = [
                    'filename' => $filename,
                    'url' => Storage::url($file),
                    'thumb_url' => Storage::exists($thumbPath) ? Storage::url($thumbPath) : Storage::url($file),
                    'size' => Storage::size($file),
                    'size_human' => $this->formatBytes(Storage::size($file)),
                    'modified' => Storage::lastModified($file),
                    'modified_human' => date('Y-m-d H:i:s', Storage::lastModified($file))
                ];
            }

            // Sort by modified date (newest first)
            usort($images, function($a, $b) {
                return $b['modified'] - $a['modified'];
            });

            return response()->json([
                'success' => true,
                'images' => $images,
                'count' => count($images),
                'page' => $page
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to list images: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper function to format file size
     */
    private function formatBytes($size, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $size > 1024 && $i < count($units) - 1; $i++) {
            $size /= 1024;
        }

        return round($size, $precision) . ' ' . $units[$i];
    }
}
