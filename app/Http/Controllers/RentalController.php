<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentalRequest;
use App\Http\Requests\UpdateRentalRequest;
use App\Models\Rental;
use App\Models\Scooter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    /**
     * Display a listing of rentals for the user's scooters.
     */
    public function index(Request $request): JsonResponse
    {
        $rentals = Rental::whereHas('scooter', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->with('scooter')->get();

        return response()->json($rentals);
    }

    /**
     * Store a newly created rental.
     */
    public function store(StoreRentalRequest $request): JsonResponse
    {
        // Verify the scooter belongs to the authenticated user
        $scooter = $request->user()
            ->scooters()
            ->findOrFail($request->scooter_id);

        // Check if scooter already has an active rental
        $activeRental = $scooter->rentals()
            ->where('status', 'active')
            ->first();

        if ($activeRental) {
            return response()->json([
                'message' => 'Scooter already has an active rental',
            ], 422);
        }

        $rental = Rental::create($request->validated());

        return response()->json($rental, 201);
    }

    /**
     * Display the specified rental.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $rental = Rental::whereHas('scooter', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->with('scooter')->findOrFail($id);

        return response()->json($rental);
    }

    /**
     * Update the specified rental.
     */
    public function update(UpdateRentalRequest $request, string $id): JsonResponse
    {
        $rental = Rental::whereHas('scooter', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($id);

        $rental->update($request->validated());

        return response()->json($rental);
    }

    /**
     * Remove the specified rental.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $rental = Rental::whereHas('scooter', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($id);

        $rental->delete();

        return response()->json([
            'message' => 'Rental deleted successfully',
        ]);
    }
}
