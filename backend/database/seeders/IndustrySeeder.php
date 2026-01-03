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
        // Case 1: Find and update "Beauty" industry
        $beautyIndustry = Industry::where('slug', 'like', '%beauty%')
            ->orWhere('slug', 'medical-beauty')
            ->orWhere('title', 'like', '%سالن زیبایی%')
            ->orWhere('title', 'like', '%پزشکی و زیبایی%')
            ->first();

        if ($beautyIndustry) {
            $beautyIndustry->update([
                'title' => 'کلینیک زیبایی و سلامت',
                'slug' => 'beauty-clinic',
                'icon' => 'Heart',
                'description' => 'تولید محتوا برای کلینیک‌های زیبایی و سلامت',
                'is_active' => true
            ]);
        }

        // Case 2: Find and update "Fashion" industry
        $fashionIndustry = Industry::where('slug', 'fashion')
            ->orWhere('title', 'like', '%پوشاک و مد%')
            ->orWhere('title', 'like', '%مد و پوشاک%')
            ->first();

        if ($fashionIndustry) {
            $fashionIndustry->update([
                'title' => 'مد، پوشاک و استایل',
                'description' => 'تولید محتوا برای برندهای مد، پوشاک و استایل لباس',
                'is_active' => true
            ]);
        }

        // Case 3: Ensure required industries exist or update them
        $requiredIndustries = [
            [
                'title' => 'کافه و رستوران',
                'slug' => 'cafe-restaurant',
                'icon' => 'Coffee',
                'image' => '/storage/industries/cafe-restaurant.jpg',
                'description' => 'تولید محتوا برای کافه‌ها و رستوران‌ها'
            ],
            [
                'title' => 'پزشکان',
                'slug' => 'doctors',
                'icon' => 'Stethoscope',
                'color' => 'from-blue-500 to-cyan-500',
                'image' => '/storage/industries/medical.jpg',
                'description' => 'تولید محتوا برای مطب‌ها و کلینیک‌های پزشکان'
            ],
            [
                'title' => 'خودرو',
                'slug' => 'automotive',
                'icon' => 'Car',
                'image' => '/storage/industries/automotive.jpg',
                'description' => 'تولید محتوا برای نمایشگاه‌های خودرو'
            ],
            [
                'title' => 'ورزش و فیتنس',
                'slug' => 'sports-fitness',
                'icon' => 'Dumbbell',
                'color' => 'from-green-500 to-emerald-500',
                'image' => '/storage/industries/fitness.jpg',
                'description' => 'تولید محتوا برای باشگاه‌های ورزشی و مراکز فیتنس'
            ]
        ];

        foreach ($requiredIndustries as $industry) {
            Industry::updateOrCreate(
                ['slug' => $industry['slug']],
                array_merge($industry, ['is_active' => true])
            );
        }
    }
}
