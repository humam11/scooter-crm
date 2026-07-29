<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// SPA catchall - serve the app for all other routes
Route::get('/{any}', function () {
    return view('spa');
})->where('any', '.*');
