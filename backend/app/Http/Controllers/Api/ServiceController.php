<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Resources\ServiceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('active')) {
            $query->active();
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        $services = $query->orderBy('order')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => ServiceResource::collection($services),
        ]);
    }

    public function show(Service $service)
    {
        return response()->json([
            'success' => true,
            'data' => new ServiceResource($service),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'short_title' => 'nullable|string|max:100',
            'full_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048', // ✅ FIXED: Accept file instead of string
            'features' => 'nullable|array',
            'process' => 'nullable|array',
            'gallery' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        // ✅ FIXED: Handle file upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/services", $filename, 'public');
            $validated['image'] = '/storage/services/' . $filename;
            
            // Ensure public storage directory exists
            $publicDir = public_path('storage/services');
            if (!is_dir($publicDir)) {
                mkdir($publicDir, 0755, true);
            }
            
            // Copy file to public storage for web access
            $sourcePath = storage_path('app/public/services/' . $filename);
            $publicPath = public_path('storage/services/' . $filename);
            
            if (file_exists($sourcePath)) {
                copy($sourcePath, $publicPath);
            }
        }

        // ✅ FIXED: Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/services", $filename, 'public');
                $gallery[] = '/storage/services/' . $filename;
                
                // Ensure public storage directory exists
                $publicDir = public_path('storage/services');
                if (!is_dir($publicDir)) {
                    mkdir($publicDir, 0755, true);
                }
                
                // Copy file to public storage for web access
                $sourcePath = storage_path('app/public/services/' . $filename);
                $publicPath = public_path('storage/services/' . $filename);
                
                if (file_exists($sourcePath)) {
                    copy($sourcePath, $publicPath);
                }
            }
            $validated['gallery'] = json_encode($gallery);
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت ایجاد شد.',
            'data' => new ServiceResource($service),
        ], 201);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'short_title' => 'nullable|string|max:100',
            'full_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable',
            'features' => 'nullable',
            'process' => 'nullable',
            'gallery' => 'nullable',
            'order' => 'nullable|integer',
            'is_active' => 'nullable',
            'is_featured' => 'nullable',
        ]);

        // Parse JSON strings for array fields
        foreach (['features', 'process', 'gallery'] as $field) {
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

        // Handle file upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/services", $filename, 'public');
            $validated['image'] = '/storage/services/' . $filename;
            
            // Ensure public storage directory exists
            $publicDir = public_path('storage/services');
            if (!is_dir($publicDir)) {
                mkdir($publicDir, 0755, true);
            }
            
            // Copy file to public storage for web access
            $sourcePath = storage_path('app/public/services/' . $filename);
            $publicPath = public_path('storage/services/' . $filename);
            
            if (file_exists($sourcePath)) {
                copy($sourcePath, $publicPath);
            }
        }

        // ✅ FIXED: Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/services", $filename, 'public');
                $gallery[] = '/storage/services/' . $filename;
                
                // Ensure public storage directory exists
                $publicDir = public_path('storage/services');
                if (!is_dir($publicDir)) {
                    mkdir($publicDir, 0755, true);
                }
                
                // Copy file to public storage for web access
                $sourcePath = storage_path('app/public/services/' . $filename);
                $publicPath = public_path('storage/services/' . $filename);
                
                if (file_exists($sourcePath)) {
                    copy($sourcePath, $publicPath);
                }
            }
            $validated['gallery'] = json_encode($gallery);
        }

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت بروزرسانی شد.',
            'data' => new ServiceResource($service),
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت حذف شد.',
        ]);
    }
}
