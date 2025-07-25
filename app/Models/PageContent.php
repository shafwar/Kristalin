<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = [
        'page_name',
        'section',
        'content_type',
        'content_key',
        'content_value',
        'meta',
        'status',
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
