<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSiteRequest extends FormRequest
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
            'url' => 'required|string',
            'allow_subdomains' => 'required|boolean',
            'database_name' => 'required|string',
            'database_user' => 'required|string',
            'database_password' => 'required|string',
            'database_host' => 'required|string',
            'database_port' => 'required|string',
        ];
    }
}
