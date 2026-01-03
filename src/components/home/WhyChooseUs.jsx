import { motion } from 'framer-motion';
import { Target, Play, Sparkles, Users, Briefcase, Rocket, MapPin, Clock, Shield, BarChart3, Headphones, Camera, TrendingUp } from 'lucide-react';
import { ScrollReveal, SectionTitle } from '../ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Benefits organized by service categories
const categoryBenefits = {
  visual: [
    {
      icon: Target,
      title: 'نتیجه‌محور',
      description: 'ما فقط محتوا تولید نمی‌کنیم، بلکه بر روی رشد واقعی کسب‌وکار شما تمرکز داریم. هر پروژه با اهداف مشخص و معیارهای موفقیت تعریف می‌شود.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Play,
      title: 'رزومه ویروسی',
      description: 'سابقه درخشان در تولید ویدیوها و کمپین‌هایی که به ویوهای میلیونی رسیده‌اند. محتوایی که به طور طبیعی و ارگانیک به اشتراک گذاشته می‌شود.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'تیم خلاق و اجرایی',
      description: 'تیم ما از ایده‌پردازان خلاق، متخصصین اجرایی و استراتژیست‌های باتجربه تشکیل شده که تمام مراحل از ایده تا انتشار را به صورت یکپارچه مدیریت می‌کنند.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Camera,
      title: 'تجهیزات پیشرفته',
      description: 'مجهز به جدیدترین دوربین‌های حرفه‌ای 4K، استودیوی کامل با نورپردازی حرفه‌ای، تجهیزات صوتی پیشرفته و امکانات تدوین مدرن برای بهترین کیفیت خروجی.',
      color: 'from-amber-500 to-yellow-500',
    },
  ],
  digital: [
    {
      icon: Shield,
      title: 'کیفیت تضمینی',
      description: 'تعهد ما به کیفیت مطلق در تمام پروژه‌ها. از طراحی UX/UI گرفته تا کدنویسی و سئو، همه چیز با استانداردهای جهانی و بهترین شیوه‌ها اجرا می‌شود.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      title: 'سرعت و تعهد',
      description: 'تحویل پروژه‌ها در زمان مقرر با بالاترین کیفیت، ارتباط شفاف و مستمر در طول پروژه، و پشتیبانی واقعی پس از تحویل برای اطمینان از موفقیت شما.',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Users,
      title: 'تیم حرفه‌ای',
      description: 'متخصصین با تجربه در حوزه‌های مختلف دیجیتال مارکتینگ، طراحی وب، توسعه اپلیکیشن و سئو که با دانش به‌روز و مهارت‌های تخصصی به پروژه‌های شما خدمت می‌کنند.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'گزارش‌دهی دقیق',
      description: 'ارائه گزارش‌های شفاف، دقیق و قابل فهم از عملکرد تمام کمپین‌ها و پروژه‌ها با تحلیل‌های عمیق، معیارهای کلیدی عملکرد و پیشنهادات بهبود مستمر.',
      color: 'from-rose-500 to-red-500',
    },
  ],
  advertising: [
    {
      icon: Rocket,
      title: 'دیجیتال فول‌سرویس',
      description: 'خدمات جامع دیجیتال مارکتینگ از استراتژی برندینگ و هویت بصری گرفته تا سئو، تولید محتوای ویدیویی، موشن گرافیک، طراحی اپلیکیشن و مدیریت کمپین‌های تبلیغاتی.',
      color: 'from-rose-500 to-orange-500',
    },
    {
      icon: Briefcase,
      title: 'تجربه چندین حوزه',
      description: 'سابقه موفق در صنایع مختلف از جمله کافه و رستوران، کلینیک‌های زیبایی، فروشگاه‌های آنلاین، نمایشگاه‌های خودرویی، برندهای مد و پوشاک، و بسیاری کسب‌وکارهای دیگر.',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: Headphones,
      title: 'مشاوره رایگان',
      description: 'جلسه مشاوره تخصصی و کاملاً رایگان برای بررسی دقیق نیازهای کسب‌وکار شما، تحلیل رقبا، و ارائه راهکارهای سفارشی برای رشد دیجیتال شما بدون هیچ تعهدی.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: TrendingUp,
      title: 'ROI مثبت',
      description: 'تمرکز کامل بر بازگشت سرمایه (ROI) و نتایج قابل اندازه‌گیری. هر استراتژی و کمپین با هدف دستیابی به بیشترین بازدهی و رشد پایدار کسب‌وکار طراحی می‌شود.',
      color: 'from-blue-500 to-cyan-500',
    },
  ]
};

// Combine all benefits for display
const allBenefits = [...categoryBenefits.visual, ...categoryBenefits.digital, ...categoryBenefits.advertising];

const BenefitCard = ({ benefit, index }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative h-full"
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-xl h-full group overflow-hidden">
        {/* Background gradient effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-10`} />
        </div>

        {/* Icon container */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 shadow-xl relative z-10`}
        >
          <benefit.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
            {benefit.title}
          </h3>
          <p className="text-dark-300 text-sm leading-relaxed">
            {benefit.description}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 opacity-20">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${benefit.color} blur-2xl`} />
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="مزایای ما"
            title="چرا ما را انتخاب کنید؟"
            description="دلایلی که ما را به بهترین انتخاب برای رشد دیجیتال شما تبدیل می‌کند"
          />
        </ScrollReveal>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {allBenefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.1} variant="fadeUp">
              <BenefitCard benefit={benefit} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile & Tablet: Swiper Carousel */}
        <div className="lg:hidden mt-12">
          <ScrollReveal delay={0.2}>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-primary-500',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-400',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="!pb-16"
            >
              {allBenefits.map((benefit, index) => (
                <SwiperSlide key={index}>
                  <BenefitCard benefit={benefit} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
