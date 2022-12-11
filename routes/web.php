<?php

use App\Http\Controllers\ProfileController;
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/sites', [SiteController::class, 'index'])->name('sites.index');
    Route::get('/sites/new', [SiteController::class, 'new'])->name('sites.new');
    Route::post('/sites', [SiteController::class, 'create'])->name('sites.store');
    Route::get('/sites/{id}', [SiteController::class, 'details'])->name('sites.details.index');
    Route::get('/sites/{id}/events', [SiteController::class, 'detailsEvents'])->name('sites.details.events');
    Route::get('/sites/{id}/goals', [SiteController::class, 'detailsGaols'])->name('sites.details.goals');

    // Route::put('/sites/{id}', [SiteController::class, 'update'])->name('sites.update');
    // Route::delete('/sites/{id}', [SiteController::class, 'destroy'])->name('sites.destroy');
});

require __DIR__ . '/auth.php';
