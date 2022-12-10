<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\map;

class RawEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'processed_event_id',
        'event_name',
        'data',
        'origin',
        'site_id',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public function processedEvent()
    {
        return $this->belongsTo(ProcessedEvent::class);
    }
}
