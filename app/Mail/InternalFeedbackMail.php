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
    ) {
        $this->submittedAt = now()->format('Y-m-d H:i:s');
        $this->hasAttachment = $attachment !== null && $attachment->isValid();
    }

    public ?string $submittedAt = null;

    public bool $hasAttachment = false;

    public function envelope(): Envelope
    {
        $fromAddress = config('mail.internal_feedback.from.address', config('mail.from.address'));
        $fromName = config('mail.internal_feedback.from.name', config('mail.from.name'));

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
            $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromPath($this->attachment->getRealPath())
                ->as($this->attachment->getClientOriginalName())
                ->withMime($this->attachment->getMimeType());
        }

        return $attachments;
    }
}
