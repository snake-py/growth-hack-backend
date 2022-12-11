<?php

use App\Http\Controllers\Auth\ApiTokenController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\SiteController;
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

Route::post('token', [ApiTokenController::class, 'generateToken']);

Route::group(['prefix' => 'v1'], function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('sites', SiteController::class);
        Route::get('sites', [SiteController::class, 'apiIndex']);
    });
});

Route::post('/event', [EventController::class, 'store']);
Route::post('/testing/event', [EventController::class, 'storeTesting']);


Route::get('test', [EventController::class, 'testDebugger']);
