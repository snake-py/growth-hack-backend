<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMapper extends Model
{
    use HasFactory;

    protected $fillable = [
        'host_id',
        'event_name',
        'map'
    ];
}
