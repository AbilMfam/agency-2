<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'slug', 'role', 'bio', 'image', 'email', 'phone',
        'social_links', 'skills', 'order', 'is_active'
    ];

    protected $casts = [
        'social_links' => 'array',
        'skills' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
