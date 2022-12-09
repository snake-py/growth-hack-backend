<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEventRequest;
use App\Jobs\ProcessEvent;
use App\Models\RawEvent;

class EventController extends Controller
{
    public function create(CreateEventRequest $request)
    {
        $validated = $request->validated();
        $event = new RawEvent($validated);
        $event->save();
        ProcessEvent::dispatch($event);
        return response()->json(['message' => 'Event created successfully']);
    }
}
