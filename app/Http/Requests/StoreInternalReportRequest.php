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
            'category' => ['required', 'string', 'in:general,process_improvement,workplace,safety,harassment,policy,management,facilities,ethics,suggestion,other'],
            'description' => ['required', 'string', 'min:10', 'max:10000'],
            'attachment' => [
                'nullable',
                'file',
                'max:10240',
                'mimetypes:image/jpeg,image/pjpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
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
            'attachment.file' => __('The attachment must be a file.'),
            'attachment.mimes' => __('Attachment must be PDF, JPG, PNG, DOC or DOCX.'),
            'attachment.mimetypes' => __('Attachment must be PDF, JPG, PNG, DOC or DOCX.'),
            'attachment.max' => __('Attachment must not exceed 10 MB.'),
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_anonymous' => $this->boolean('is_anonymous'),
        ]);
    }
}
