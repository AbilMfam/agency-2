<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\BlogPostCollection;
use App\Http\Requests\BlogPostRequest;
use App\Services\BlogService;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    protected BlogService $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function index(Request $request): BlogPostCollection
    {
        $filters = $request->only(['category', 'tag', 'search', 'featured']);
        $perPage = $request->get('per_page', 12);
        
        $posts = $this->blogService->getPublishedPosts($filters, $perPage);
        
        return new BlogPostCollection($posts);
    }
    
    public function show($param): BlogPostResource
    {
        // Handle both slug and id
        if (is_numeric($param)) {
            $post = BlogPost::findOrFail($param);
        } else {
            $post = BlogPost::where('slug', $param)
                           ->where('is_published', true)
                           ->with(['categoryRelation', 'tagsRelation'])
                           ->firstOrFail();
        }
        
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'مقاله یافت نشد'
            ], 404);
        }
        
        // Increment views
        $this->blogService->incrementViews($post);
        
        return new BlogPostResource($post);
    }
    
    public function store(BlogPostRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            \Log::info('=== Starting blog post creation ===');
            \Log::info('Request data: ' . json_encode($request->all()));
            
            // 1. Create and Save post FIRST
            $post = BlogPost::create([
                'title' => $request->title,
                'slug' => $request->slug ?? Str::slug($request->title),
                'excerpt' => $request->excerpt,
                'content' => $request->content,
                'category' => $request->category,
                'author' => $request->author ?? 'ادمین',
                'author_avatar' => $request->author_avatar,
                'thumbnail' => $request->thumbnail, // Will be updated if file uploaded
                'read_time' => $request->read_time,
                'is_featured' => $request->is_featured ?? false,
                'is_published' => $request->is_published ?? false,
                'published_at' => $request->published_at,
                'user_id' => auth()->id(),
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'meta_keywords' => $request->meta_keywords,
                'canonical_url' => $request->canonical_url,
                'category_id' => $request->category_id,
                'featured_image_alt' => $request->featured_image_alt,
                'featured_image_caption' => $request->featured_image_caption,
                'status' => $request->status ?? 'draft',
                'scheduled_at' => $request->scheduled_at,
                'og_image' => $request->og_image,
                'og_title' => $request->og_title,
                'og_description' => $request->og_description,
                'allow_comments' => $request->allow_comments ?? true,
            ]);

            // Refresh برای اطمینان از وجود ID
            $post->refresh();
            \Log::info('Post created with ID: ' . $post->id);
            \Log::info('Post exists: ' . ($post->exists ? 'true' : 'false'));

            // Calculate word count and read time
            $wordCount = $this->blogService->calculateWordCount($post->content);
            $post->update([
                'word_count' => $wordCount,
                'read_time' => $post->read_time ?? $this->blogService->calculateReadTime($wordCount),
            ]);

            // 2. Upload Image (if exists) and update post
            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('blog', 'public');
                $post->update(['thumbnail' => $path]);
                \Log::info('Thumbnail uploaded: ' . $path);
            }

            // 3. Sync Tags (NOW the post has an ID, so this will work)
            if ($request->has('tags') && !empty($request->tags)) {
                // Handle both comma-separated string or array
                $tags = is_string($request->tags) 
                    ? array_filter(explode(',', $request->tags))
                    : array_filter($request->tags);
                
                \Log::info('Tags to sync: ' . json_encode($tags));
                \Log::info('Post ID before sync: ' . $post->id);
                \Log::info('Post exists before sync: ' . ($post->exists ? 'true' : 'false'));
                
                // Ensure we have a fresh post object from database
                $freshPost = BlogPost::find($post->id);
                if (!$freshPost || !$freshPost->id) {
                    throw new \Exception('Post not found in database after creation');
                }
                
                $this->syncTags($freshPost, $tags);
            }
            
            DB::commit();
            
            // Clear cache
            $this->blogService->clearCache();
            
            return response()->json([
                'success' => true,
                'data' => new BlogPostResource($post->load(['categoryRelation', 'tagsRelation'])),
                'message' => 'مقاله با موفقیت ایجاد شد',
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error creating blog post: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'خطا در ایجاد مقاله',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function update(BlogPostRequest $request, BlogPost $post): JsonResponse
    {
        DB::beginTransaction();
        try {
            \Log::info('=== Starting blog post update ===');
            \Log::info('Post ID: ' . $post->id);
            \Log::info('Request data: ' . json_encode($request->all()));
            \Log::info('content_blocks: ' . json_encode($request->input('content_blocks')));
            \Log::info('content_blocks type: ' . gettype($request->input('content_blocks')));

            // 1. Update basic fields
            $updateData = $request->except(['tags', 'thumbnail', '_method']);
            
            // Handle JSON arrays (for JSON requests)
            foreach (['tags'] as $field) {
                if (isset($updateData[$field]) && is_string($updateData[$field])) {
                    $decoded = json_decode($updateData[$field], true);
                    if ($decoded !== null) {
                        $updateData[$field] = $decoded;
                    }
                }
            }
            
            // Handle HTML string for content_blocks - store as-is to preserve encoding
            if (isset($updateData['content_blocks']) && is_string($updateData['content_blocks'])) {
                \Log::info('Processing content_blocks HTML string');
                $html = $updateData['content_blocks'];
                
                // Parse using regex to preserve UTF-8 encoding
                $blocks = [];
                
                // Match individual callout divs with their full HTML
                if (preg_match_all('/<div[^>]*class="[^"]*bg-(\w+)-500\/10[^"]*"[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/s', $html, $divMatches, PREG_SET_ORDER)) {
                    foreach ($divMatches as $divMatch) {
                        $divHtml = $divMatch[0];
                        
                        // Extract type, title, and content from this specific div
                        if (preg_match('/bg-(\w+)-500\/10/', $divHtml, $typeMatch) &&
                            preg_match('/<h4[^>]*>([^<]*)<\/h4>/', $divHtml, $titleMatch) &&
                            preg_match('/<div[^>]*class="[^"]*text-dark-300[^"]*"[^>]*>([^<]*)<\/div>/', $divHtml, $contentMatch)) {
                            
                            $blocks[] = [
                                'type' => $typeMatch[1],
                                'title' => trim($titleMatch[1]),
                                'content' => trim($contentMatch[1]),
                                'html' => $divHtml
                            ];
                        }
                    }
                }
                
                // If no matches found, store the raw HTML as a single block
                if (empty($blocks) && !empty(trim($html))) {
                    $blocks[] = [
                        'type' => 'emerald',
                        'title' => '',
                        'content' => '',
                        'html' => $html
                    ];
                }
                
                \Log::info('Final blocks array: ' . json_encode($blocks, JSON_UNESCAPED_UNICODE));
                $updateData['content_blocks'] = $blocks;
            }
            
            // Handle content-related fields
            if (isset($updateData['content'])) {
                $wordCount = $this->blogService->calculateWordCount($updateData['content']);
                $updateData['word_count'] = $wordCount;
                $updateData['read_time'] = $this->blogService->calculateReadTime($wordCount);
            }
            
            $post->update($updateData);
            $post->refresh();

            // 2. Handle Image
            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('blog', 'public');
                $post->update(['thumbnail' => $path]);
                $post->refresh();
            }

            // 3. Sync Tags
            if ($request->has('tags')) {
                $tags = $request->tags;
                
                // Handle JSON string from FormData
                if (is_string($tags)) {
                    $decoded = json_decode($tags, true);
                    if ($decoded !== null) {
                        $tags = $decoded;
                    } else {
                        // Handle comma-separated string
                        $tags = explode(',', $tags);
                    }
                }
                
                $tags = array_filter($tags, function($tag) {
                    return !empty($tag) && is_string($tag);
                }); // Remove empty values
                
                if (!empty($tags)) {
                    $this->syncTags($post, $tags);
                } else {
                    // Clear all tags if empty array
                    $post->tagsRelation()->detach();
                }
            }
            
            DB::commit();
            
            // Clear cache
            $this->blogService->clearCache($post->slug);
            
            return response()->json([
                'success' => true,
                'data' => new BlogPostResource($post->load(['categoryRelation', 'tagsRelation'])),
                'message' => 'مقاله با موفقیت ویرایش شد',
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error updating blog post: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'خطا در ویرایش مقاله',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Sync tags with blog post
     */
    protected function syncTags(BlogPost $post, array $tags): void
    {
        \Log::info("Syncing tags for post ID: {$post->id}");
        \Log::info('Tags array: ' . json_encode($tags));
        
        $tagIds = [];
        
        foreach ($tags as $tagName) {
            $tagName = trim($tagName);
            
            if (empty($tagName)) {
                \Log::warning('Empty tag name skipped');
                continue;
            }
            
            $slug = Str::slug($tagName);
            
            $tag = BlogTag::firstOrCreate(
                ['slug' => $slug],
                ['name' => $tagName]
            );
            
            \Log::info("Tag processed: ID={$tag->id}, Name={$tag->name}, Slug={$slug}");
            $tagIds[] = $tag->id;
        }
        
        if (empty($tagIds)) {
            \Log::warning('No valid tags to sync');
            return;
        }
        
        \Log::info('Tag IDs to sync: ' . json_encode($tagIds));
        
        try {
            // Ensure post has an ID before syncing
            if (!$post->id) {
                \Log::error('Post ID is null, cannot sync tags');
                throw new \Exception('Post ID is null');
            }
            
            \Log::info("About to sync tags for post ID: {$post->id} with tag IDs: " . json_encode($tagIds));
            $post->tagsRelation()->sync($tagIds);
            \Log::info('Tags synced successfully for post ' . $post->id);
        } catch (\Exception $e) {
            \Log::error('Failed to sync tags: ' . $e->getMessage());
            \Log::error('Post ID: ' . ($post->id ?? 'NULL'));
            \Log::error('Exception: ' . $e->getTraceAsString());
            throw $e;
        }
    }
    
    private function extractCalloutType($class)
    {
        if (strpos($class, 'emerald') !== false) return 'emerald';
        if (strpos($class, 'blue') !== false) return 'blue';
        if (strpos($class, 'yellow') !== false) return 'yellow';
        if (strpos($class, 'red') !== false) return 'red';
        if (strpos($class, 'green') !== false) return 'green';
        return 'emerald'; // default
    }
    
    private function extractTextContent($element, $tagName)
    {
        $elements = $element->getElementsByTagName($tagName);
        if ($elements->length > 0) {
            return $elements->item(0)->textContent;
        }
        return '';
    }
    
    public function destroy(BlogPost $post): JsonResponse
    {
        $post->delete();
        
        // Clear cache
        $this->blogService->clearCache($post->slug);
        
        return response()->json([
            'success' => true,
            'message' => 'مقاله با موفقیت حذف شد',
        ]);
    }
    
    /**
     * Increment post views
     */
    public function incrementViews(BlogPost $post): JsonResponse
    {
        $views = $this->blogService->incrementViews($post);
        
        return response()->json([
            'success' => true,
            'data' => [
                'views' => $post->fresh()->views
            ],
            'message' => 'Views incremented successfully',
        ]);
    }
    
    /**
     * Toggle like on post
     */
    public function toggleLike(BlogPost $post): JsonResponse
    {
        $likes = $this->blogService->toggleLike($post);
        
        return response()->json([
            'success' => true,
            'data' => [
                'likes' => $likes,
                'liked' => true
            ],
            'message' => 'Like toggled successfully',
        ]);
    }
    
    /**
     * Get related posts
     */
    public function relatedPosts(BlogPost $post): JsonResponse
    {
        $relatedPosts = $this->blogService->getRelatedPosts($post);
        
        return response()->json([
            'success' => true,
            'data' => BlogPostResource::collection($relatedPosts),
        ]);
    }
    
    public function adminIndex(Request $request): JsonResponse
    {
        $query = BlogPost::query();
        
        // Filter by category
        if ($request->category) {
            $query->where('category', $request->category);
        }
        
        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
            });
        }
        
        $posts = $query->orderBy('created_at', 'desc')
                      ->paginate($request->per_page ?? 20);
        
        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }
    
    public function categories(): JsonResponse
    {
        $categories = BlogCategory::active()->ordered()->get();
        
        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $category = BlogCategory::create($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category created successfully',
        ], 201);
    }

    public function updateCategory(Request $request, BlogCategory $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category updated successfully',
        ]);
    }

    public function destroyCategory(BlogCategory $category): JsonResponse
    {
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    public function tags(): JsonResponse
    {
        $tags = BlogTag::withCount('posts')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $tags,
        ]);
    }

    public function storeTag(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $tag = BlogTag::firstOrCreate(
            ['slug' => $validated['slug']],
            $validated
        );

        return response()->json([
            'success' => true,
            'data' => $tag,
        ]);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|max:5120',
            'blog_post_id' => 'nullable|exists:blog_posts,id',
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $path = $file->store('blog/images', 'public');
        $url = '/storage/' . $path;

        $imageData = [
            'url' => $url,
            'alt_text' => $request->alt_text,
            'title' => $request->title,
            'caption' => $request->caption,
            'width' => null,
            'height' => null,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];

        if ($dimensions = @getimagesize($file->getRealPath())) {
            $imageData['width'] = $dimensions[0];
            $imageData['height'] = $dimensions[1];
        }

        if ($request->blog_post_id) {
            $imageData['blog_post_id'] = $request->blog_post_id;
            $image = BlogImage::create($imageData);
        }

        return response()->json([
            'success' => true,
            'url' => $url,
            'data' => $imageData,
            'message' => 'Image uploaded successfully',
        ]);
    }

    public function updateImage(Request $request, BlogImage $image): JsonResponse
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $image->update($validated);

        return response()->json([
            'success' => true,
            'data' => $image,
            'message' => 'Image updated successfully',
        ]);
    }

    public function destroyImage(BlogImage $image): JsonResponse
    {
        if ($image->url && str_starts_with($image->url, '/storage/')) {
            $path = str_replace('/storage/', '', $image->url);
            Storage::disk('public')->delete($path);
        }

        $image->delete();

        return response()->json([
            'success' => true,
            'message' => 'Image deleted successfully',
        ]);
    }

    public function getPostImages(BlogPost $post): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $post->images,
        ]);
    }

    public function seoData(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post->getSeoData(),
        ]);
    }
}
