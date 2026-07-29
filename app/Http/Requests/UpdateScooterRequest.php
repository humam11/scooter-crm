<?php

namespace App\Http\Requests;

use App\Enums\ScooterStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateScooterRequest extends FormRequest
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
                Rule::unique('scooters', 'id')->ignore($this->route('scooter')),
            ],

            'model' => [
                'sometimes',
                'string',
            ],

            'status' => [
                'sometimes',
                Rule::enum(ScooterStatus::class),
            ],

            'battery_level' => [
                'sometimes',
                'integer',
                'between:0,100',
            ],

            'latitude' => [
                'sometimes',
                'numeric',
                'between:-90,90',
            ],

            'longitude' => [
                'sometimes',
                'numeric',
                'between:-180,180',
            ],

            'last_updated' => [
                'nullable',
                'date',
            ],
        ];
    }
}
