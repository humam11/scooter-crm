<?php

namespace App\Models;

use App\Enums\RentalStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $scooter_id
 * @property string $user_name
 * @property string $user_phone
 * @property Carbon $start_time
 * @property Carbon|null $end_time
 * @property RentalStatus $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Rental extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'scooter_id',
        'user_name',
        'user_phone',
        'start_time',
        'end_time',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => RentalStatus::class,
            'start_time' => 'datetime',
            'end_time' => 'datetime',
        ];
    }

    /**
     * Get the scooter that this rental belongs to.
     */
    public function scooter(): BelongsTo
    {
        return $this->belongsTo(Scooter::class);
    }
}
