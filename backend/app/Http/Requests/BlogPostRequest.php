<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Parse JSON strings for array fields before validation
        $requestData = $this->all();
        \Log::info('Blog request data before parse:', $requestData);
        foreach (['tags'] as $field) {
            if (isset($requestData[$field]) && is_string($requestData[$field])) {
                $decoded = json_decode($requestData[$field], true);
                if ($decoded !== null) {
                    $this->merge([$field => $decoded]);
                    \Log::info("Parsed $field:", [$field => $decoded]);
                }
            }
        }
        \Log::info('Blog request data after parse:', $this->all());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH') || $this->has('_method');
        
        return [
            'title' => $isUpdate ? 'sometimes|required|string|max:255' : 'required|string|max:255',
            'slug' => $isUpdate ? 'sometimes|required|string|max:255|unique:blog_posts,slug,' . ($this->route('post')?->id ?? $this->route('post')) : 'required|string|max:255|unique:blog_posts',
            'excerpt' => $isUpdate ? 'sometimes|required|string|max:500' : 'required|string|max:500',
            'content' => $isUpdate ? 'sometimes|required|string' : 'required|string',
            'category' => $isUpdate ? 'sometimes|required|string|max:100' : 'required|string|max:100',
            'author' => 'nullable|string|max:255',
            'author_avatar' => 'nullable|string|max:255',
            'author_bio' => 'nullable|string|max:500',
            'thumbnail' => 'nullable|string|max:255',
            'featured_image_alt' => 'nullable|string|max:255',
            'featured_image_caption' => 'nullable|string|max:500',
            'read_time' => 'nullable|integer|min:1|max:60',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|url',
            'og_image' => 'nullable|string|max:255',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string|max:500',
            'allow_comments' => 'boolean',
            'content_blocks' => 'nullable|string',
            'scheduled_at' => 'nullable|date|after:now',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'عنوان مقاله الزامی است.',
            'title.max' => 'عنوان مقاله نباید بیشتر از 255 کاراکتر باشد.',
            'excerpt.required' => 'چکیده مقاله الزامی است.',
            'excerpt.max' => 'چکیده مقاله نباید بیشتر از 500 کاراکتر باشد.',
            'content.required' => 'محتوای مقاله الزامی است.',
            'category.required' => 'دسته‌بندی مقاله الزامی است.',
            'author.required' => 'نویسنده مقاله الزامی است.',
            'read_time.min' => 'زمان مطالعه باید حداقل 1 دقیقه باشد.',
            'read_time.max' => 'زمان مطالعه نباید بیشتر از 60 دقیقه باشد.',
            'tags.*.max' => 'هر تگ نباید بیشتر از 100 کاراکتر باشد.',
            'canonical_url.url' => 'URL کانونیک باید معتبر باشد.',
            'scheduled_at.after' => 'زمان انتشار باید در آینده باشد.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'عنوان',
            'excerpt' => 'چکیده',
            'content' => 'محتوا',
            'category' => 'دسته‌بندی',
            'author' => 'نویسنده',
            'author_avatar' => 'آواتار نویسنده',
            'author_bio' => 'بیوگرافی نویسنده',
            'thumbnail' => 'تصویر شاخص',
            'featured_image_alt' => 'متن جایگزین تصویر',
            'featured_image_caption' => 'کپشن تصویر',
            'read_time' => 'زمان مطالعه',
            'tags' => 'تگ‌ها',
            'is_published' => 'وضعیت انتشار',
            'is_featured' => 'مقاله ویژه',
            'meta_title' => 'عنوان سئو',
            'meta_description' => 'توضیحات سئو',
            'meta_keywords' => 'کلمات کلیدی سئو',
            'canonical_url' => 'URL کانونیک',
            'og_image' => 'تصویر اوگ',
            'og_title' => 'عنوان اوگ',
            'og_description' => 'توضیحات اوگ',
            'allow_comments' => 'اجازه کامنت',
            'scheduled_at' => 'زمان انتشار',
        ];
    }
}
