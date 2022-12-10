<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSiteRequest;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Sites/Index', [
            'sites' => $this->getSites(),
        ]);
    }

    public function apiIndex()
    {
        return response()->json($this->getSites());
    }

    private function getSites()
    {
        return Site::where('user_id', auth()->id())->get();
    }


    public function create()
    {
        return Inertia::render('Sites/Create');
    }

    public function details(int|string $id)
    {
        return Inertia::render('Sites/Details', [
            'site' => $this->show($id),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateSiteRequest $request)
    {
        $site = Site::create($request->validated());
        return $site;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int|string $id)
    {
        if (is_string($id)) {
            return Site::where('user_id', auth()->id())->where('url', $id);
        }
        return Site::where('user_id', auth()->id())->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateSiteRequest $request, $id)
    {
        $site = Site::where('user_id', auth()->id())->find($id);
        $site->update($request->validated());
        return $site;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $site = Site::where('user_id', auth()->id())->find($id);
        $site->delete();
        return $site;
    }
}
