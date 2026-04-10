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
     * Stream a stored attachment (S3/R2) using an unguessable token from the notification email.
     * Does not use expiring presigned URLs; access lasts as long as the object remains in storage.
     */
    public function downloadAttachment(string $token)
    {
        if (strlen($token) !== 64 || !ctype_xdigit($token)) {
            abort(404);
        }

        $report = InternalReport::query()
            ->where('attachment_secret', $token)
            ->whereNotNull('attachment_path')
            ->first();

        if ($report === null) {
            abort(404);
        }

        $disk = Storage::disk('s3');
        if (!$disk->exists($report->attachment_path)) {
            abort(404);
        }

        $name = $report->attachment_original_name ?: basename($report->attachment_path);

        return $disk->download($report->attachment_path, $name);
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
            $s3Path = null;
            $attachmentSecret = null;

            if ($file) {
                $attachmentName = $file->getClientOriginalName();
                $attachmentMime = $file->getMimeType() ?: 'application/octet-stream';

                // Prefer S3/R2: store privately; email uses app download URL (no presigned expiry)
                try {
                    $disk = Storage::disk('s3');
                    $s3Path = $disk->putFileAs(
                        'internal-feedback/' . now()->format('Y-m-d'),
                        $file,
                        Str::uuid() . '_' . $file->getClientOriginalName(),
                        'private'
                    );
                    $attachmentSecret = bin2hex(random_bytes(32));
                    Log::info('Internal Feedback: attachment stored to S3/R2, email will contain app download link.', ['filename' => $attachmentName]);
                } catch (\Throwable $e) {
                    Log::warning('Internal Feedback: S3/R2 store failed, falling back to in-memory attachment.', ['message' => $e->getMessage()]);
                }

                // Fallback: in-memory attachment when S3 not used or failed (no durable link)
                if ($s3Path === null) {
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

            // Save before email so the notification can include a non-expiring app download URL
            try {
                InternalReport::create([
                    'name' => $data['is_anonymous'] ? null : ($data['name'] ?? null),
                    'email' => $data['is_anonymous'] ? null : ($data['email'] ?? null),
                    'phone' => $data['is_anonymous'] ? null : ($data['phone'] ?? null),
                    'category' => $data['category'],
                    'description' => $description,
                    'attachment_path' => $s3Path,
                    'attachment_original_name' => $attachmentName,
                    'attachment_secret' => $s3Path !== null ? $attachmentSecret : null,
                    'is_anonymous' => (bool) ($data['is_anonymous'] ?? false),
                    'status' => 'submitted',
                ]);
                if ($s3Path !== null && $attachmentSecret !== null) {
                    $attachmentDownloadUrl = route('internal-feedback.attachment', ['token' => $attachmentSecret], true);
                }
            } catch (\Throwable $e) {
                Log::warning('Internal Feedback: DB save skipped. ' . $e->getMessage());
                if ($s3Path !== null && $attachmentName !== null) {
                    try {
                        $disk = Storage::disk('s3');
                        $safeFilename = str_replace('"', '\\"', $attachmentName);
                        $attachmentDownloadUrl = $disk->temporaryUrl($s3Path, now()->addDays(7), [
                            'ResponseContentDisposition' => 'attachment; filename="' . $safeFilename . '"',
                        ]);
                        Log::warning('Internal Feedback: using 7-day presigned URL because DB row was not saved.');
                    } catch (\Throwable $e2) {
                        Log::warning('Internal Feedback: could not build fallback temporary URL.', ['message' => $e2->getMessage()]);
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
