<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Industry;

class IndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $industries = [
            ['title' => 'کافه و رستوران', 'slug' => 'cafe-restaurant', 'icon' => 'Coffee', 'image' => '/storage/industries/cafe-restaurant.jpg', 'description' => 'تولید محتوا برای کافه‌ها و رستوران‌ها', 'is_active' => true],
            ['title' => 'پزشکی و زیبایی', 'slug' => 'medical-beauty', 'icon' => 'Heart', 'image' => '/storage/industries/medical.jpg', 'description' => 'تولید محتوا برای کلینیک‌های پزشکی و زیبایی', 'is_active' => true],
            ['title' => 'پوشاک و مد', 'slug' => 'fashion', 'icon' => 'Shirt', 'image' => '/storage/industries/fashion.jpg', 'description' => 'تولید محتوا برای برندهای پوشاک و مد', 'is_active' => true],
            ['title' => 'خودرو', 'slug' => 'automotive', 'icon' => 'Car', 'image' => '/storage/industries/automotive.jpg', 'description' => 'تولید محتوا برای نمایشگاه‌های خودرو', 'is_active' => true],
            ['title' => 'ورزشی', 'slug' => 'sports', 'icon' => 'Dumbbell', 'image' => '/storage/industries/fitness.jpg', 'description' => 'تولید محتوا برای باشگاه‌های ورزشی', 'is_active' => true],
            ['title' => 'آموزشی', 'slug' => 'education', 'icon' => 'GraduationCap', 'image' => '/storage/industries/education.jpg', 'description' => 'تولید محتوا برای مراکز آموزشی', 'is_active' => true],
        ];

        foreach ($industries as $industry) {
            Industry::updateOrCreate(['slug' => $industry['slug']], $industry);
        }
    }
}
