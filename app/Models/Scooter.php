<?php

namespace App\Models;

use App\Enums\ScooterStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property int $user_id
 * @property string $model
 * @property ScooterStatus $status
 * @property int $battery_level
 * @property string $latitude
 * @property string $longitude
 * @property Carbon|null $last_updated
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Scooter extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'model',
        'status',
        'battery_level',
        'latitude',
        'longitude',
        'last_updated',
    ];

    protected function casts(): array
    {
        return [
            'status' => ScooterStatus::class,
            'battery_level' => 'integer',
            'last_updated' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the scooter.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the rentals for the scooter.
     */
    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    /**
     * Get the active rental for the scooter.
     */
    public function activeRental(): HasMany
    {
        return $this->hasMany(Rental::class)->where('status', 'active');
    }
}
