<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WebProject;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WebProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = WebProject::query();

        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if (!$request->has('all')) {
            $query->active();
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        $projects = $query->orderBy('order')->orderBy('created_at', 'desc')->get();

        return response()->json(['success' => true, 'data' => $projects]);
    }

    public function show($slug)
    {
        $project = WebProject::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();

        return response()->json(['success' => true, 'data' => $project]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:web_projects,slug',
            'type' => 'required|string|in:website,app,seo,ecommerce,webapp',
            'category' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|string',
            'mockup_image' => 'nullable|string',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'technologies' => 'nullable|array',
            'features' => 'nullable|array',
            'results' => 'nullable|array',
            'link' => 'nullable|string|url',
            'testimonial' => 'nullable|string',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'gallery' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $project = WebProject::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'پروژه ایجاد شد',
            'data' => $project
        ], 201);
    }

    public function update(Request $request, WebProject $webProject)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'nullable|string|unique:web_projects,slug,' . $webProject->id,
            'type' => 'sometimes|string|in:website,app,seo,ecommerce,webapp',
            'category' => 'sometimes|string|max:255',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|string',
            'mockup_image' => 'nullable|string',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'technologies' => 'nullable|array',
            'features' => 'nullable|array',
            'results' => 'nullable|array',
            'link' => 'nullable|string',
            'testimonial' => 'nullable|string',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'gallery' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $webProject->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'پروژه بروزرسانی شد',
            'data' => $webProject
        ]);
    }

    public function destroy(WebProject $webProject)
    {
        $webProject->delete();

        return response()->json([
            'success' => true,
            'message' => 'پروژه حذف شد'
        ]);
    }

    public function types()
    {
        $types = [
            ['id' => 'all', 'title' => 'همه', 'icon' => 'Palette'],
            ['id' => 'website', 'title' => 'وب‌سایت', 'icon' => 'Globe'],
            ['id' => 'app', 'title' => 'اپلیکیشن', 'icon' => 'Smartphone'],
            ['id' => 'ecommerce', 'title' => 'فروشگاه', 'icon' => 'ShoppingCart'],
            ['id' => 'seo', 'title' => 'سئو', 'icon' => 'Search'],
            ['id' => 'webapp', 'title' => 'وب اپ', 'icon' => 'Code'],
        ];

        return response()->json(['success' => true, 'data' => $types]);
    }
}
