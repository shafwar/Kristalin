<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInternalReportRequest;
use App\Mail\InternalFeedbackMail;
use App\Models\InternalReport;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InternalReportController extends Controller
{
    private const CATEGORY_LABELS = [
        'general' => 'General Inquiry',
        'process_improvement' => 'Process Improvement',
        'workplace' => 'Workplace & Environment',
        'policy' => 'Policy & Compliance',
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
        $data = $request->validated();
        $description = !empty($data['description']) ? strip_tags($data['description']) : '';

        $to = config('mail.internal_feedback.to');
        if (empty($to)) {
            \Log::warning('Internal Feedback: INTERNAL_FEEDBACK_TO_EMAIL not set. Email not sent.');
            return redirect()->route('internal-feedback')->with('success', false)->with('error', 'Service not configured. Please try again later.');
        }

        $categoryLabel = self::CATEGORY_LABELS[$data['category']] ?? $data['category'];
        $file = $request->hasFile('attachment') && $request->file('attachment')->isValid()
            ? $request->file('attachment')
            : null;

        $mailable = new InternalFeedbackMail(
            categoryLabel: $categoryLabel,
            description: $description,
            isAnonymous: $data['is_anonymous'] ?? false,
            name: $data['is_anonymous'] ? null : ($data['name'] ?? null),
            email: $data['is_anonymous'] ? null : ($data['email'] ?? null),
            phone: $data['is_anonymous'] ? null : ($data['phone'] ?? null),
            attachment: $file,
        );

        try {
            Mail::mailer('resend')->to($to)->send($mailable);
        } catch (\Throwable $e) {
            \Log::error('Internal Feedback email failed: ' . $e->getMessage());
            return redirect()->route('internal-feedback')->with('success', false)->with('error', 'Unable to send. Please try again later.');
        }

        // Optional: save to DB for audit (no attachment stored)
        InternalReport::create([
            'name' => $data['is_anonymous'] ? null : ($data['name'] ?? null),
            'email' => $data['is_anonymous'] ? null : ($data['email'] ?? null),
            'phone' => $data['is_anonymous'] ? null : ($data['phone'] ?? null),
            'category' => $data['category'],
            'description' => $description,
            'attachment_path' => null,
            'attachment_original_name' => $file ? $file->getClientOriginalName() : null,
            'is_anonymous' => $data['is_anonymous'] ?? false,
            'status' => 'submitted',
        ]);

        return redirect()->route('internal-feedback')->with('success', true);
    }
}
