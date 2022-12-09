<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'host_name',
        'event_name',
        'data',
    ];
}
