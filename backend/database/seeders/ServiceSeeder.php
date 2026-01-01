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
        // Truncate the services table to remove all existing data
        Service::truncate();

        $services = [
            [
                'title' => 'طراحی سایت',
                'slug' => 'web-design',
                'description' => 'در Amonix، طراحی سایت شامل همه‌چیز از تحلیل کسب‌وکار و نیازهای مخاطب تا طراحی UI و UX و پیاده‌سازی نهایی است. سایت‌ها به گونه‌ای ساخته می‌شوند که سریع، ریسپانسیو، سئو‌محور و کاربرپسند باشند و مسیر تبدیل بازدیدکننده به مشتری بهینه شده باشد. هر صفحه و المان بر اساس اهداف تجاری شما و بهترین تجربه کاربری طراحی می‌شود.',
                'features' => [
                    'cta_text' => 'دریافت مشاوره طراحی سایت',
                    'ui_suggestion' => ['Hero با موکاپ سایت', 'تایم‌لاین فرآیند طراحی', 'مزیت رقابتی', 'نمونه‌کار', 'CTA استیکی'],
                    'secondary_cta' => 'شروع طراحی سایت اختصاصی'
                ],
                'icon' => 'Globe',
                'color' => 'from-blue-500 to-cyan-500',
                'image' => '/storage/services/web-design.jpg',
                'is_active' => true,
                'order' => 1
            ],
            [
                'title' => 'طراحی فروشگاه آنلاین',
                'slug' => 'ecommerce-design',
                'description' => 'ما فروشگاه‌هایی طراحی می‌کنیم که فرآیند خرید برای کاربر ساده، سریع و قابل اعتماد باشد. طراحی فروشگاه شامل مسیر خرید، نمایش حرفه‌ای محصولات، اتصال امن درگاه‌های پرداخت و مدیریت سفارش و انبار است. هدف اصلی افزایش فروش واقعی و کاهش ریزش کاربر در مسیر خرید است.',
                'features' => [
                    'cta_text' => 'طراحی فروشگاه فروش‌محور',
                    'ui_suggestion' => ['Hero فروش‌محور', 'نمایش قیف خرید', 'اسکرین صفحه محصول', 'CTA تکرارشونده'],
                    'secondary_cta' => 'افزایش فروش آنلاین'
                ],
                'icon' => 'TrendingUp',
                'color' => 'from-green-500 to-emerald-500',
                'image' => '/storage/services/web-design.jpg',
                'is_active' => true,
                'order' => 2
            ],
            [
                'title' => 'سئو و رنکینگ گوگل',
                'slug' => 'seo-optimization',
                'description' => 'سئو در Amonix یک فرآیند کامل و داده‌محور است که شامل سئو تکنیکال، محتوایی و لوکال می‌شود. ما سایت شما را برای رسیدن به نتایج واقعی در گوگل بهینه می‌کنیم، به‌خصوص در سئو لوکال تهران، و با تحقیق کلمات کلیدی و تحلیل رقبا، ترافیک هدفمند و قابل تبدیل ایجاد می‌کنیم.',
                'features' => [
                    'cta_text' => 'آنالیز رایگان سئو',
                    'ui_suggestion' => ['Hero دیتامحور', 'قبل / بعد رتبه', 'نقشه سئو لوکال', 'FAQ آکاردئونی'],
                    'secondary_cta' => 'شروع پروژه سئو'
                ],
                'icon' => 'Search',
                'color' => 'from-purple-500 to-pink-500',
                'image' => '/storage/services/seo.jpg',
                'is_active' => true,
                'order' => 3
            ],
            [
                'title' => 'طراحی اپلیکیشن',
                'slug' => 'app-design',
                'description' => 'اپلیکیشن‌های ما بر اساس نیاز واقعی کاربران طراحی می‌شوند. تمرکز اصلی روی طراحی UX و UI حرفه‌ای، MVP برای استارتاپ‌ها و توسعه‌پذیری در آینده است. تجربه کاربری ساده و عملکرد سریع تضمین می‌کند که اپلیکیشن شما قابل استفاده و جذاب باشد.',
                'features' => [
                    'cta_text' => 'طراحی MVP اپلیکیشن',
                    'ui_suggestion' => ['موکاپ موبایل', 'مراحل MVP', 'اسکرول اپ‌محور'],
                    'secondary_cta' => 'مشاوره ساخت اپ'
                ],
                'icon' => 'Smartphone',
                'color' => 'from-indigo-500 to-blue-500',
                'image' => '/storage/services/web-design.jpg',
                'is_active' => true,
                'order' => 4
            ],
            [
                'title' => 'برندینگ',
                'slug' => 'branding',
                'description' => 'برندینگ یعنی ساخت تصویری ماندگار در ذهن مخاطب. در Amonix، ما هویت برند شما را از پایه طراحی می‌کنیم، شامل لوگو، رنگ، فونت، شخصیت برند و لحن ارتباطی. هدف ما این است که برند شما در همه نقاط تماس با مشتری یکپارچه و قابل تشخیص باشد.',
                'features' => [
                    'cta_text' => 'شروع برندینگ حرفه‌ای',
                    'ui_suggestion' => ['Brand Story', 'رنگ و تایپوگرافی', 'Before / After برندها'],
                    'secondary_cta' => 'ساخت هویت برند'
                ],
                'icon' => 'Palette',
                'color' => 'from-orange-500 to-red-500',
                'image' => '/storage/services/branding.jpg',
                'is_active' => true,
                'order' => 5
            ],
            [
                'title' => 'طراحی گرافیک',
                'slug' => 'graphic-design',
                'description' => 'طراحی گرافیک ما مبتنی بر هدف و پیام برند است. هر طراحی برای انتقال سریع پیام و جذب مخاطب انجام می‌شود، چه پست و استوری شبکه‌های اجتماعی، چه بنر تبلیغاتی یا کمپین‌های دیجیتال.',
                'features' => [
                    'cta_text' => 'سفارش طراحی گرافیک',
                    'ui_suggestion' => ['گالری نامنظم', 'توضیح کاربرد هر طرح', 'CTA کوچک چندگانه'],
                    'secondary_cta' => 'طراحی برای کمپین شما'
                ],
                'icon' => 'Lightbulb',
                'color' => 'from-yellow-500 to-orange-500',
                'image' => '/storage/services/content-creation.jpg',
                'is_active' => true,
                'order' => 6
            ],
            [
                'title' => 'AI مارکتینگ',
                'slug' => 'ai-marketing',
                'description' => 'با استفاده از هوش مصنوعی، ما سرعت، دقت و بازدهی مارکتینگ را افزایش می‌دهیم. AI در تولید محتوا، تحلیل داده‌ها و بهینه‌سازی کمپین‌ها به کار گرفته می‌شود تا تصمیم‌های سریع‌تر و دقیق‌تری بگیریم.',
                'features' => [
                    'cta_text' => 'استفاده از AI در مارکتینگ',
                    'ui_suggestion' => ['مقایسه سنتی و AI', 'دیاگرام فرآیند', 'کارت‌های کاربرد'],
                    'secondary_cta' => 'مشاوره AI مارکتینگ'
                ],
                'icon' => 'Sparkles',
                'color' => 'from-cyan-500 to-blue-500',
                'image' => '/storage/services/digital-marketing.jpg',
                'is_active' => true,
                'order' => 7
            ],
            [
                'title' => 'موشن گرافیک',
                'slug' => 'motion-graphics',
                'description' => 'موشن گرافیک ابزار مؤثری برای انتقال پیام و معرفی برند است. ما موشن‌هایی تولید می‌کنیم که هم جذاب باشند و هم پیام برند را به روشنی منتقل کنند، شامل معرفی برند، محصول و ویدیوهای شبکه‌های اجتماعی.',
                'features' => [
                    'cta_text' => 'سفارش موشن گرافیک',
                    'ui_suggestion' => ['Hero ویدیویی', 'تایم‌لاین تولید', 'CTA بعد از ویدیو'],
                    'secondary_cta' => 'ساخت ویدیوی تبلیغاتی'
                ],
                'icon' => 'Film',
                'color' => 'from-pink-500 to-purple-500',
                'image' => '/storage/services/motion-graphics.jpg',
                'is_active' => true,
                'order' => 8
            ],
            [
                'title' => 'فیلمبرداری',
                'slug' => 'videography',
                'description' => 'فیلمبرداری تبلیغاتی در Amonix با تمرکز بر اهداف برند و پلتفرم انتشار انجام می‌شود. هر پروژه شامل نورپردازی، کارگردانی و تولید ویدیو متناسب با مخاطب است.',
                'features' => [
                    'cta_text' => 'رزرو پروژه فیلمبرداری',
                    'ui_suggestion' => ['Hero سینمایی', 'پشت‌صحنه پروژه‌ها', 'اعتمادسازی بصری'],
                    'secondary_cta' => 'مشاوره تولید ویدیو'
                ],
                'icon' => 'Video',
                'color' => 'from-red-500 to-pink-500',
                'image' => '/storage/services/video-production.jpg',
                'is_active' => true,
                'order' => 9
            ],
            [
                'title' => 'تدوین',
                'slug' => 'video-editing',
                'description' => 'تدوین حرفه‌ای باعث افزایش تاثیرگذاری ویدیو می‌شود و متناسب با ریتم و الگوریتم هر پلتفرم انجام می‌شود. شامل اصلاح رنگ، صدا و آماده‌سازی خروجی مناسب شبکه‌های اجتماعی و تبلیغات.',
                'features' => [
                    'cta_text' => 'تدوین حرفه‌ای ویدیو',
                    'ui_suggestion' => ['Before / After', 'تایم‌لاین تدوین', 'ویدیو مقایسه‌ای'],
                    'secondary_cta' => 'بهینه‌سازی برای انتشار'
                ],
                'icon' => 'Film',
                'color' => 'from-teal-500 to-green-500',
                'image' => '/storage/services/video-editing.jpg',
                'is_active' => true,
                'order' => 10
            ],
            [
                'title' => 'عکاسی',
                'slug' => 'photography',
                'description' => 'عکاسی تبلیغاتی و محتوایی شامل عکاسی صنعتی، تبلیغاتی و شبکه‌های اجتماعی است و با نگاه برندینگ انجام می‌شود تا تصویر حرفه‌ای از برند شما ارائه شود.',
                'features' => [
                    'cta_text' => 'رزرو عکاسی تبلیغاتی',
                    'ui_suggestion' => ['Hero تمام‌تصویر', 'Masonry Gallery', 'CTA مینیمال'],
                    'secondary_cta' => 'عکاسی برای برند شما'
                ],
                'icon' => 'Camera',
                'color' => 'from-amber-500 to-yellow-500',
                'image' => '/storage/services/photography.jpg',
                'is_active' => true,
                'order' => 11
            ],
            [
                'title' => 'تبلیغات Paid',
                'slug' => 'paid-ads',
                'description' => 'کمپین‌های تبلیغاتی پولی با تحلیل، تست و بهینه‌سازی مداوم اجرا می‌شوند تا بیشترین بازده حاصل شود. تمرکز روی هدف‌گذاری دقیق و ROI واقعی است.',
                'features' => [
                    'cta_text' => 'اجرای کمپین تبلیغاتی',
                    'ui_suggestion' => ['نمودار رشد', 'قیف تبلیغات', 'CTA قاطع'],
                    'secondary_cta' => 'افزایش فروش با تبلیغات'
                ],
                'icon' => 'Megaphone',
                'color' => 'from-rose-500 to-pink-500',
                'image' => '/storage/services/digital-marketing.jpg',
                'is_active' => true,
                'order' => 12
            ],
            [
                'title' => 'اینستاگرام',
                'slug' => 'instagram-marketing',
                'description' => 'مدیریت و رشد پیج اینستاگرام شامل سناریونویسی، تولید محتوا، الگوریتم رشد ارگانیک و مدیریت کامل پیج است تا تعامل و شناخت برند افزایش یابد.',
                'features' => [
                    'cta_text' => 'رشد پیج اینستاگرام',
                    'ui_suggestion' => ['Hero شبیه پروفایل', 'نمونه ریلز', 'CTA دوستانه'],
                    'secondary_cta' => 'مدیریت حرفه‌ای پیج'
                ],
                'icon' => 'Users',
                'color' => 'from-purple-500 to-indigo-500',
                'image' => '/storage/services/social-media.jpg',
                'is_active' => true,
                'order' => 13
            ],
            [
                'title' => 'تلگرام',
                'slug' => 'telegram-marketing',
                'description' => 'مدیریت و تبلیغات تلگرام شامل تولید محتوا، مدیریت کانال و اجرای کمپین‌های هدفمند است تا تعامل و فروش از طریق این کانال افزایش یابد.',
                'features' => [
                    'cta_text' => 'مدیریت کانال تلگرام',
                    'ui_suggestion' => ['Hero پیام‌محور', 'ساختار محتوا', 'CTA شفاف'],
                    'secondary_cta' => 'اجرای تبلیغات تلگرامی'
                ],
                'icon' => 'Share2',
                'color' => 'from-blue-500 to-cyan-500',
                'image' => '/storage/services/social-media.jpg',
                'is_active' => true,
                'order' => 14
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
