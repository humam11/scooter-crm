<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\ScooterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index']);
    
    // Scooters
    Route::apiResource('scooters', ScooterController::class);
    
    // Rentals
    Route::apiResource('rentals', RentalController::class);
    
    // Logout
    Route::post('/logout', [UserController::class, 'logout']);
});
