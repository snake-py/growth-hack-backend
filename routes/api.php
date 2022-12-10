<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\SiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('sites', SiteController::class);
        Route::get('sites', [SiteController::class, 'apiIndex']);
    });
});

Route::post('/event', [EventController::class, 'store']);
