<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScooterRequest;
use App\Http\Requests\UpdateScooterRequest;
use App\Models\Scooter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScooterController extends Controller
{
    /**
     * Display a listing of the user's scooters.
     */
    public function index(Request $request): JsonResponse
    {
        $scooters = $request->user()
            ->scooters()
            ->with('rentals')
            ->get();

        return response()->json($scooters);
    }

    /**
     * Store a newly created scooter.
     */
    public function store(StoreScooterRequest $request): JsonResponse
    {
        $scooter = $request->user()->scooters()->create($request->validated());

        return response()->json($scooter, 201);
    }

    /**
     * Display the specified scooter.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $scooter = $request->user()
            ->scooters()
            ->with('rentals')
            ->findOrFail($id);

        return response()->json($scooter);
    }

    /**
     * Update the specified scooter.
     */
    public function update(UpdateScooterRequest $request, string $id): JsonResponse
    {
        $scooter = $request->user()
            ->scooters()
            ->findOrFail($id);

        $scooter->update($request->validated());

        return response()->json($scooter);
    }

    /**
     * Remove the specified scooter.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $scooter = $request->user()
            ->scooters()
            ->findOrFail($id);

        $scooter->delete();

        return response()->json([
            'message' => 'Scooter deleted successfully',
        ]);
    }
}
