<?php

namespace App\Http\Requests;

use App\Enums\RentalStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRentalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => [
                'required',
                'string',
                'unique:rentals,id',
            ],

            'scooter_id' => [
                'required',
                'exists:scooters,id',
            ],

            'user_name' => [
                'required',
                'string',
            ],

            'user_phone' => [
                'required',
                'string',
            ],

            'start_time' => [
                'required',
                'date',
            ],

            'end_time' => [
                'nullable',
                'date',
                'required_if:status,completed',
                'after:start_time',
            ],

            'status' => [
                'required',
                Rule::enum(RentalStatus::class),
            ],
        ];
    }
}
