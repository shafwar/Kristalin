<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #111827; }
        .container { max-width: 640px; margin: 0 auto; padding: 16px; }
        .muted { color: #6b7280; }
        .box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; }
        .label { font-weight: bold; }
    </style>
    </head>
<body>
    <div class="container">
        <h2>New contact message received</h2>
        <p class="muted">Submitted at {{ $contact->created_at }}</p>

        <div class="box">
            <p><span class="label">Name:</span> {{ $contact->name }}</p>
            <p><span class="label">Email:</span> {{ $contact->email }}</p>
            <p><span class="label">Subject:</span> {{ $contact->subject }}</p>
            <p><span class="label">Message:</span></p>
            <p>{!! nl2br(e($contact->message)) !!}</p>
        </div>

        @if(!empty($contact->file))
            <p>Attachment included.</p>
        @endif
    </div>
</body>
</html>


