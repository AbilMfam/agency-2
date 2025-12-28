<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'علی محمدی',
                'slug' => 'ali-mohammadi',
                'role' => 'مدیرعامل و بنیان‌گذار',
                'bio' => 'بیش از ۱۰ سال تجربه در حوزه دیجیتال مارکتینگ و تولید محتوا. فارغ‌التحصیل MBA از دانشگاه تهران.',
                'image' => '/storage/team/ali-mohammadi.jpg',
                'email' => 'ali@agency.ir',
                'social_links' => ['instagram' => 'ali_mohammadi', 'linkedin' => 'alimohammadi'],
                'skills' => ['استراتژی دیجیتال', 'مدیریت پروژه', 'برندینگ'],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'سارا احمدی',
                'slug' => 'sara-ahmadi',
                'role' => 'مدیر خلاقیت',
                'bio' => 'طراح گرافیک و کارگردان هنری با ۸ سال تجربه. برنده جایزه طراحی خلاق ایران.',
                'image' => '/storage/team/sara-ahmadi.jpg',
                'email' => 'sara@agency.ir',
                'social_links' => ['instagram' => 'sara_design', 'behance' => 'saraahmadi'],
                'skills' => ['طراحی گرافیک', 'موشن گرافیک', 'برندینگ'],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'محمد رضایی',
                'slug' => 'mohammad-rezaei',
                'role' => 'مدیر فیلمبرداری',
                'bio' => 'فیلمبردار حرفه‌ای با تجربه کار در پروژه‌های بزرگ تبلیغاتی و سینمایی.',
                'image' => '/storage/team/mohammad-rezaei.jpg',
                'email' => 'mohammad@agency.ir',
                'social_links' => ['instagram' => 'mohammad_cinema', 'youtube' => 'mohammadrezaei'],
                'skills' => ['فیلمبرداری', 'نورپردازی', 'کارگردانی'],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'نیلوفر کریمی',
                'slug' => 'niloofar-karimi',
                'role' => 'مدیر سوشال مدیا',
                'bio' => 'متخصص رشد ارگانیک و استراتژی محتوا در شبکه‌های اجتماعی.',
                'image' => '/storage/team/niloofar-karimi.jpg',
                'email' => 'niloofar@agency.ir',
                'social_links' => ['instagram' => 'niloofar_social', 'twitter' => 'niloofarkarimi'],
                'skills' => ['سوشال مدیا', 'تولید محتوا', 'اینفلوئنسر مارکتینگ'],
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'امیر حسینی',
                'slug' => 'amir-hosseini',
                'role' => 'تدوینگر ارشد',
                'bio' => 'تدوینگر حرفه‌ای با تسلط بر نرم‌افزارهای Adobe و DaVinci Resolve.',
                'image' => '/storage/team/amir-hosseini.jpg',
                'email' => 'amir@agency.ir',
                'social_links' => ['instagram' => 'amir_edit'],
                'skills' => ['تدوین', 'کالرگریدینگ', 'افکت‌های ویژه'],
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'زهرا نوری',
                'slug' => 'zahra-noori',
                'role' => 'عکاس',
                'bio' => 'عکاس حرفه‌ای محصول و پرتره با سبک خاص و مدرن.',
                'image' => '/storage/team/zahra-noori.jpg',
                'email' => 'zahra@agency.ir',
                'social_links' => ['instagram' => 'zahra_photo'],
                'skills' => ['عکاسی محصول', 'عکاسی پرتره', 'ادیت عکس'],
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(['slug' => $member['slug']], $member);
        }
    }
}
