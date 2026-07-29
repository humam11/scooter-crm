<?php

namespace App\Http\Requests;

use App\Enums\RentalStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRentalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => [
                'sometimes',
                'string',
                Rule::unique('rentals', 'id')->ignore($this->route('rental')),
            ],

            'scooter_id' => [
                'sometimes',
                'exists:scooters,id',
            ],

            'user_name' => [
                'sometimes',
                'string',
            ],

            'user_phone' => [
                'sometimes',
                'string',
            ],

            'start_time' => [
                'sometimes',
                'date',
            ],

            'end_time' => [
                'nullable',
                'date',
                'required_if:status,completed',
                'after:start_time',
            ],

            'status' => [
                'sometimes',
                Rule::enum(RentalStatus::class),
            ],
        ];
    }
}
