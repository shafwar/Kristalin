<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInternalReportRequest;
use App\Mail\InternalFeedbackMail;
use App\Models\InternalReport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
     * Store a new internal report and send email via Resend (no R2, no admin).
     * Attachment is sent as email attachment; Contact form remains on cPanel.
     */
    public function store(StoreInternalReportRequest $request)
    {
        try {
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

            $mailable = new InternalFeedbackMail(
                categoryLabel: $categoryLabel,
                description: $description,
                isAnonymous: (bool) ($data['is_anonymous'] ?? false),
                name: $data['is_anonymous'] ? null : ($data['name'] ?? null),
                email: $data['is_anonymous'] ? null : ($data['email'] ?? null),
                phone: $data['is_anonymous'] ? null : ($data['phone'] ?? null),
                attachment: $file,
                attachmentOriginalName: $file ? $file->getClientOriginalName() : null,
            );

            Mail::mailer('resend')->to($to)->send($mailable);

            // Optional: save to DB for audit (jangan gagalkan response jika migrasi belum jalan)
            try {
                InternalReport::create([
                    'name' => $data['is_anonymous'] ? null : ($data['name'] ?? null),
                    'email' => $data['is_anonymous'] ? null : ($data['email'] ?? null),
                    'phone' => $data['is_anonymous'] ? null : ($data['phone'] ?? null),
                    'category' => $data['category'],
                    'description' => $description,
                    'attachment_path' => null,
                    'attachment_original_name' => $file ? $file->getClientOriginalName() : null,
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
