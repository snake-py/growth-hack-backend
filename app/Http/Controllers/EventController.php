<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEventRequest;
use App\Jobs\ProcessEvent;
use App\Models\RawEvent;

class EventController extends Controller
{
    public function store(CreateEventRequest $request)
    {
        $validated = $request->validated();
        $validated['data'] = json_encode($validated['data']);
        $event = new RawEvent($validated);
        $event->origin = $request->host();
        $event->save();
        ProcessEvent::dispatch($event);
        return response()->json(['message' => 'Event created successfully']);
    }
}
