<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::active()->orderBy('order')->get();
        return response()->json(['success' => true, 'data' => $members]);
    }

    public function adminIndex()
    {
        $members = TeamMember::orderBy('order')->get();
        return response()->json(['success' => true, 'data' => $members]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:team_members,slug',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'social_links' => 'nullable|array',
            'skills' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $member = TeamMember::create($validated);
        return response()->json(['success' => true, 'data' => $member], 201);
    }

    public function show(TeamMember $teamMember)
    {
        return response()->json(['success' => true, 'data' => $teamMember]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'nullable|string|unique:team_members,slug,' . $teamMember->id,
            'role' => 'sometimes|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'social_links' => 'nullable|array',
            'skills' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $teamMember->update($validated);
        return response()->json(['success' => true, 'data' => $teamMember]);
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return response()->json(['success' => true, 'message' => 'عضو تیم حذف شد']);
    }
}
