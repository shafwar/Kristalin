<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInternalReportRequest;
use App\Mail\InternalFeedbackMail;
use App\Models\InternalReport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InternalReportController extends Controller
{
    private const CATEGORY_LABELS = [
        'general' => 'General Inquiry',
        'process_improvement' => 'Process Improvement',
        'workplace' => 'Workplace & Environment',
        'safety' => 'Safety & Health',
        'harassment' => 'Harassment / Discrimination',
        'policy' => 'Policy & Compliance',
        'management' => 'Management Issues',
        'facilities' => 'Facilities',
        'ethics' => 'Work Ethics & Integrity',
        'suggestion' => 'Suggestion & Feedback',
        'other' => 'Other',
    ];

    /**
     * Show the internal feedback form (public).
     */
    public function showForm()
    {
        return Inertia::render('internal-feedback');
    }

    /**
     * Store a new internal report and send email via Resend.
     * Attachment: upload to S3/R2 first, then email contains download link (reliable for large files).
     * If S3 is not available, fallback to in-memory attachment.
     */
    public function store(StoreInternalReportRequest $request)
    {
        set_time_limit(120);

        try {
            $hasAttachmentFlag = $request->boolean('has_attachment');
            $hasFile = $request->hasFile('attachment') && $request->file('attachment')->isValid();

            if ($hasFile) {
                $f = $request->file('attachment');
                Log::info('Internal Feedback: attachment received.', [
                    'filename' => $f->getClientOriginalName(),
                    'size' => $f->getSize(),
                ]);
            } elseif ($hasAttachmentFlag) {
                Log::warning('Internal Feedback: client sent has_attachment but no file received. Check upload_max_filesize/post_max_size.');
                return redirect()->route('internal-feedback')
                    ->with('success', false)
                    ->with('error', __('pages.internal_feedback.form.file_not_received'));
            }

            $data = $request->validated();
            $description = !empty($data['description']) ? strip_tags($data['description']) : '';

            $to = config('mail.internal_feedback.to');
            if (empty($to)) {
                Log::warning('Internal Feedback: INTERNAL_FEEDBACK_TO_EMAIL not set.');
                return redirect()->route('internal-feedback')
                    ->with('success', false)
                    ->with('error', 'Service not configured. Please try again later.');
            }

            $fromAddress = config('mail.internal_feedback.from.address');
            if (empty($fromAddress)) {
                $fromAddress = 'onboarding@resend.dev';
                Log::info('Internal Feedback: Using fallback from address (RESEND_FROM_ADDRESS not set).');
            }

            $categoryLabel = self::CATEGORY_LABELS[$data['category']] ?? $data['category'];
            $file = $request->hasFile('attachment') && $request->file('attachment')->isValid()
                ? $request->file('attachment')
                : null;

            $attachmentContent = null;
            $attachmentName = null;
            $attachmentMime = null;
            $attachmentDownloadUrl = null;
            $tempPath = null;

            if ($file) {
                $attachmentName = $file->getClientOriginalName();
                $attachmentMime = $file->getMimeType() ?: 'application/octet-stream';

                // Prefer S3/R2: store file and send download link in email (no size/timeout issues)
                try {
                    $disk = Storage::disk('s3');
                    $path = $disk->putFileAs(
                        'internal-feedback/' . now()->format('Y-m-d'),
                        $file,
                        Str::uuid() . '_' . $file->getClientOriginalName(),
                        'private'
                    );
                    $safeFilename = str_replace('"', '\\"', $file->getClientOriginalName());
                    $attachmentDownloadUrl = $disk->temporaryUrl($path, now()->addDays(7), [
                        'ResponseContentDisposition' => 'attachment; filename="' . $safeFilename . '"',
                    ]);
                    Log::info('Internal Feedback: attachment stored to S3/R2, email will contain download link.', ['filename' => $attachmentName]);
                } catch (\Throwable $e) {
                    Log::warning('Internal Feedback: S3/R2 store failed, falling back to in-memory attachment.', ['message' => $e->getMessage()]);
                }

                // Fallback: in-memory attachment when S3 not used or failed
                if ($attachmentDownloadUrl === null) {
                    $path = $file->getRealPath();
                    if ($path && is_readable($path)) {
                        $attachmentContent = file_get_contents($path);
                    }
                    if ($attachmentContent === false || $attachmentContent === null) {
                        $stored = $file->store('temp', ['disk' => 'local']);
                        if ($stored) {
                            $tempPath = Storage::disk('local')->path($stored);
                            $attachmentContent = @file_get_contents($tempPath) ?: null;
                        }
                    }
                    if ($attachmentContent !== null && $attachmentContent !== false) {
                        Log::info('Internal Feedback: sending with in-memory attachment.', ['filename' => $attachmentName]);
                    }
                }
            }

            $mailable = new InternalFeedbackMail(
                categoryLabel: $categoryLabel,
                description: $description,
                isAnonymous: (bool) ($data['is_anonymous'] ?? false),
                name: $data['is_anonymous'] ? null : ($data['name'] ?? null),
                email: $data['is_anonymous'] ? null : ($data['email'] ?? null),
                phone: $data['is_anonymous'] ? null : ($data['phone'] ?? null),
                attachmentContent: $attachmentContent,
                attachmentName: $attachmentName,
                attachmentMime: $attachmentMime,
                attachmentDownloadUrl: $attachmentDownloadUrl,
            );

            Mail::mailer('resend')->to($to)->send($mailable);

            if ($tempPath && file_exists($tempPath)) {
                @unlink($tempPath);
            }

            // Optional: save to DB for audit (jangan gagalkan response jika migrasi belum jalan)
            try {
                InternalReport::create([
                    'name' => $data['is_anonymous'] ? null : ($data['name'] ?? null),
                    'email' => $data['is_anonymous'] ? null : ($data['email'] ?? null),
                    'phone' => $data['is_anonymous'] ? null : ($data['phone'] ?? null),
                    'category' => $data['category'],
                    'description' => $description,
                    'attachment_path' => null,
                    'attachment_original_name' => $attachmentName,
                    'is_anonymous' => (bool) ($data['is_anonymous'] ?? false),
                    'status' => 'submitted',
                ]);
            } catch (\Throwable $e) {
                Log::warning('Internal Feedback: DB save skipped. ' . $e->getMessage());
            }

            return redirect()->route('internal-feedback')->with('success', true);
        } catch (\Throwable $e) {
            Log::error('Internal Feedback send failed.', [
                'exception' => $e::class,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->route('internal-feedback')
                ->with('success', false)
                ->with('error', 'Unable to send your message. Please try again or contact us directly.');
        }
    }
}
