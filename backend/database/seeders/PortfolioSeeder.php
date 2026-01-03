<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;
use App\Models\Service;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate portfolios table to remove all existing data
        Portfolio::truncate();

        // Get all services to use for categories
        $services = Service::all();

        $portfolios = [
            [
                'title' => 'طراحی سایت برای رستوران مدرن',
                'slug' => 'modern-restaurant-design',
                'description' => 'طراحی سایت مدرن و امین برای رستوران با تمرکز بر UX/UI مدرن، ریسپانسیو و بهینه‌سازی برای موبایل.',
                'category' => $services->random()->title,
                'type' => 'video',
                'thumbnail' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=800&h=600&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=1200&h=800&fit=crop',
                'video_url' => 'https://sample-videos.com/restaurant.mp4',
                'client' => 'رستوران مدرن',
                'industry' => 'رستوران',
                'views' => '15.2K',
                'growth' => '+250%',
                'services' => ['طراحی سایت', 'سئو'],
                'tags' => ['رستوران', 'طراحی سایت', 'مدرن'],
                'duration' => '3 ماه',
                'year' => '2024',
                'is_active' => true,
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'اپلیکیشن فروشگاهی',
                'slug' => 'fashion-ecommerce-app',
                'description' => 'اپلیکیشن کامل برای فروشگاهی مد با تمرکز بر UX مدرن و پرداخت امن.',
                'category' => $services->random()->title,
                'type' => 'video',
                'thumbnail' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=800&h=600&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=1200&h=800&fit=crop',
                'video_url' => 'https://sample-videos.com/ecommerce-app.mp4',
                'client' => 'مدرگاه مد',
                'industry' => 'مد',
                'views' => '8.5K',
                'growth' => '+180%',
                'services' => ['طراحی اپلیکیشن', 'فروشگاه آنلاین'],
                'tags' => ['اپلیکیشن', 'فروشگاه', 'موبایل'],
                'duration' => '4 ماه',
                'year' => '2024',
                'is_active' => true,
                'is_featured' => false,
                'order' => 2
            ],
            [
                'title' => 'برندینگ خودرویی',
                'slug' => 'car-dealership-website',
                'description' => 'وب‌سایت حرفه‌ای برای نمایشگاه خودرو با گالری تصاویر، مشخصات فنی و فرم تماس.',
                'category' => $services->random()->title,
                'type' => 'video',
                'thumbnail' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=800&h=600&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=1200&h=800&fit=crop',
                'video_url' => 'https://sample-videos.com/car-showcase.mp4',
                'client' => 'نمایشگاه خودرو',
                'industry' => 'خودرویی',
                'views' => '12.8K',
                'growth' => '+95%',
                'services' => ['طراحی سایت', 'برندینگ'],
                'tags' => ['خودرویی', 'وب‌سایت', 'برندینگ'],
                'duration' => '2 ماه',
                'year' => '2024',
                'is_active' => true,
                'is_featured' => false,
                'order' => 3
            ],
            [
                'title' => 'کمپین شبکه‌های اجتماعی برای سالن زیبایی',
                'slug' => 'beauty-salon-social-campaign',
                'description' => 'کمپین کامل اینستاگرام برای سالن زیبایی شامل تولید محتوا، مدیریت پیج و تبلیغات هدفمند.',
                'category' => $services->random()->title,
                'type' => 'video',
                'thumbnail' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=800&h=600&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=1200&h=800&fit=crop',
                'video_url' => 'https://sample-videos.com/beauty-campaign.mp4',
                'client' => 'سالن زیبایی',
                'industry' => 'زیبایی',
                'views' => '25.6K',
                'growth' => '+320%',
                'services' => ['اینستاگرام', 'کمپین شبکه‌های اجتماعی'],
                'tags' => ['اینستاگرام', 'کمپین', 'زیبایی'],
                'duration' => '6 ماه',
                'year' => '2024',
                'is_active' => true,
                'is_featured' => false,
                'order' => 4
            ],
            [
                'title' => 'وب‌سایت شرکتی آموزشگاه',
                'slug' => 'educational-platform',
                'description' => 'پلتفرم آموزش آنلاین با قابلیت‌های مدیریت دوره، ویدیوهای آموزشی و سیستم آزمون.',
                'category' => $services->random()->title,
                'type' => 'video',
                'thumbnail' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=800&h=600&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1556741555-1b4e9a5d3c3f6e6b?w=1200&h=800&fit=crop',
                'video_url' => 'https://sample-videos.com/educational-platform.mp4',
                'client' => 'موسسه آموزشی',
                'industry' => 'آموزشی',
                'views' => '45.3K',
                'growth' => '+150%',
                'services' => ['طراحی سایت', 'آموزشی'],
                'tags' => ['آموزشی', 'پلتفرم', 'آموزش آنلاین'],
                'duration' => '8 ماه',
                'year' => '2024',
                'is_active' => true,
                'is_featured' => false,
                'order' => 5
            ]
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }
    }
}
