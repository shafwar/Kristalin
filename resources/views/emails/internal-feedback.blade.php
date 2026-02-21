<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internal Feedback Received</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px; }
        h1 { font-size: 1.25rem; color: #111827; margin-bottom: 16px; }
        .meta { background: #f3f4f6; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 0.875rem; }
        .meta p { margin: 4px 0; }
        .content { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; }
        .label { font-weight: 600; color: #4b5563; }
        .anonymous { font-style: italic; color: #6b7280; }
    </style>
</head>
<body>
    <h1>Internal Feedback Received</h1>

    <div class="meta">
        <p><span class="label">Category:</span> {{ $categoryLabel }}</p>
        <p><span class="label">Submitted at:</span> {{ $submittedAt }}</p>
        @if($isAnonymous)
            <p class="anonymous">Submitted without contact details.</p>
        @else
            @if($name)<p><span class="label">Name:</span> {{ $name }}</p>@endif
            @if($email)<p><span class="label">Email:</span> {{ $email }}</p>@endif
            @if($phone)<p><span class="label">Phone:</span> {{ $phone }}</p>@endif
        @endif
    </div>

    <p><span class="label">Message:</span></p>
    <div class="content">{{ $description }}</div>

    @if($hasAttachment ?? false)
        <p style="margin-top: 20px; font-size: 0.875rem; color: #6b7280;">An attachment is included with this email.</p>
    @endif
</body>
</html>
