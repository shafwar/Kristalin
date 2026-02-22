<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
        public readonly ?string $attachmentContent = null,
        public readonly ?string $attachmentName = null,
        public readonly ?string $attachmentMime = null,
        /** When set, email contains download link (file stored in S3/R2); no inline attachment. */
        public readonly ?string $attachmentDownloadUrl = null,
    ) {
        $this->submittedAt = now()->format('Y-m-d H:i:s');
        $this->hasAttachment = $attachmentDownloadUrl !== null
            || ($attachmentContent !== null && $attachmentContent !== '' && $attachmentName !== null);
        $this->hasAttachmentLink = $attachmentDownloadUrl !== null;
    }

    public ?string $submittedAt = null;

    public bool $hasAttachment = false;

    public bool $hasAttachmentLink = false;

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
        if ($this->attachmentDownloadUrl !== null) {
            return [];
        }
        if ($this->attachmentContent === null || $this->attachmentContent === '' || $this->attachmentName === null) {
            return [];
        }

        $name = $this->attachmentName;
        $mime = $this->attachmentMime ?: 'application/octet-stream';
        $content = $this->attachmentContent;

        return [
            \Illuminate\Mail\Mailables\Attachment::fromData(fn () => $content, $name)->withMime($mime),
        ];
    }
}
