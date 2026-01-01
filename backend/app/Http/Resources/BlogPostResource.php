<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'content_blocks' => $this->content_blocks ? (is_array($this->content_blocks) ? $this->generateHtmlFromBlocks($this->content_blocks) : $this->content_blocks) : '',
            'thumbnail' => $this->thumbnail ? url($this->thumbnail) : null,
            'featured_image_alt' => $this->featured_image_alt,
            'featured_image_caption' => $this->featured_image_caption,
            'category' => $this->category,
            'category_name' => $this->getCategoryName(),
            'tags' => $this->whenLoaded('tagsRelation', function () {
                return $this->tagsRelation->pluck('name')->toArray();
            }, $this->tags ?? []),
            'author' => $this->author,
            'author_avatar' => $this->author_avatar ? url($this->author_avatar) : null,
            'author_bio' => $this->author_bio,
            'read_time' => $this->read_time ?? 5,
            'word_count' => $this->word_count ?? 0,
            'views' => $this->views ?? 0,
            'likes' => $this->likes ?? 0,
            'is_featured' => (bool) $this->is_featured,
            'is_published' => (bool) $this->is_published,
            'status' => $this->status ?? 'draft',
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'table_of_contents' => $this->table_of_contents ?? [],
            'show_toc' => $this->show_toc !== false,
            'published_at' => $this->published_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }

    /**
     * Generate HTML from content blocks array
     */
    protected function generateHtmlFromBlocks(array $blocks): string
    {
        $html = '';
        
        foreach ($blocks as $block) {
            if (isset($block['html']) && $block['html']) {
                $html .= $block['html'] . "\n";
            } elseif (isset($block['type'], $block['title'], $block['content'])) {
                // Generate HTML from block data
                $type = $block['type'] ?? 'emerald';
                $title = $block['title'] ?? '';
                $content = $block['content'] ?? '';
                
                $html .= '<div class="bg-' . $type . '-500/10 border-' . $type . '-500/30 border-r-4 rounded-xl p-5 my-6">';
                $html .= '<div class="flex items-start gap-3">';
                $html .= '<div class="flex-shrink-0 mt-0.5">';
                $html .= '<div class="w-5 h-5 bg-' . $type . '-500 rounded-full flex items-center justify-center">';
                $html .= '<div class="w-2 h-2 bg-white rounded-full"></div>';
                $html .= '</div>';
                $html .= '</div>';
                $html .= '<div class="flex-1">';
                if ($title) {
                    $html .= '<h4 class="font-bold text-' . $type . '-400 mb-2">' . $title . '</h4>';
                }
                if ($content) {
                    $html .= '<div class="text-dark-300 leading-relaxed">' . $content . '</div>';
                }
                $html .= '</div>';
                $html .= '</div>';
                $html .= '</div>';
                $html .= "\n";
            }
        }
        
        return $html;
    }

    /**
     * Get category display name
     */
    protected function getCategoryName(): string
    {
        $categories = [
            'marketing' => 'دیجیتال مارکتینگ',
            'content' => 'تولید محتوا',
            'social' => 'شبکه‌های اجتماعی',
            'video' => 'ویدیو مارکتینگ',
            'seo' => 'سئو',
            'branding' => 'برندینگ',
        ];

        return $categories[$this->category] ?? $this->category ?? 'عمومی';
    }
}
