<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExperimentController extends Controller
{
    public function index()
    {
        return view('pages.experiment.index');
    }

    // public function show($id)
    // {
    //     return view('pages.experiments.show', ['id' => $id]);
    // }

    // public function getOneById($id)
    // {
    //     $experiment = Experiment::find($id)->where('user_id', auth()->user()->id)->first();
    //     if (!$experiment) {
    //         return response()->json(['message' => 'Experiment not found'], 404);
    //     }
    //     return response()->json([...$experiment]);
    // }
}
