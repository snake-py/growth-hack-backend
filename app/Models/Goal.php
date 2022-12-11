<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'main_event',
        'positive_related_events',
        'negative_related_events',
        'site_id',
        'description'
    ];

    protected $casts = [
        'positive_related_events' => 'array',
        'negative_related_events' => 'array',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
