<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reel;
use Illuminate\Http\Request;

class ReelController extends Controller
{
    public function index(Request $request)
    {
        $query = Reel::query();

        if ($request->has('type')) {
            $query->where('video_type', $request->type);
        }

        if (!$request->has('all')) {
            $query->active();
        }

        $reels = $query->orderBy('order')->get();

        return response()->json(['success' => true, 'data' => $reels]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|string',
            'video_url' => 'nullable|string',
            'video_type' => 'nullable|string|in:vertical,horizontal',
            'views' => 'nullable|string',
            'likes' => 'nullable|string',
            'comments' => 'nullable|string',
            'gradient' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $reel = Reel::create($validated);

        return response()->json(['success' => true, 'message' => 'ریلز ایجاد شد', 'data' => $reel], 201);
    }

    public function show(Reel $reel)
    {
        return response()->json(['success' => true, 'data' => $reel]);
    }

    public function update(Request $request, Reel $reel)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'thumbnail' => 'nullable|string',
            'video_url' => 'nullable|string',
            'video_type' => 'nullable|string|in:vertical,horizontal',
            'views' => 'nullable|string',
            'likes' => 'nullable|string',
            'comments' => 'nullable|string',
            'gradient' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        // Convert boolean strings
        if (isset($validated['is_active'])) {
            $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        $reel->update($validated);

        return response()->json(['success' => true, 'message' => 'ریلز بروزرسانی شد', 'data' => $reel]);
    }

    public function destroy(Reel $reel)
    {
        $reel->delete();

        return response()->json(['success' => true, 'message' => 'ریلز حذف شد']);
    }
}
