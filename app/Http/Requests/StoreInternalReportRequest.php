<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInternalReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $anonymous = $this->boolean('is_anonymous');

        $rules = [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => [$anonymous ? 'nullable' : 'required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'category' => ['required', 'string', 'in:general,process_improvement,workplace,policy,suggestion,other'],
            'description' => ['required', 'string', 'min:10', 'max:10000'],
            'attachment' => ['nullable', 'file', 'max:10240', 'mimes:pdf,jpg,jpeg,png,doc,docx'],
            'is_anonymous' => ['nullable', 'boolean'],
            'confirm_accurate' => ['required', 'accepted'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'category.required' => __('Please select a category.'),
            'category.in' => __('Please select a valid category.'),
            'description.required' => __('Please provide a description.'),
            'description.min' => __('Description must be at least 10 characters.'),
            'confirm_accurate.accepted' => __('Please confirm that the information provided is accurate.'),
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_anonymous' => $this->boolean('is_anonymous'),
        ]);
    }
}
