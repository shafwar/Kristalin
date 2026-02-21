<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\UploadedFile;

class InternalFeedbackMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly string $categoryLabel,
        public readonly string $description,
        public readonly bool $isAnonymous,
        public readonly ?string $name = null,
        public readonly ?string $email = null,
        public readonly ?string $phone = null,
        public readonly ?UploadedFile $attachment = null,
        public readonly ?string $attachmentOriginalName = null,
    ) {
        $this->submittedAt = now()->format('Y-m-d H:i:s');
        $this->hasAttachment = $attachment !== null && $attachment->isValid();
        $this->attachmentDisplayName = $attachmentOriginalName ?? ($attachment && $attachment->isValid() ? $attachment->getClientOriginalName() : null);
    }

    public ?string $submittedAt = null;

    public bool $hasAttachment = false;

    /** Original filename for display in email body so recipient can verify attachment was received. */
    public ?string $attachmentDisplayName = null;

    public function envelope(): Envelope
    {
        $fromAddress = config('mail.internal_feedback.from.address')
            ?: config('mail.from.address')
            ?: 'onboarding@resend.dev';
        $fromName = config('mail.internal_feedback.from.name') ?: config('mail.from.name') ?: 'Internal Feedback';

        return new Envelope(
            from: new \Illuminate\Mail\Mailables\Address($fromAddress, $fromName),
            subject: '[Internal Feedback] ' . $this->categoryLabel . ' – ' . now()->format('Y-m-d H:i'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.internal-feedback',
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        if ($this->attachment && $this->attachment->isValid()) {
            $path = $this->attachment->getRealPath();
            if ($path && is_readable($path)) {
                $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromPath($path)
                    ->as($this->attachment->getClientOriginalName())
                    ->withMime($this->attachment->getMimeType());
            }
        }

        return $attachments;
    }
}
