<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEventRequest;
use App\Http\Requests\CreateTestEventRequest;
use App\Jobs\ProcessEvent;
use App\Models\RawEvent;
use App\Services\ProcessEventService;

class EventController extends Controller
{
    public function store(CreateEventRequest $request)
    {
        $validated = $request->validated();
        $validated['data'] = json_encode($validated['data']);
        $validated['origin'] = $validated['site'];
        $validated['user_agent'] = $request->header('User-Agent');
        unset($validated['site']);
        $event = new RawEvent($validated);
        $event->save();
        ProcessEvent::dispatch($event);
        return response()->json(['message' => 'Event created successfully']);
    }

    public function storeTesting(CreateTestEventRequest $request)
    {
        $validated = $request->validated();
        $validated['data'] = json_encode($validated['data']);
        $validated['origin'] = $validated['site'];
        $validated['user_agent'] = $request->header('User-Agent');
        unset($validated['site']);
        $event = new RawEvent($validated);
        $event->save();
        return ProcessEventService::staticProcess($event, 'test');
    }

    public function testDebugger()
    {
        return 'test';
    }
}
