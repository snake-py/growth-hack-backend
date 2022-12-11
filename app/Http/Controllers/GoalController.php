<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGoalRequest;
use App\Models\Goal;
use App\Models\Site;
use Illuminate\Http\Request;

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
    public function show($id)
    {
        //
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
