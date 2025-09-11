<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ContactMessageReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public ContactMessage $contactMessage;

    public function __construct(ContactMessage $contactMessage)
    {
        $this->contactMessage = $contactMessage;
    }

    public function build(): self
    {
        $email = $this->subject('[Contact] ' . $this->contactMessage->subject)
            ->replyTo($this->contactMessage->email, $this->contactMessage->name)
            ->view('emails.contact-message', [
                'contact' => $this->contactMessage,
            ]);

        if (!empty($this->contactMessage->file)) {
            $path = Storage::disk('public')->path($this->contactMessage->file);
            if (is_file($path)) {
                $email->attach($path);
            }
        }

        return $email;
    }
}


