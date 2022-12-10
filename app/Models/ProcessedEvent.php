<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ProcessedEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_name',
        'table',
        'site_id',
        'count'
    ];

    public function rawEvents()
    {
        return $this->hasMany(RawEvent::class);
    }

    public function eventSchemas()
    {
        return $this->hasMany(EventSchema::class);
    }
}
