<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            $path = $request->file('file')->store('contact_files', 'public');
            $validated['file'] = $path;
        }

        $contact = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'id' => $contact->id,
        ]);
    }
} 