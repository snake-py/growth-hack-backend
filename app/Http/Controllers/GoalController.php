<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGoalRequest;
use App\Models\Goal;
use App\Models\RawEvent;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int|string $site)
    {
        $site = Site::where('user_id', auth()->id())->findOrFail($site);
        $goals = $site->goals;
        return response()->json($goals);
    }

    public function create(CreateGoalRequest $request)
    {
        $site = Site::where('user_id', auth()->id())->findOrFail($request->id);
        $goal = $this->store($request, $site);
        return redirect()->route('sites.details.goals', $site->title);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateGoalRequest $request, $site)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $validated['site_id'] = $site->id;
        $goal = Goal::create($validated);
        return $goal;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $site_title, int $goal_id)
    {
        $goal = $this->getGoal($site_title, $goal_id);
        $site = Site::where('user_id', auth()->id())->where('title', $site_title)->get()->first();
        return Inertia::render(
            'Sites/Details/Goals/Details',
            [
                'site' => $site,
                'goal' => $goal,
                'eventData' => $this->getMainEventData($goal, $site),
            ]
        );
    }

    private function getMainEventData($goal, $site)
    {
        $mainEvent = $this->getInformationForEvent($goal->main_event, $site);

        $positiveRelatedEvents = [];
        $negativeRelatedEvents = [];
        foreach ($this->toArray($goal->positive_related_events) as $key => $event) {
            $positiveRelatedEvents[] = $this->getInformationForEvent($event, $site);
        }
        foreach ($this->toArray($goal->negative_related_events) as $key => $event) {
            $negativeRelatedEvents[] = $this->getInformationForEvent($event, $site);
        }
        $visitors = $this->getInformationForEvent('visit_site', $site);
        return [
            'mainEvent' => $mainEvent,
            'positiveRelatedEvents' => $positiveRelatedEvents,
            'negativeRelatedEvents' => $negativeRelatedEvents,
            'visitors' => $visitors,
        ];
    }


    private function toArray(string $eventString)
    {
        return json_decode($eventString, true);
    }

    private function getInformationForEvent($eventName, $site)
    {
        return RawEvent::where('event_name', $eventName)->where('origin', $site->url)->orderBy('created_at', 'desc')->get();
    }

    public function getGoal(string $site_title, int $goal_id)
    {
        $site = Site::where('user_id', auth()->id())->where('title', $site_title)->get()->first();
        $goal = $site->goals->find($goal_id);
        return $goal;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
