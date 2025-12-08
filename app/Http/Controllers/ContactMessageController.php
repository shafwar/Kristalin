<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'file' => 'nullable|file|max:10240', // 10MB
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('contact_files', 's3');
            $validated['file'] = $path;
        }

        $contact = ContactMessage::create($validated);
        
        // Force output to Railway logs
        error_log('Contact message saved to database with ID: ' . $contact->id);
        \Log::info('Contact message saved to database with ID: ' . $contact->id);

        // Send email to company
        error_log('Starting email process...');
        \Log::info('Starting email process...');
        try {
            $to = config('mail.to.address', 'info@kristalin.co.id');
            $toName = config('mail.to.name', 'Kristalin Admin');
            $from = config('mail.from.address', 'info@kristalin.co.id');
            $fromName = config('mail.from.name', 'Kristalin');
            
            error_log('Email config - To: ' . $to . ', From: ' . $from);
            \Log::info('Email config - To: ' . $to . ', From: ' . $from);

            Mail::send([], [], function ($message) use ($validated, $request, $to, $toName, $from, $fromName) {
                $message->to($to, $toName)
                    ->from($from, $fromName)
                    ->subject('[Contact Form] ' . ($validated['subject'] ?? ''))
                    ->html(
                        'Nama: ' . e($validated['name']) . '<br>' .
                        'Email: ' . e($validated['email']) . '<br>' .
                        'Subjek: ' . e($validated['subject']) . '<br><br>' .
                        'Pesan:<br>' . nl2br(e($validated['message']))
                    );

                if ($request->hasFile('file')) {
                    $file = $request->file('file');
                    $message->attach($file->getRealPath(), [
                        'as' => $file->getClientOriginalName(),
                        'mime' => $file->getMimeType(),
                    ]);
                }
            });
            
            error_log('Email sent successfully to: ' . $to);
            \Log::info('Email sent successfully to: ' . $to);
        } catch (\Exception $e) {
            error_log('Email failed: ' . $e->getMessage());
            error_log('Email error details: ' . $e->getTraceAsString());
            \Log::error('Email failed: ' . $e->getMessage());
            \Log::error('Email error details: ' . $e->getTraceAsString());
            // Continue execution even if email fails
        }

        return response()->json([
            'success' => true,
            'id' => $contact->id,
        ]);
    }
} 