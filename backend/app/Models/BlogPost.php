<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'user_id', 'title', 'slug', 'excerpt', 'content', 'category',
        'author', 'author_avatar', 'thumbnail', 'tags', 'read_time', 'views',
        'is_featured', 'is_published', 'published_at',
        'meta_title', 'meta_description', 'meta_keywords', 'canonical_url',
        'content_blocks', 'category_id', 'featured_image_alt', 'featured_image_caption',
        'word_count', 'status', 'scheduled_at', 'og_image', 'og_title', 'og_description',
        'likes', 'shares', 'allow_comments'
    ];

    protected $casts = [
        'tags' => 'array',
        'content_blocks' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'allow_comments' => 'boolean',
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'id';
    }

    protected $appends = ['reading_time_formatted'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categoryRelation()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public function images()
    {
        return $this->hasMany(BlogImage::class)->ordered();
    }

    public function tagsRelation()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                     ->where(function ($q) {
                         $q->whereNull('scheduled_at')
                           ->orWhere('scheduled_at', '<=', now());
                     });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function getReadingTimeFormattedAttribute()
    {
        $minutes = $this->read_time ?? 5;
        return $minutes . ' دقیقه مطالعه';
    }

    public function calculateReadTime()
    {
        $wordCount = str_word_count(strip_tags($this->content ?? ''));
        $this->word_count = $wordCount;
        $this->read_time = max(1, ceil($wordCount / 200));
        return $this;
    }

    public function extractAndSaveImages()
    {
        preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>/i', $this->content, $matches, PREG_SET_ORDER);
        
        $order = 0;
        foreach ($matches as $match) {
            BlogImage::updateOrCreate(
                ['blog_post_id' => $this->id, 'url' => $match[1]],
                [
                    'alt_text' => $match[2] ?? '',
                    'order' => $order++
                ]
            );
        }
    }

    public function getSeoData()
    {
        return [
            'title' => $this->meta_title ?: $this->title,
            'description' => $this->meta_description ?: $this->excerpt,
            'keywords' => $this->meta_keywords,
            'canonical' => $this->canonical_url,
            'og' => [
                'title' => $this->og_title ?: $this->title,
                'description' => $this->og_description ?: $this->excerpt,
                'image' => $this->og_image ?: $this->thumbnail,
            ],
            'article' => [
                'published_time' => $this->published_at?->toIso8601String(),
                'modified_time' => $this->updated_at?->toIso8601String(),
                'author' => $this->author,
                'section' => $this->category,
                'tags' => $this->tags,
            ],
        ];
    }
}
