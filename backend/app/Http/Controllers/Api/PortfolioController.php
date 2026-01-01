<?php

namespace App\Http\Controllers\Api;

use App\Models\Portfolio;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = Portfolio::query();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        if ($request->has('featured')) {
            $query->featured();
        }
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $portfolios = $query->active()->orderBy('order')->get();

        return response()->json(['success' => true, 'data' => PortfolioResource::collection($portfolios)]);
    }

    public function store(Request $request)
    {
        try {
            // First, parse JSON strings for array fields
            $requestData = $request->all();
            foreach (['tags', 'services', 'gallery'] as $field) {
                if (isset($requestData[$field]) && is_string($requestData[$field])) {
                    $decoded = json_decode($requestData[$field], true);
                    $requestData[$field] = $decoded !== null ? $decoded : $requestData[$field];
                }
            }
            
            $validated = validator()->make($requestData, [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'category' => 'required|string',
                'type' => 'nullable|string',
                'thumbnail' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048',
                'video_url' => 'nullable|string',
                'gallery' => 'nullable|array',
                'client_name' => 'nullable|string',
                'industry' => 'nullable|string',
                'views' => 'nullable|string',
                'growth' => 'nullable|string',
                'tags' => 'nullable|array',
                'is_featured' => 'boolean',
                'is_active' => 'boolean',
                'order' => 'nullable|integer',
            ])->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $validated['slug'] = Str::slug($validated['title']);
        
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/portfolios", $filename, 'public');
            $validated['thumbnail'] = '/storage/portfolios/' . $filename;
            
            // Ensure public storage directory exists
            $publicDir = public_path('storage/portfolios');
            if (!is_dir($publicDir)) {
                mkdir($publicDir, 0755, true);
            }
            
            // Copy file to public storage for web access
            $sourcePath = storage_path('app/public/portfolios/' . $filename);
            $publicPath = public_path('storage/portfolios/' . $filename);
            
            if (file_exists($sourcePath)) {
                copy($sourcePath, $publicPath);
            }
        }
        
        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/portfolios", $filename, 'public');
                $gallery[] = '/storage/portfolios/' . $filename;
                
                // Ensure public storage directory exists
                $publicDir = public_path('storage/portfolios');
                if (!is_dir($publicDir)) {
                    mkdir($publicDir, 0755, true);
                }
                
                // Copy file to public storage for web access
                $sourcePath = storage_path('app/public/portfolios/' . $filename);
                $publicPath = public_path('storage/portfolios/' . $filename);
                
                if (file_exists($sourcePath)) {
                    copy($sourcePath, $publicPath);
                }
            }
            $validated['gallery'] = json_encode($gallery);
        }
        
        $portfolio = Portfolio::create($validated);

        return response()->json(['success' => true, 'message' => 'نمونه کار ایجاد شد.', 'data' => new PortfolioResource($portfolio)], 201);
    }

    public function show(Portfolio $portfolio)
    {
        return response()->json(['success' => true, 'data' => new PortfolioResource($portfolio)]);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        try {
            // First, parse JSON strings for array fields
            $requestData = $request->all();
            foreach (['tags', 'services', 'gallery'] as $field) {
                if (isset($requestData[$field]) && is_string($requestData[$field])) {
                    $decoded = json_decode($requestData[$field], true);
                    $requestData[$field] = $decoded !== null ? $decoded : $requestData[$field];
                }
            }
            
            $validated = validator()->make($requestData, [
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'category' => 'sometimes|string',
                'type' => 'nullable|string',
                'thumbnail' => 'nullable|string',
                'video_url' => 'nullable|string',
                'gallery' => 'nullable|array',
                'client_name' => 'nullable|string',
                'industry' => 'nullable|string',
                'views' => 'nullable|string',
                'growth' => 'nullable|string',
                'tags' => 'nullable|array',
                'is_featured' => 'sometimes|boolean',
                'is_active' => 'sometimes|boolean',
                'order' => 'nullable|integer',
            ])->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Portfolio update validation failed:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        // Parse JSON strings for array fields
        foreach (['tags', 'services', 'gallery'] as $field) {
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
        
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/portfolios", $filename, 'public');
            $validated['thumbnail'] = '/storage/portfolios/' . $filename;
            
            // Ensure public storage directory exists
            $publicDir = public_path('storage/portfolios');
            if (!is_dir($publicDir)) {
                mkdir($publicDir, 0755, true);
            }
            
            // Copy file to public storage for web access
            $sourcePath = storage_path('app/public/portfolios/' . $filename);
            $publicPath = public_path('storage/portfolios/' . $filename);
            
            if (file_exists($sourcePath)) {
                copy($sourcePath, $publicPath);
            }
        }
        
        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/portfolios", $filename, 'public');
                $gallery[] = '/storage/portfolios/' . $filename;
                
                // Ensure public storage directory exists
                $publicDir = public_path('storage/portfolios');
                if (!is_dir($publicDir)) {
                    mkdir($publicDir, 0755, true);
                }
                
                // Copy file to public storage for web access
                $sourcePath = storage_path('app/public/portfolios/' . $filename);
                $publicPath = public_path('storage/portfolios/' . $filename);
                
                if (file_exists($sourcePath)) {
                    copy($sourcePath, $publicPath);
                }
            }
            $validated['gallery'] = json_encode($gallery);
        }

        $portfolio->update($validated);
        return response()->json(['success' => true, 'message' => 'نمونه کار بروزرسانی شد.', 'data' => new PortfolioResource($portfolio)]);
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->json(['success' => true, 'message' => 'نمونه کار حذف شد.']);
    }
}
