<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'department',
        'priority',
        'subject',
        'description',
        'incident_date',
        'file',
        'ticket_number',
        'status',
    ];
} 