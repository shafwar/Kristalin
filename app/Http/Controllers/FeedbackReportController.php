<?php

namespace App\Http\Controllers;

use App\Models\FeedbackReport;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FeedbackReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'priority' => 'required|string|max:50',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'incident_date' => 'nullable|date',
            'file' => 'nullable|file|max:10240', // 10MB
        ]);

        $ticket_number = 'TKT-' . date('Y') . '-' . str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $validated['ticket_number'] = $ticket_number;
        $validated['status'] = 'submitted';

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('feedback_files', 'public');
            $validated['file'] = $path;
        }

        $report = FeedbackReport::create($validated);

        return response()->json([
            'success' => true,
            'ticket_number' => $report->ticket_number,
            'status' => $report->status,
        ]);
    }

    public function showByTicket($ticket_number)
    {
        $report = FeedbackReport::where('ticket_number', $ticket_number)->first();
        if (!$report) {
            return response()->json(['error' => 'Ticket number not found.'], 404);
        }
        return response()->json([
            'ticket_number' => $report->ticket_number,
            'category' => $report->category,
            'department' => $report->department,
            'priority' => $report->priority,
            'subject' => $report->subject,
            'description' => $report->description,
            'incident_date' => $report->incident_date,
            'file' => $report->file ? Storage::url($report->file) : null,
            'status' => $report->status,
            'created_at' => $report->created_at,
        ]);
    }
} 