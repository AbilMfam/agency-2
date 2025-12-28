<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WebProject extends Model
{
    protected $fillable = [
        'title', 'slug', 'type', 'category', 'icon', 'color',
        'image', 'mockup_image', 'description', 'client', 'industry',
        'year', 'technologies', 'features', 'results', 'link',
        'testimonial', 'challenge', 'solution', 'gallery',
        'order', 'is_featured', 'is_active'
    ];

    protected $casts = [
        'technologies' => 'array',
        'features' => 'array',
        'results' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
