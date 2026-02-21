<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternalReport extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'category',
        'description',
        'attachment_path',
        'attachment_original_name',
        'is_anonymous',
        'status',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_REVIEWED = 'reviewed';
    public const STATUS_RESOLVED = 'resolved';

    public static function statuses(): array
    {
        return [
            self::STATUS_PENDING => 'Pending',
            self::STATUS_REVIEWED => 'Reviewed',
            self::STATUS_RESOLVED => 'Resolved',
        ];
    }
}
