<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WebProject;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'mockup_image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
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

        // Handle file uploads
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/web-projects", $filename, 'public');
            $validated['image'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }

        if ($request->hasFile('mockup_image')) {
            $file = $request->file('mockup_image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/web-projects", $filename, 'public');
            $validated['mockup_image'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }

        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/web-projects", $filename, 'public');
                $gallery[] = Storage::disk('public')->url(str_replace('public/', '', $path));
            }
            $validated['gallery'] = json_encode($gallery);
        }

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
            'image' => 'nullable',
            'mockup_image' => 'nullable',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'technologies' => 'nullable',
            'features' => 'nullable',
            'results' => 'nullable',
            'link' => 'nullable|string',
            'testimonial' => 'nullable|string',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'gallery' => 'nullable',
            'order' => 'nullable|integer',
            'is_featured' => 'nullable',
            'is_active' => 'nullable',
        ]);
        
        // Parse JSON strings for array fields
        foreach (['technologies', 'features', 'results', 'gallery'] as $field) {
            if (isset($validated[$field]) && is_string($validated[$field])) {
                $decoded = json_decode($validated[$field], true);
                $validated[$field] = $decoded !== null ? $decoded : $validated[$field];
            }
        }
        
        // Convert boolean strings
        if (isset($validated['is_featured'])) {
            $validated['is_featured'] = filter_var($validated['is_featured'], FILTER_VALIDATE_BOOLEAN);
        }
        if (isset($validated['is_active'])) {
            $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        // Handle file uploads
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/web-projects", $filename, 'public');
            $validated['image'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }

        if ($request->hasFile('mockup_image')) {
            $file = $request->file('mockup_image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/web-projects", $filename, 'public');
            $validated['mockup_image'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }

        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/web-projects", $filename, 'public');
                $gallery[] = Storage::disk('public')->url(str_replace('public/', '', $path));
            }
            $validated['gallery'] = json_encode($gallery);
        }

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
