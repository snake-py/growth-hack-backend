<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateGoalRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string:255',
            'main_event' => 'required|string',
            'positive_related_events' => 'nullable|array',
            'negative_related_events' => 'nullable|array',
            'description' => 'nullable|string',
        ];
    }
}
