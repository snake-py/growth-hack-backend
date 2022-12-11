<?php

use App\Http\Controllers\GoalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::patch('/settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::delete('/settings', [SettingsController::class, 'destroy'])->name('settings.destroy');

    Route::get('/sites', [SiteController::class, 'index'])->name('sites.index');
    Route::get('/sites/new', [SiteController::class, 'new'])->name('sites.new');
    Route::post('/sites/create', [SiteController::class, 'create'])->name('sites.create');
    Route::get('/sites/{id}', [SiteController::class, 'details'])->name('sites.details.index');
    Route::get('/sites/{id}/events', [SiteController::class, 'detailsEvents'])->name('sites.details.events');
    Route::get('/sites/{id}/goals', [SiteController::class, 'detailsGoals'])->name('sites.details.goals');
    Route::post('/sites/{id}/goals', [GoalController::class, 'create'])->name('sites.details.goals.create');
    Route::get('/sites/{site_title}/goals/{goal_id}', [GoalController::class, 'show'])->name('sites.details.goals.details');


    // Route::put('/sites/{id}', [SiteController::class, 'update'])->name('sites.update');
    // Route::delete('/sites/{id}', [SiteController::class, 'destroy'])->name('sites.destroy');
});

require __DIR__ . '/auth.php';
