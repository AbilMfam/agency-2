<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebProject;

class WebProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'وب‌سایت کافه لمیز',
                'slug' => 'cafe-lamiz-website',
                'type' => 'website',
                'category' => 'طراحی سایت',
                'icon' => 'Globe',
                'color' => 'from-amber-500 to-orange-500',
                'image' => '/storage/web-projects/cafe-lamiz.jpg',
                'description' => 'طراحی وب‌سایت مدرن و واکنش‌گرا برای کافه لمیز با سیستم رزرو آنلاین و منوی دیجیتال',
                'client' => 'کافه لمیز',
                'industry' => 'کافه و رستوران',
                'year' => '1402',
                'technologies' => ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
                'features' => ['رزرو آنلاین میز', 'منوی دیجیتال', 'سیستم امتیازدهی', 'پنل مدیریت'],
                'results' => ['افزایش رزرو' => '+180%', 'کاهش تماس' => '-60%', 'رضایت مشتری' => '95%'],
                'challenge' => 'کافه لمیز نیاز به سیستمی داشت که مشتریان بتوانند به راحتی میز رزرو کنند و منو را آنلاین ببینند.',
                'solution' => 'ما یک وب‌سایت مدرن با سیستم رزرو یکپارچه و منوی دیجیتال طراحی کردیم که تجربه کاربری عالی ارائه می‌دهد.',
                'testimonial' => 'این وب‌سایت کسب‌وکار ما را متحول کرد. رزروها افزایش یافت و مدیریت آسان‌تر شد.',
                'link' => 'https://cafelamiz.ir',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'فروشگاه دیجی‌استایل',
                'slug' => 'digistyle-shop',
                'type' => 'ecommerce',
                'category' => 'فروشگاه آنلاین',
                'icon' => 'ShoppingCart',
                'color' => 'from-purple-500 to-pink-500',
                'image' => '/storage/web-projects/digistyle.jpg',
                'description' => 'فروشگاه آنلاین پوشاک با سیستم فیلتر پیشرفته، سبد خرید هوشمند و درگاه پرداخت امن',
                'client' => 'دیجی‌استایل',
                'industry' => 'پوشاک و مد',
                'year' => '1402',
                'technologies' => ['Next.js', 'Laravel', 'MySQL', 'Redis'],
                'features' => ['فیلتر پیشرفته', 'سبد خرید هوشمند', 'درگاه پرداخت', 'پنل فروشنده'],
                'results' => ['افزایش فروش' => '+320%', 'نرخ تبدیل' => '+45%', 'سرعت سایت' => '98/100'],
                'challenge' => 'دیجی‌استایل نیاز به فروشگاهی سریع و کاربرپسند با قابلیت مدیریت هزاران محصول داشت.',
                'solution' => 'فروشگاه با معماری مدرن و کش هوشمند طراحی شد که حتی با ترافیک بالا سریع باقی می‌ماند.',
                'testimonial' => 'فروش ما ۳ برابر شد و مشتریان از سرعت و راحتی خرید راضی هستند.',
                'link' => 'https://digistyle.ir',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'اپلیکیشن کلینیک رز',
                'slug' => 'clinic-rose-app',
                'type' => 'webapp',
                'category' => 'وب اپلیکیشن',
                'icon' => 'Smartphone',
                'color' => 'from-rose-500 to-red-500',
                'image' => '/storage/web-projects/clinic-rose.jpg',
                'description' => 'وب اپلیکیشن نوبت‌دهی آنلاین با پنل پزشک و بیمار، یادآور SMS و پرونده الکترونیک',
                'client' => 'کلینیک رز',
                'industry' => 'پزشکی',
                'year' => '1403',
                'technologies' => ['Vue.js', 'Django', 'PostgreSQL', 'Docker'],
                'features' => ['نوبت‌دهی آنلاین', 'پرونده الکترونیک', 'یادآور SMS', 'گزارش‌گیری'],
                'results' => ['کاهش نوبت از دست رفته' => '-70%', 'رضایت بیمار' => '92%', 'صرفه‌جویی زمان' => '5 ساعت/روز'],
                'challenge' => 'کلینیک با مشکل نوبت‌های از دست رفته و مدیریت دستی پرونده‌ها مواجه بود.',
                'solution' => 'سیستم نوبت‌دهی هوشمند با یادآور خودکار و پرونده الکترونیک یکپارچه طراحی شد.',
                'testimonial' => 'این سیستم کار ما را بسیار راحت‌تر کرد و بیماران هم راضی‌تر هستند.',
                'link' => 'https://clinicrose.ir',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'سایت شرکتی نوآوران',
                'slug' => 'noavaran-corporate',
                'type' => 'website',
                'category' => 'سایت شرکتی',
                'icon' => 'Globe',
                'color' => 'from-blue-500 to-indigo-500',
                'image' => '/storage/web-projects/cafe-lamiz.jpg',
                'description' => 'وب‌سایت شرکتی مدرن با معرفی خدمات، تیم و نمونه‌کارها',
                'client' => 'شرکت نوآوران',
                'industry' => 'فناوری',
                'year' => '1403',
                'technologies' => ['React', 'Gatsby', 'Strapi', 'GraphQL'],
                'features' => ['معرفی خدمات', 'بلاگ', 'فرم تماس', 'چندزبانه'],
                'results' => ['افزایش لید' => '+250%', 'زمان در سایت' => '+3 دقیقه', 'سئو' => 'رتبه ۱ گوگل'],
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'پنل مدیریت فیت‌لند',
                'slug' => 'fitland-dashboard',
                'type' => 'webapp',
                'category' => 'داشبورد',
                'icon' => 'Smartphone',
                'color' => 'from-green-500 to-emerald-500',
                'image' => '/storage/web-projects/digistyle.jpg',
                'description' => 'پنل مدیریت باشگاه ورزشی با سیستم عضویت، برنامه تمرینی و گزارش‌گیری',
                'client' => 'باشگاه فیت‌لند',
                'industry' => 'ورزش',
                'year' => '1403',
                'technologies' => ['Angular', 'NestJS', 'MongoDB', 'Chart.js'],
                'features' => ['مدیریت اعضا', 'برنامه تمرینی', 'گزارش مالی', 'حضور و غیاب'],
                'results' => ['صرفه‌جویی زمان' => '10 ساعت/هفته', 'دقت گزارش' => '100%', 'رضایت اعضا' => '+40%'],
                'is_featured' => false,
                'is_active' => true,
            ],
            [
                'title' => 'سئو فروشگاه آریا',
                'slug' => 'aria-seo',
                'type' => 'seo',
                'category' => 'سئو',
                'icon' => 'Search',
                'color' => 'from-lime-500 to-green-500',
                'image' => '/storage/web-projects/clinic-rose.jpg',
                'description' => 'بهینه‌سازی سئو فروشگاه آنلاین با افزایش ترافیک ارگانیک و رتبه کلمات کلیدی',
                'client' => 'فروشگاه آریا',
                'industry' => 'پوشاک',
                'year' => '1402',
                'technologies' => ['SEMrush', 'Ahrefs', 'Google Analytics', 'Search Console'],
                'features' => ['سئو تکنیکال', 'تولید محتوا', 'لینک‌سازی', 'سئو محلی'],
                'results' => ['ترافیک ارگانیک' => '+450%', 'کلمات صفحه اول' => '85 کلمه', 'فروش ارگانیک' => '+280%'],
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($projects as $project) {
            WebProject::updateOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
