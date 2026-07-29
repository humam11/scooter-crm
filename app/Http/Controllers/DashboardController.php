<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Scooter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics for the authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        // 1. Scooter Status Statistics
        $statusStats = Scooter::where('user_id', $userId)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Ensure all statuses are present with 0 as default
        $scooterStatusStats = [
            'available' => $statusStats['available'] ?? 0,
            'in_use' => $statusStats['in_use'] ?? 0,
            'maintenance' => $statusStats['maintenance'] ?? 0,
            'offline' => $statusStats['offline'] ?? 0,
        ];

        // 2. Average Battery Level
        $averageBattery = Scooter::where('user_id', $userId)
            ->avg('battery_level');

        // 3. Active Rentals Count
        $activeRentals = Rental::whereHas('scooter', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('status', 'active')
            ->count();

        // 4. Total Scooters Count
        $totalScooters = Scooter::where('user_id', $userId)->count();

        // 5. Active Rental Percentage
        $activePercentage = $totalScooters > 0
            ? round(($activeRentals / $totalScooters) * 100, 2)
            : 0;

        return response()->json([
            'scooter_status_stats' => $scooterStatusStats,
            'average_battery' => round($averageBattery ?? 0, 2),
            'active_rentals' => $activeRentals,
            'total_scooters' => $totalScooters,
            'active_percentage' => $activePercentage,
        ]);
    }
}
