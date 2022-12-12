<?php

namespace App\Http\Requests;

use App\Models\Goal;
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
            'positive_related_events' => 'nullable|string',
            'negative_related_events' => 'nullable|string',
            'description' => 'nullable|string',
            'target_value' => 'nullable|numeric',
            'target_value_type' => 'nullable|string|in:' . implode(',', Goal::TARGET_VALUE_TYPES),
        ];
    }
}
