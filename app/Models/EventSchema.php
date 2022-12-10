<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSchemas extends Model
{
    use HasFactory;

    protected $fillable = [
        'processed_event_id',
        'column_name',
        'column_type',
    ];

    public function processedEvent()
    {
        return $this->belongsTo(ProcessedEvent::class);
    }
}
