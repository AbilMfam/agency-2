<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Industry;
use App\Models\Client;
use App\Models\BlogPost;
use App\Models\Package;
use App\Models\Testimonial;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // Services - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Service::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $services = [
            ['title' => 'فیلمبرداری', 'slug' => 'video-production', 'short_title' => 'فیلمبرداری', 'description' => 'تولید ویدیوهای حرفه‌ای با تجهیزات پیشرفته و تیم متخصص', 'full_description' => 'با استفاده از جدیدترین تجهیزات فیلمبرداری و تیمی از متخصصین باتجربه، ویدیوهای حرفه‌ای و جذابی برای کسب‌وکار شما تولید می‌کنیم.', 'icon' => 'Video', 'color' => 'from-red-500 to-orange-500', 'image' => '/storage/services/video-production.jpg', 'features' => ['فیلمبرداری با کیفیت 4K', 'نورپردازی حرفه‌ای', 'تیم مجرب', 'تجهیزات پیشرفته'], 'is_active' => true],
            ['title' => 'تدوین ویدیو', 'slug' => 'video-editing', 'short_title' => 'تدوین', 'description' => 'تدوین حرفه‌ای با جدیدترین تکنیک‌ها و ترندهای روز', 'full_description' => 'تدوین ویدیوهای شما با استفاده از جدیدترین نرم‌افزارها و تکنیک‌های روز دنیا.', 'icon' => 'Film', 'color' => 'from-purple-500 to-pink-500', 'image' => '/storage/services/video-editing.jpg', 'features' => ['تدوین حرفه‌ای', 'کالرگریدینگ', 'افکت‌های ویژه', 'صداگذاری'], 'is_active' => true],
            ['title' => 'موشن گرافیک', 'slug' => 'motion-graphics', 'short_title' => 'موشن', 'description' => 'انیمیشن‌های جذاب و خلاقانه برای برند شما', 'full_description' => 'طراحی و ساخت موشن گرافیک‌های حرفه‌ای که پیام برند شما را به شکلی جذاب منتقل می‌کند.', 'icon' => 'Sparkles', 'color' => 'from-cyan-500 to-blue-500', 'image' => '/storage/services/motion-graphics.jpg', 'features' => ['انیمیشن 2D و 3D', 'لوگو موشن', 'اینفوگرافیک متحرک', 'تیزر تبلیغاتی'], 'is_active' => true],
            ['title' => 'عکاسی', 'slug' => 'photography', 'short_title' => 'عکاسی', 'description' => 'عکاسی حرفه‌ای محصول، صنعتی و پرتره', 'full_description' => 'عکاسی حرفه‌ای با تجهیزات پیشرفته برای محصولات، خدمات و برند شما.', 'icon' => 'Camera', 'color' => 'from-amber-500 to-yellow-500', 'image' => '/storage/services/photography.jpg', 'features' => ['عکاسی محصول', 'عکاسی صنعتی', 'عکاسی پرتره', 'ادیت حرفه‌ای'], 'is_active' => true],
            ['title' => 'تولید محتوا', 'slug' => 'content-creation', 'short_title' => 'محتوا', 'description' => 'تولید محتوای خلاقانه و تأثیرگذار برای شبکه‌های اجتماعی', 'full_description' => 'از ایده تا اجرا، محتوای جذاب و وایرال برای پیج‌های اینستاگرام، تیک‌تاک و سایر پلتفرم‌ها.', 'icon' => 'FileText', 'color' => 'from-green-500 to-emerald-500', 'image' => '/storage/services/content-creation.jpg', 'features' => ['ریلز و استوری', 'پست‌های تعاملی', 'کپشن‌نویسی', 'تقویم محتوایی'], 'is_active' => true],
            ['title' => 'سوشال مدیا', 'slug' => 'social-media', 'short_title' => 'سوشال', 'description' => 'مدیریت حرفه‌ای شبکه‌های اجتماعی', 'full_description' => 'مدیریت کامل پیج‌های اینستاگرام، تلگرام، لینکدین با استراتژی رشد ارگانیک.', 'icon' => 'Share2', 'color' => 'from-pink-500 to-rose-500', 'image' => '/storage/services/social-media.jpg', 'features' => ['مدیریت پیج', 'تعامل با مخاطب', 'رشد ارگانیک', 'گزارش‌دهی'], 'is_active' => true],
            ['title' => 'دیجیتال مارکتینگ', 'slug' => 'digital-marketing', 'short_title' => 'مارکتینگ', 'description' => 'استراتژی‌های بازاریابی دیجیتال نتیجه‌محور', 'full_description' => 'طراحی و اجرای کمپین‌های دیجیتال مارکتینگ با تمرکز بر ROI.', 'icon' => 'TrendingUp', 'color' => 'from-blue-500 to-indigo-500', 'image' => '/storage/services/digital-marketing.jpg', 'features' => ['استراتژی بازاریابی', 'تحلیل داده', 'بهینه‌سازی نرخ تبدیل', 'گزارش‌دهی'], 'is_active' => true],
            ['title' => 'برندینگ', 'slug' => 'branding', 'short_title' => 'برندینگ', 'description' => 'ساخت و توسعه هویت برند', 'full_description' => 'طراحی هویت بصری کامل شامل لوگو، رنگ‌بندی، تایپوگرافی و راهنمای برند.', 'icon' => 'Palette', 'color' => 'from-fuchsia-500 to-pink-500', 'image' => '/storage/services/branding.jpg', 'features' => ['طراحی لوگو', 'هویت بصری', 'برندبوک', 'استراتژی برند'], 'is_active' => true],
            ['title' => 'طراحی سایت', 'slug' => 'web-design', 'short_title' => 'وب', 'description' => 'طراحی و توسعه وب‌سایت‌های مدرن و واکنش‌گرا', 'full_description' => 'طراحی و توسعه وب‌سایت‌های حرفه‌ای با UI/UX عالی و سرعت بالا.', 'icon' => 'Globe', 'color' => 'from-indigo-500 to-violet-500', 'image' => '/storage/services/web-design.jpg', 'features' => ['طراحی UI/UX', 'توسعه فرانت‌اند', 'واکنش‌گرا', 'سئو فنی'], 'is_active' => true],
            ['title' => 'سئو', 'slug' => 'seo', 'short_title' => 'سئو', 'description' => 'بهینه‌سازی سایت برای موتورهای جستجو', 'full_description' => 'سئو تکنیکال، محتوایی و لینک‌سازی برای بهبود رتبه سایت در گوگل.', 'icon' => 'Search', 'color' => 'from-lime-500 to-green-500', 'image' => '/storage/services/seo.jpg', 'features' => ['سئو تکنیکال', 'سئو محتوا', 'لینک‌سازی', 'سئو محلی'], 'is_active' => true],
        ];
        foreach ($services as $service) {
            Service::create($service);
        }

        // Industries - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Industry::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $industries = [
            ['title' => 'تولید محتوا برای کافه و رستوران', 'slug' => 'cafe-restaurant', 'short_title' => 'کافه و رستوران', 'description' => 'تولید محتوای حرفه‌ای برای کافه‌ها و رستوران‌ها', 'full_description' => 'با تیم متخصص ما، کافه یا رستوران خود را به یک برند محبوب در فضای مجازی تبدیل کنید.', 'icon' => 'Coffee', 'color' => 'from-amber-500 to-orange-500', 'image' => '/storage/industries/cafe-restaurant.jpg', 'services' => ['عکاسی غذا', 'فیلمبرداری', 'ساخت ریلز', 'مدیریت پیج'], 'is_active' => true],
            ['title' => 'تولید محتوا برای صنعت خودرو', 'slug' => 'automotive', 'short_title' => 'خودرو', 'description' => 'تولید محتوای تخصصی برای نمایشگاه‌های خودرو', 'full_description' => 'با فیلمبرداری سینمایی و عکاسی حرفه‌ای از خودروها، برند شما را متمایز می‌کنیم.', 'icon' => 'Car', 'color' => 'from-blue-500 to-indigo-500', 'image' => '/storage/industries/automotive.jpg', 'services' => ['فیلمبرداری خودرو', 'عکاسی صنعتی', 'تیزر تبلیغاتی', 'مدیریت پیج'], 'is_active' => true],
            ['title' => 'تولید محتوا برای سالن زیبایی', 'slug' => 'beauty-clinic', 'short_title' => 'زیبایی و سلامت', 'description' => 'تولید محتوای تخصصی برای سالن‌های زیبایی و کلینیک‌ها', 'full_description' => 'با محتوای حرفه‌ای و جذاب، مشتریان جدید جذب کنید.', 'icon' => 'Scissors', 'color' => 'from-pink-500 to-rose-500', 'image' => '/storage/industries/beauty-clinic.jpg', 'services' => ['عکاسی پرتره', 'فیلمبرداری', 'ریلز آموزشی', 'مدیریت پیج'], 'is_active' => true],
            ['title' => 'تولید محتوا برای پزشکان', 'slug' => 'medical', 'short_title' => 'پزشکی', 'description' => 'تولید محتوای تخصصی برای پزشکان و کلینیک‌ها', 'full_description' => 'با رعایت اصول اخلاق پزشکی و تولید محتوای علمی و قابل اعتماد.', 'icon' => 'Stethoscope', 'color' => 'from-cyan-500 to-teal-500', 'image' => '/storage/industries/medical.jpg', 'services' => ['ویدیو آموزشی', 'معرفی خدمات', 'مدیریت پیج', 'سئو پزشکی'], 'is_active' => true],
            ['title' => 'تولید محتوا برای مد و پوشاک', 'slug' => 'fashion', 'short_title' => 'مد و پوشاک', 'description' => 'تولید محتوای خلاقانه برای برندهای مد', 'full_description' => 'با عکاسی مد حرفه‌ای و لوک‌بوک، برند پوشاک شما را به سطح بین‌المللی می‌رسانیم.', 'icon' => 'ShoppingBag', 'color' => 'from-purple-500 to-violet-500', 'image' => '/storage/industries/fashion.jpg', 'services' => ['عکاسی مد', 'لوک‌بوک', 'فیلمبرداری', 'اینفلوئنسر مارکتینگ'], 'is_active' => true],
            ['title' => 'تولید محتوا برای ورزش و فیتنس', 'slug' => 'fitness', 'short_title' => 'ورزش و فیتنس', 'description' => 'تولید محتوای انگیزشی و آموزشی برای باشگاه‌ها', 'full_description' => 'با ویدیوهای آموزشی و چالش‌های ورزشی، جامعه فیتنس خود را بسازید.', 'icon' => 'Dumbbell', 'color' => 'from-green-500 to-emerald-500', 'image' => '/storage/industries/fitness.jpg', 'services' => ['فیلمبرداری ورزشی', 'ویدیو آموزشی', 'مدیریت پیج', 'چالش‌های ورزشی'], 'is_active' => true],
        ];
        foreach ($industries as $industry) {
            Industry::create($industry);
        }

        // Clients
        $clients = [
            ['name' => 'دیجی‌کالا', 'logo' => '/storage/clients/digikala.png', 'website' => 'https://digikala.com', 'is_active' => true],
            ['name' => 'اسنپ', 'logo' => '/storage/clients/snapp.png', 'website' => 'https://snapp.ir', 'is_active' => true],
            ['name' => 'تپسی', 'logo' => '/storage/clients/tapsi.png', 'website' => 'https://tapsi.ir', 'is_active' => true],
            ['name' => 'فیلیمو', 'logo' => '/storage/clients/filimo.png', 'website' => 'https://filimo.com', 'is_active' => true],
        ];
        foreach ($clients as $client) {
            Client::create($client);
        }

        // Portfolios - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Portfolio::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $portfolios = [
            ['title' => 'کافه لمیز', 'slug' => 'cafe-lamiz', 'category' => 'cafe', 'description' => 'تولید محتوای ویدیویی برای کافه لمیز با تمرکز بر فضای دنج و منوی خاص', 'full_description' => 'کافه لمیز یکی از محبوب‌ترین کافه‌های تهران است که با همکاری ما توانست حضور دیجیتال خود را به طور چشمگیری افزایش دهد.', 'thumbnail' => '/storage/portfolios/cafe-lamiz.jpg', 'cover_image' => '/storage/portfolios/cafe-lamiz-cover.jpg', 'views' => '2.5M', 'growth' => '+340%', 'services' => ['فیلمبرداری', 'تدوین', 'تولید محتوا', 'سوشال مدیا'], 'tags' => ['کافه', 'رستوران', 'ریلز'], 'duration' => '۳ ماه', 'year' => '۱۴۰۲', 'client' => 'کافه لمیز', 'industry' => 'کافه و رستوران', 'results' => ['views' => '2,500,000+', 'followers' => '+15,000', 'engagement' => '8.5%'], 'is_active' => true, 'is_featured' => true],
            ['title' => 'کلینیک زیبایی رز', 'slug' => 'clinic-rose', 'category' => 'beauty', 'description' => 'کمپین محتوایی برای کلینیک زیبایی با تمرکز بر نتایج واقعی', 'full_description' => 'کلینیک زیبایی رز با هدف افزایش اعتماد مشتریان و نمایش نتایج واقعی خدمات، با ما همکاری کرد.', 'thumbnail' => '/storage/portfolios/clinic-rose.jpg', 'cover_image' => '/storage/portfolios/clinic-rose-cover.jpg', 'views' => '1.8M', 'growth' => '+280%', 'services' => ['عکاسی', 'تولید محتوا', 'سوشال مدیا', 'برندینگ'], 'tags' => ['زیبایی', 'کلینیک', 'پزشکی'], 'duration' => '۶ ماه', 'year' => '۱۴۰۲', 'client' => 'کلینیک رز', 'industry' => 'زیبایی و سلامت', 'results' => ['views' => '1,800,000+', 'followers' => '+22,000', 'engagement' => '12%'], 'is_active' => true, 'is_featured' => true],
            ['title' => 'فروشگاه مد آریا', 'slug' => 'fashion-aria', 'category' => 'fashion', 'description' => 'تولید ریلز‌های وایرال برای فروشگاه پوشاک با استایل مدرن', 'full_description' => 'فروشگاه مد آریا با هدف افزایش فروش آنلاین و شناخت برند، پروژه تولید محتوا را به ما سپرد.', 'thumbnail' => '/storage/portfolios/fashion-aria.jpg', 'cover_image' => '/storage/portfolios/fashion-aria-cover.jpg', 'views' => '3.2M', 'growth' => '+420%', 'services' => ['فیلمبرداری', 'موشن گرافیک', 'تولید محتوا', 'اینفلوئنسر مارکتینگ'], 'tags' => ['فشن', 'پوشاک', 'ریلز'], 'duration' => '۴ ماه', 'year' => '۱۴۰۳', 'client' => 'فروشگاه آریا', 'industry' => 'مد و پوشاک', 'results' => ['views' => '3,200,000+', 'followers' => '+45,000', 'engagement' => '15%'], 'is_active' => true, 'is_featured' => true],
            ['title' => 'نمایشگاه خودرو پرشیا', 'slug' => 'auto-persia', 'category' => 'automotive', 'description' => 'ویدیوهای سینمایی از خودروهای لوکس با کیفیت 4K', 'full_description' => 'نمایشگاه خودرو پرشیا برای معرفی خودروهای لوکس خود به بازار، نیاز به محتوای ویدیویی سینمایی داشت.', 'thumbnail' => '/storage/portfolios/auto-persia.jpg', 'cover_image' => '/storage/portfolios/auto-persia-cover.jpg', 'views' => '1.5M', 'growth' => '+200%', 'services' => ['فیلمبرداری', 'تدوین', 'موشن گرافیک', 'عکاسی'], 'tags' => ['خودرو', 'لوکس', 'سینمایی'], 'duration' => '۲ ماه', 'year' => '۱۴۰۲', 'client' => 'نمایشگاه پرشیا', 'industry' => 'خودرو', 'results' => ['views' => '1,500,000+', 'followers' => '+8,000', 'engagement' => '6%'], 'is_active' => true, 'is_featured' => false],
            ['title' => 'رستوران ایتالیایی ویوا', 'slug' => 'cafe-viva', 'category' => 'cafe', 'description' => 'محتوای غذایی اشتهاآور با فوکوس روی تجربه غذاخوری', 'full_description' => 'رستوران ویوا با هدف افزایش رزرو آنلاین و معرفی منوی جدید، پروژه تولید محتوا را شروع کرد.', 'thumbnail' => '/storage/portfolios/cafe-viva.jpg', 'cover_image' => '/storage/portfolios/cafe-viva-cover.jpg', 'views' => '2.1M', 'growth' => '+310%', 'services' => ['عکاسی', 'فیلمبرداری', 'تولید محتوا', 'سوشال مدیا'], 'tags' => ['رستوران', 'غذا', 'ایتالیایی'], 'duration' => '۵ ماه', 'year' => '۱۴۰۳', 'client' => 'رستوران ویوا', 'industry' => 'کافه و رستوران', 'results' => ['views' => '2,100,000+', 'followers' => '+18,000', 'engagement' => '9%'], 'is_active' => true, 'is_featured' => false],
            ['title' => 'فروشگاه آنلاین دیجی‌استایل', 'slug' => 'shop-digi', 'category' => 'shop', 'description' => 'کمپین جامع دیجیتال مارکتینگ برای فروشگاه آنلاین', 'full_description' => 'دیجی‌استایل یک فروشگاه آنلاین پوشاک است که با هدف افزایش فروش و شناخت برند، کمپین جامع دیجیتال مارکتینگ را با ما شروع کرد.', 'thumbnail' => '/storage/portfolios/shop-digi.jpg', 'cover_image' => '/storage/portfolios/shop-digi-cover.jpg', 'views' => '4.5M', 'growth' => '+550%', 'services' => ['دیجیتال مارکتینگ', 'تبلیغات', 'تولید محتوا', 'سئو'], 'tags' => ['فروشگاه آنلاین', 'ایکامرس', 'تبلیغات'], 'duration' => '۶ ماه', 'year' => '۱۴۰۳', 'client' => 'دیجی‌استایل', 'industry' => 'فروشگاه آنلاین', 'results' => ['views' => '4,500,000+', 'followers' => '+65,000', 'engagement' => '11%'], 'is_active' => true, 'is_featured' => true],
            ['title' => 'باشگاه ورزشی فیت‌لند', 'slug' => 'fitness-fitland', 'category' => 'fitness', 'description' => 'محتوای انگیزشی و آموزشی برای باشگاه ورزشی', 'full_description' => 'باشگاه فیت‌لند برای جذب اعضای جدید و حفظ اعضای فعلی، نیاز به محتوای انگیزشی و آموزشی داشت.', 'thumbnail' => '/storage/portfolios/fitness-fitland.jpg', 'cover_image' => '/storage/portfolios/fitness-fitland-cover.jpg', 'views' => '1.2M', 'growth' => '+180%', 'services' => ['فیلمبرداری', 'تولید محتوا', 'سوشال مدیا', 'تبلیغات'], 'tags' => ['ورزش', 'فیتنس', 'باشگاه'], 'duration' => '۴ ماه', 'year' => '۱۴۰۳', 'client' => 'باشگاه فیت‌لند', 'industry' => 'ورزش و تناسب اندام', 'results' => ['views' => '1,200,000+', 'followers' => '+12,000', 'engagement' => '14%'], 'is_active' => true, 'is_featured' => false],
            ['title' => 'آکادمی آموزشی نوآوران', 'slug' => 'edu-noavaran', 'category' => 'education', 'description' => 'کمپین جذب دانشجو برای آکادمی آموزشی', 'full_description' => 'آکادمی نوآوران برای جذب دانشجویان جدید و معرفی دوره‌های آموزشی، نیاز به کمپین دیجیتال داشت.', 'thumbnail' => '/storage/portfolios/edu-noavaran.jpg', 'cover_image' => '/storage/portfolios/edu-noavaran-cover.jpg', 'views' => '980K', 'growth' => '+220%', 'services' => ['تولید محتوا', 'تبلیغات', 'سوشال مدیا', 'ویدیو مارکتینگ'], 'tags' => ['آموزش', 'دوره آنلاین', 'آکادمی'], 'duration' => '۳ ماه', 'year' => '۱۴۰۲', 'client' => 'آکادمی نوآوران', 'industry' => 'آموزش', 'results' => ['views' => '980,000+', 'followers' => '+8,500', 'engagement' => '10%'], 'is_active' => true, 'is_featured' => false],
            ['title' => 'کلینیک دندانپزشکی لبخند', 'slug' => 'dental-labkhand', 'category' => 'medical', 'description' => 'محتوای آموزشی و معرفی خدمات دندانپزشکی', 'full_description' => 'کلینیک لبخند برای افزایش اعتماد بیماران و معرفی خدمات تخصصی، نیاز به محتوای آموزشی و حرفه‌ای داشت.', 'thumbnail' => '/storage/portfolios/dental-labkhand.jpg', 'cover_image' => '/storage/portfolios/dental-labkhand-cover.jpg', 'views' => '750K', 'growth' => '+160%', 'services' => ['فیلمبرداری', 'عکاسی', 'تولید محتوا', 'سوشال مدیا'], 'tags' => ['دندانپزشکی', 'پزشکی', 'سلامت'], 'duration' => '۵ ماه', 'year' => '۱۴۰۳', 'client' => 'کلینیک لبخند', 'industry' => 'پزشکی', 'results' => ['views' => '750,000+', 'followers' => '+6,000', 'engagement' => '8%'], 'is_active' => true, 'is_featured' => false],
        ];
        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }

        // Packages - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Package::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $packages = [
            ['name' => 'استارتر', 'slug' => 'starter', 'subtitle' => 'شروع حرفه‌ای', 'price' => 4900000, 'period' => 'ماهانه', 'description' => 'مناسب برای کسب‌وکارهای کوچک که تازه شروع کرده‌اند', 'features' => ['۸ پست اینستاگرام', '۴ ریلز ماهانه', '۱۵ استوری', 'تقویم محتوایی', 'گزارش ماهانه'], 'not_included' => ['فیلمبرداری حرفه‌ای', 'موشن گرافیک', 'مدیریت تبلیغات'], 'color' => 'from-slate-500 to-slate-600', 'is_active' => true, 'is_popular' => false],
            ['name' => 'رشد', 'slug' => 'growth', 'subtitle' => 'محبوب‌ترین', 'price' => 9900000, 'period' => 'ماهانه', 'description' => 'بهترین انتخاب برای رشد سریع و حرفه‌ای', 'features' => ['۱۲ پست اینستاگرام', '۸ ریلز ماهانه', '۳۰ استوری', 'تقویم محتوایی', 'گزارش هفتگی', '۱ روز فیلمبرداری', 'موشن گرافیک ساده', 'مدیریت کامنت‌ها'], 'not_included' => ['مدیریت تبلیغات'], 'color' => 'from-primary-500 to-secondary-500', 'is_active' => true, 'is_popular' => true],
            ['name' => 'حرفه‌ای', 'slug' => 'pro', 'subtitle' => 'کامل‌ترین', 'price' => 19900000, 'period' => 'ماهانه', 'description' => 'برای برندهایی که می‌خواهند در صدر باشند', 'features' => ['۲۰ پست اینستاگرام', '۱۲ ریلز ماهانه', 'استوری نامحدود', 'تقویم محتوایی', 'گزارش روزانه', '۲ روز فیلمبرداری', 'موشن گرافیک پیشرفته', 'مدیریت کامل پیج', 'مدیریت تبلیغات', 'مشاوره استراتژی'], 'not_included' => [], 'color' => 'from-violet-500 to-purple-500', 'is_active' => true, 'is_popular' => false],
            ['name' => 'سفارشی', 'slug' => 'custom', 'subtitle' => 'ویژه شما', 'price' => 0, 'period' => 'توافقی', 'description' => 'پکیج اختصاصی متناسب با نیازهای شما', 'features' => ['تمام خدمات قابل سفارشی‌سازی', 'تیم اختصاصی', 'جلسات حضوری', 'گزارش‌دهی سفارشی', 'پشتیبانی ۲۴/۷'], 'not_included' => [], 'color' => 'from-amber-500 to-orange-500', 'is_active' => true, 'is_popular' => false],
        ];
        foreach ($packages as $package) {
            Package::create($package);
        }

        // Testimonials - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Testimonial::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $testimonials = [
            ['author' => 'علی محمدی', 'role' => 'مدیر کافه لمیز', 'company' => 'کافه لمیز', 'content' => 'همکاری با این تیم بهترین تصمیم برای رشد پیج ما بود. ویوهای میلیونی و رشد فالوور واقعی رو تجربه کردیم.', 'avatar' => '/storage/testimonials/ali-mohammadi.jpg', 'rating' => 5, 'industry' => 'کافه و رستوران', 'results' => '+340% رشد فالوور', 'is_active' => true],
            ['author' => 'دکتر سارا احمدی', 'role' => 'مدیر کلینیک زیبایی', 'company' => 'کلینیک رز', 'content' => 'نتایج فوق‌العاده بود. مراجعین ما چند برابر شدند و برند ما در فضای مجازی شناخته شد.', 'avatar' => '/storage/testimonials/sara-ahmadi.jpg', 'rating' => 5, 'industry' => 'زیبایی و سلامت', 'results' => '+250% افزایش مراجعین', 'is_active' => true],
            ['author' => 'محمد رضایی', 'role' => 'مدیر فروشگاه آریا', 'company' => 'فروشگاه آریا', 'content' => 'فروش آنلاین ما ۵ برابر شد! تیم حرفه‌ای و خلاق با درک عمیق از بازار.', 'avatar' => '/storage/testimonials/mohammad-rezaei.jpg', 'rating' => 5, 'industry' => 'مد و پوشاک', 'results' => '+500% رشد فروش', 'is_active' => true],
            ['author' => 'نیلوفر کریمی', 'role' => 'اینفلوئنسر لایف‌استایل', 'company' => 'بلاگر لایف‌استایل', 'content' => 'کیفیت تولید محتوا و ایده‌پردازی این تیم بی‌نظیره. همیشه یک قدم جلوتر از ترندها هستند.', 'avatar' => '/storage/testimonials/niloofar-karimi.jpg', 'rating' => 5, 'industry' => 'اینفلوئنسر مارکتینگ', 'results' => '+2M ویو در ماه', 'is_active' => true],
            ['author' => 'امیر حسینی', 'role' => 'مدیرعامل دیجی‌استایل', 'company' => 'دیجی‌استایل', 'content' => 'از برندینگ تا دیجیتال مارکتینگ، همه چیز رو با کیفیت عالی انجام دادند.', 'avatar' => '/storage/testimonials/amir-hosseini.jpg', 'rating' => 5, 'industry' => 'فروشگاه آنلاین', 'results' => '+550% رشد فروش', 'is_active' => true],
            ['author' => 'رضا کریمی', 'role' => 'مدیر نمایشگاه پرشیا', 'company' => 'نمایشگاه پرشیا', 'content' => 'کیفیت ویدیوها فوق‌العاده بود. مشتریان از دیدن ویدیوها هیجان‌زده می‌شدند.', 'avatar' => '/storage/testimonials/reza-karimi.jpg', 'rating' => 5, 'industry' => 'خودرو', 'results' => '+120% افزایش لید', 'is_active' => true],
            ['author' => 'دکتر فاطمه رحیمی', 'role' => 'مدیر آکادمی نوآوران', 'company' => 'آکادمی نوآوران', 'content' => 'ثبت‌نام دوره‌ها به شدت افزایش یافت. استراتژی محتوایی عالی بود.', 'avatar' => '/storage/testimonials/fateme-rahimi.jpg', 'rating' => 5, 'industry' => 'آموزش', 'results' => '+220% ثبت‌نام', 'is_active' => true],
            ['author' => 'حسین نوری', 'role' => 'مدیر باشگاه فیت‌لند', 'company' => 'باشگاه فیت‌لند', 'content' => 'ثبت‌نام‌های ما به شدت افزایش یافت. محتواها واقعاً انگیزشی بودند.', 'avatar' => '/storage/testimonials/hossein-noori.jpg', 'rating' => 5, 'industry' => 'ورزش و تناسب اندام', 'results' => '+180% عضویت جدید', 'is_active' => true],
        ];
        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // Blog Posts - Complete data from frontend
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        BlogPost::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $blogPosts = [
            ['title' => '۱۰ نکته طلایی برای ساخت ریلز وایرال در ۲۰۲۵', 'slug' => 'instagram-reels-tips-2025', 'excerpt' => 'یاد بگیرید چگونه ریلز‌هایی بسازید که میلیون‌ها ویو بگیرند.', 'content' => '<p>در این مقاله به بررسی نکات مهم برای ساخت ریلز وایرال می‌پردازیم...</p>', 'category' => 'social-media', 'author' => 'تیم محتوا', 'author_avatar' => '/storage/testimonials/ali-mohammadi.jpg', 'thumbnail' => '/storage/blog/instagram-reels-tips.jpg', 'read_time' => 8, 'tags' => ['ریلز', 'اینستاگرام', 'وایرال'], 'is_published' => true, 'is_featured' => true],
            ['title' => 'راهنمای کامل ساخت تقویم محتوایی', 'slug' => 'content-calendar-guide', 'excerpt' => 'چگونه یک تقویم محتوایی حرفه‌ای بسازیم که به رشد پیج کمک کند.', 'content' => '<p>تقویم محتوایی یکی از مهم‌ترین ابزارهای مدیریت محتوا است...</p>', 'category' => 'content', 'author' => 'تیم استراتژی', 'author_avatar' => '/storage/testimonials/mohammad-rezaei.jpg', 'thumbnail' => '/storage/blog/content-calendar.jpg', 'read_time' => 12, 'tags' => ['تقویم محتوا', 'استراتژی', 'برنامه‌ریزی'], 'is_published' => true, 'is_featured' => true],
            ['title' => 'سئو محلی: چگونه در گوگل تهران دیده شویم', 'slug' => 'local-seo-tehran', 'excerpt' => 'استراتژی‌های سئو محلی برای کسب‌وکارهای تهرانی.', 'content' => '<p>سئو محلی برای کسب‌وکارهایی که مشتریان محلی دارند بسیار مهم است...</p>', 'category' => 'seo', 'author' => 'تیم سئو', 'author_avatar' => '/storage/testimonials/amir-hosseini.jpg', 'thumbnail' => '/storage/blog/local-seo.jpg', 'read_time' => 10, 'tags' => ['سئو', 'سئو محلی', 'گوگل'], 'is_published' => true, 'is_featured' => false],
            ['title' => 'چرا هویت برند مهم است؟', 'slug' => 'brand-identity-importance', 'excerpt' => 'اهمیت برندینگ حرفه‌ای و تأثیر آن بر موفقیت کسب‌وکار.', 'content' => '<p>هویت برند چیزی فراتر از یک لوگو است...</p>', 'category' => 'branding', 'author' => 'تیم برندینگ', 'author_avatar' => '/storage/testimonials/niloofar-karimi.jpg', 'thumbnail' => '/storage/blog/brand-identity.jpg', 'read_time' => 7, 'tags' => ['برندینگ', 'هویت بصری', 'لوگو'], 'is_published' => true, 'is_featured' => false],
            ['title' => 'ترندهای دیجیتال مارکتینگ در ۲۰۲۵', 'slug' => 'digital-marketing-trends-2025', 'excerpt' => 'مهم‌ترین ترندهای بازاریابی دیجیتال که باید بدانید.', 'content' => '<p>دنیای دیجیتال مارکتینگ همیشه در حال تغییر است...</p>', 'category' => 'marketing', 'author' => 'تیم مارکتینگ', 'author_avatar' => '/storage/testimonials/reza-karimi.jpg', 'thumbnail' => '/storage/blog/digital-marketing.jpg', 'read_time' => 15, 'tags' => ['دیجیتال مارکتینگ', 'ترند', '۲۰۲۵'], 'is_published' => true, 'is_featured' => true],
            ['title' => 'بازاریابی اینستاگرامی برای کافه‌ها', 'slug' => 'cafe-instagram-marketing', 'excerpt' => 'چگونه کافه خود را در اینستاگرام به یک برند محبوب تبدیل کنید.', 'content' => '<p>اینستاگرام بهترین پلتفرم برای کافه‌ها و رستوران‌ها است...</p>', 'category' => 'social-media', 'author' => 'تیم محتوا', 'author_avatar' => '/storage/testimonials/ali-mohammadi.jpg', 'thumbnail' => '/storage/blog/cafe-marketing.jpg', 'read_time' => 11, 'tags' => ['کافه', 'اینستاگرام', 'بازاریابی'], 'is_published' => true, 'is_featured' => false],
        ];
        foreach ($blogPosts as $post) {
            BlogPost::create($post);
        }

        // Clients - truncate and recreate
        Client::truncate();
        $clients = [
            ['name' => 'کافه لمیز', 'logo' => '/storage/clients/cafe-lamiz.jpg', 'website' => '#', 'icon' => 'Coffee', 'color' => 'from-amber-500 to-orange-500', 'is_active' => true],
            ['name' => 'کلینیک رز', 'logo' => '/storage/clients/clinic-rose.jpg', 'website' => '#', 'icon' => 'Stethoscope', 'color' => 'from-pink-500 to-rose-500', 'is_active' => true],
            ['name' => 'فروشگاه آریا', 'logo' => '/storage/clients/fashion-aria.jpg', 'website' => '#', 'icon' => 'ShoppingBag', 'color' => 'from-purple-500 to-violet-500', 'is_active' => true],
            ['name' => 'نمایشگاه پرشیا', 'logo' => '/storage/clients/auto-persia.jpg', 'website' => '#', 'icon' => 'Car', 'color' => 'from-blue-500 to-cyan-500', 'is_active' => true],
            ['name' => 'دیجی‌استایل', 'logo' => '/storage/clients/digi-style.jpg', 'website' => '#', 'icon' => 'Shirt', 'color' => 'from-fuchsia-500 to-pink-500', 'is_active' => true],
            ['name' => 'باشگاه فیت‌لند', 'logo' => '/storage/clients/fitland.jpg', 'website' => '#', 'icon' => 'Dumbbell', 'color' => 'from-green-500 to-emerald-500', 'is_active' => true],
        ];
        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
