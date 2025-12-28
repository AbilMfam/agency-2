<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            ['title' => 'فیلمبرداری', 'slug' => 'videography', 'icon' => 'Video', 'description' => 'فیلمبرداری حرفه‌ای با تجهیزات مدرن', 'image' => '/storage/services/videography.jpg', 'is_active' => true],
            ['title' => 'تدوین ویدیو', 'slug' => 'video-editing', 'icon' => 'Film', 'description' => 'تدوین حرفه‌ای ویدیوها', 'image' => '/storage/services/video-editing.jpg', 'is_active' => true],
            ['title' => 'موشن گرافیک', 'slug' => 'motion-graphics', 'icon' => 'Sparkles', 'description' => 'انیمیشن و موشن گرافیک', 'image' => '/storage/services/motion-graphics.jpg', 'is_active' => true],
            ['title' => 'عکاسی', 'slug' => 'photography', 'icon' => 'Camera', 'description' => 'عکاسی حرفه‌ای', 'image' => '/storage/services/photography.jpg', 'is_active' => true],
            ['title' => 'تولید محتوا', 'slug' => 'content-production', 'icon' => 'FileText', 'description' => 'تولید محتوای دیجیتال', 'image' => '/storage/services/content-production.jpg', 'is_active' => true],
            ['title' => 'سوشال مدیا', 'slug' => 'social-media', 'icon' => 'Share2', 'description' => 'مدیریت شبکه‌های اجتماعی', 'image' => '/storage/services/social-media.jpg', 'is_active' => true],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug' => $service['slug']], $service);
        }
    }
}
