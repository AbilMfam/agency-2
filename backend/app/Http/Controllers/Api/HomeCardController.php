<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomeCard;
use Illuminate\Http\Request;

class HomeCardController extends Controller
{
    public function index(Request $request)
    {
        $query = HomeCard::query();

        if ($request->has('section')) {
            $query->bySection($request->section);
        }

        if (!$request->has('all')) {
            $query->active();
        }

        $cards = $query->orderBy('order')->get();

        return response()->json(['success' => true, 'data' => $cards]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'link' => 'nullable|string',
            'section' => 'nullable|string',
            'value' => 'nullable|string',
            'suffix' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $card = HomeCard::create($validated);

        return response()->json(['success' => true, 'message' => 'کارت ایجاد شد', 'data' => $card], 201);
    }

    public function show(HomeCard $homeCard)
    {
        return response()->json(['success' => true, 'data' => $homeCard]);
    }

    public function update(Request $request, HomeCard $homeCard)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'link' => 'nullable|string',
            'section' => 'nullable|string',
            'value' => 'nullable|string',
            'suffix' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        // Convert boolean strings
        if (isset($validated['is_active'])) {
            $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        $homeCard->update($validated);

        return response()->json(['success' => true, 'message' => 'کارت بروزرسانی شد', 'data' => $homeCard]);
    }

    public function destroy(HomeCard $homeCard)
    {
        $homeCard->delete();

        return response()->json(['success' => true, 'message' => 'کارت حذف شد']);
    }
}
