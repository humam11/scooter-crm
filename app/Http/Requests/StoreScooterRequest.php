<?php

namespace App\Http\Requests;

use App\Enums\ScooterStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreScooterRequest extends FormRequest
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
                'unique:scooters,id',
            ],

            'model' => [
                'required',
                'string',
            ],

            'status' => [
                'required',
                Rule::enum(ScooterStatus::class),
            ],

            'battery_level' => [
                'required',
                'integer',
                'between:0,100',
            ],

            'latitude' => [
                'required',
                'numeric',
                'between:-90,90',
            ],

            'longitude' => [
                'required',
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
