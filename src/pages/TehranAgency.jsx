import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, CheckCircle, ArrowLeft, Building2, Users, Award, Star, Video, Camera, Palette, TrendingUp, Target, BarChart3, Brain, Zap } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../components/ui';

const competitiveAdvantages = [
  { title: 'تحلیل استراتژیک بازار تهران', description: 'شناخت عمیق از الگوهای رفتاری مخاطب تهرانی و تحلیل رقبا', icon: Target, color: 'from-blue-500 to-cyan-500' },
  { title: 'تبلیغات داده‌محور', description: 'تصمیم‌گیری بر اساس تحلیل دقیق داده‌ها و نرخ تبدیل واقعی', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
  { title: 'هوش مصنوعی در مارکتینگ', description: 'استفاده از AI برای پیش‌بینی رفتار مخاطب و بهینه‌سازی کمپین‌ها', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { title: 'اجرای دقیق و سریع', description: 'کاهش هزینه‌های آزمون و خطا با اجرای هوشمندانه و هدفمند', icon: Zap, color: 'from-orange-500 to-red-500' },
];

const marketInsights = [
  'مخاطب تهرانی تصمیم‌گیرتر و مقایسه‌گرتر است',
  'اعتبار برند و کیفیت تجربه اهمیت بالایی دارد',
  'رقابت بر سر اعتماد و تمایز واقعی است',
  'تبلیغات مستقیم مقاومت بیشتری دارد',
  'تحلیل داده برای موفقیت ضروری است',
];

const stats = [
  { value: '۵۰+', label: 'برند موفق در تهران', icon: Building2 },
  { value: '۲۰۰+', label: 'کمپین موفق', icon: Award },
  { value: '۸۵%', label: 'نرخ تبدیل بالاتر', icon: TrendingUp },
  { value: '۴.۹', label: 'امتیاز رضایت مشتریان', icon: Star },
];

const TehranAgency = () => {
  return (
    <div className="pt-24">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-5">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526973455651-5b4440fdf94d?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
            alt="برج میلاد تهران"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950 via-dark-950/90 to-dark-950/70" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-medium">آژانس تبلیغاتی در تهران</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                آژانس تبلیغاتی در تهران
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-orange-400 mb-6 leading-tight">
                جایی که رقابت واقعی آغاز می‌شود
              </h2>
              
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                تهران، قلب تپنده اقتصاد، برندینگ و رقابت تجاری ایران است. بازاری که در آن، دیده‌شدن اتفاقی نیست و موفقیت تنها نصیب برندهایی می‌شود که 
                <span className="text-primary-400 font-bold"> استراتژی، شناخت بازار و اجرای دقیق </span>
                را هم‌زمان در اختیار دارند.
              </p>

              <p className="text-lg text-dark-300 mb-8 leading-relaxed">
                AMONIX به‌عنوان یک <span className="text-primary-400 font-bold">آژانس تبلیغاتی فعال در تهران</span>، دقیقاً در همین میدان رقابت شکل گرفته و رشد کرده است؛ 
                جایی که هر تصمیم مارکتینگی باید مبتنی بر داده، تجربه و شناخت عمیق از رفتار مخاطب تهرانی باشد.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/start"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                >
                  دریافت استراتژی اختصاصی
                </Link>
                <a
                  href="tel:+982191234567"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  تماس فوری
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <IconComponent className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <p className="text-dark-400 text-sm">{stat.label}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                شناخت بازار تهران
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                مزیتی که به‌سادگی به دست نمی‌آید
              </h2>
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                بازار تهران با هیچ شهر دیگری قابل مقایسه نیست. مخاطب تهرانی تصمیم‌گیرتر، مقایسه‌گرتر و نسبت به تبلیغات مستقیم مقاوم‌تر است.
              </p>
              <p className="text-lg text-dark-300 mb-12 leading-relaxed">
                AMONIX با اجرای پروژه‌های متنوع در حوزه‌های مختلف از جمله رستوران، خدمات، سلامت، مد، استارتاپ‌ها و برندهای فروش‌محور، 
                به درک عمیقی از <span className="text-primary-400 font-bold">الگوهای رفتاری، کانال‌های اثرگذار و نقاط تماس واقعی مخاطب تهرانی</span> رسیده است.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketInsights.map((insight, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <CheckCircle className="w-6 h-6 text-primary-400 mb-4" />
                  <p className="text-dark-300 leading-relaxed">{insight}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                تفاوت AMONIX
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                چرا AMONIX در میان آژانس‌های تبلیغاتی تهران متفاوت عمل می‌کند؟
              </h2>
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                بسیاری از آژانس‌های تبلیغاتی در تهران صرفاً خدمات ارائه می‌دهند؛
                اما تفاوت AMONIX در <span className="text-primary-400 font-bold">نحوه تحلیل، تصمیم‌سازی و اجرای استراتژیک</span> است.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 group"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${advantage.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{advantage.title}</h3>
                    <p className="text-dark-300 leading-relaxed">{advantage.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/30">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                رویکرد استراتژیک
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ما پروژه‌ها را این‌گونه آغاز نمی‌کنیم:
              </h2>
              <div className="text-2xl text-primary-400 font-bold mb-8 text-center">
                «چه محتوایی تولید کنیم؟»
              </div>
              <h3 className="text-xl font-bold text-white mb-6">
                بلکه از این نقطه شروع می‌کنیم:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'هدف تجاری برند چیست؟',
                  'بازار تهران در این حوزه اشباع شده یا هنوز ظرفیت رشد دارد؟',
                  'مخاطب در کدام مرحله از مسیر تصمیم‌گیری قرار دارد؟',
                  'کدام کانال واقعاً فروش، لید یا رشد ایجاد می‌کند؟',
                  'چه فعالیت‌هایی باید حذف شود، نه اضافه؟'
                ].map((question, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
                    >
                      <Target className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <p className="text-dark-300">{question}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
                <p className="text-lg text-white text-center leading-relaxed">
                  این نگاه باعث می‌شود تبلیغات شما 
                  <span className="text-primary-400 font-bold"> کم‌هزینه‌تر، هدفمندتر و اثربخش‌تر </span>
                  باشد.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                تسلط بر رقابت
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                تسلط بر فضای رقابتی تبلیغات در تهران
              </h2>
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                در تهران، رقابت صرفاً بر سر دیده‌شدن نیست؛
                رقابت بر سر <span className="text-primary-400 font-bold">اعتماد، تجربه کاربر و تمایز واقعی برند</span> است.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'استراتژی برند', description: 'تحلیل عمیق هویت برند و تعریف موقعیت رقابتی' },
              { title: 'تولید محتوای حرفه‌ای', description: 'محتوای هدفمند که با مخاطب تهرانی ارتباط برقرار می‌کند' },
              { title: 'تحلیل رفتار کاربر', description: 'درک دقیق از الگوهای تصمیم‌گیری مخاطب' },
              { title: 'ابزارهای داده‌محور', description: 'استفاده از analytics برای بهینه‌سازی مستمر' },
              { title: 'هوش مصنوعی', description: 'پیش‌بینی رفتار و شخصی‌سازی پیام‌ها' },
              { title: 'اندازه‌گیری نتایج', description: 'تمرکز بر خروجی‌های واقعی: فروش، لید، رشد' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
                >
                  <h3 className="text-lg font-bold text-primary-400 mb-3">{item.title}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                تحلیل داده
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                تبلیغات در تهران بدون تحلیل داده؛ یک ریسک پرهزینه
              </h2>
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                یکی از اشتباهات رایج در بازار تهران، اجرای کمپین‌های تبلیغاتی بدون تحلیل عمیق داده است.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-xl font-bold text-primary-400 mb-4">آنچه ما تحلیل می‌کنیم:</h3>
                <ul className="space-y-3">
                  {[
                    'تحلیل رفتار کاربران',
                    'بررسی نرخ تعامل، کلیک و تبدیل',
                    'مدل‌سازی مسیر تصمیم مشتری'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-dark-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-xl font-bold text-primary-400 mb-4">نتیجه تحلیل داده:</h3>
                <ul className="space-y-3">
                  {[
                    'کمپین‌های قابل اندازه‌گیری',
                    'قابل بهینه‌سازی و مقیاس‌پذیر',
                    'کاهش هزینه‌های آزمون و خطا'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-dark-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-primary-400" />
                <h3 className="text-xl font-bold text-white">هوش مصنوعی؛ ابزار عملیاتی ما</h3>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                در این مسیر، هوش مصنوعی برای ما یک ابزار عملیاتی است، نه یک شعار تبلیغاتی.
                از AI برای:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'پیش‌بینی رفتار مخاطب',
                  'بهینه‌سازی پیام‌ها و سناریوها',
                  'تست هم‌زمان چندین مسیر تبلیغاتی',
                  'کاهش هزینه‌های آزمون و خطا'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-dark-300">
                    <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-primary-400 mt-6 font-medium">
                استفاده می‌کنیم تا تصمیم‌ها سریع‌تر و دقیق‌تر گرفته شوند.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                برندهایی که رشد واقعی می‌خواهند
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                آژانس تبلیغاتی در تهران برای برندهایی که رشد واقعی می‌خواهند
              </h2>
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                اگر به‌دنبال یک آژانس تبلیغاتی در تهران هستید که:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              'صرفاً اجرا نکند، بلکه تفکر استراتژیک ارائه دهد',
              'فقط محتوا تولید نکند، بلکه نتیجه تجاری بسازد',
              'و عملکردش قابل سنجش و قابل تحلیل باشد'
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <p className="text-dark-300 leading-relaxed">{item}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="p-8 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                AMONIX انتخاب برندهایی است که می‌خواهند در بازار شلوغ تهران:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'متمایز دیده شوند', icon: Star },
                  { title: 'اعتماد بسازند', icon: Building2 },
                  { title: 'و به رشد پایدار و فروش واقعی برسند', icon: TrendingUp }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="text-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                برای تحلیل بازار تهران و دریافت استراتژی اختصاصی برندتان، با AMONIX تماس بگیرید.
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/start"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                >
                  دریافت استراتژی اختصاصی
                </Link>
                <a
                  href="tel:+982191234567"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  ۰۲۱-۹۱۲۳۴۵۶۷
                </a>
              </div>
              
              <div className="mt-6 text-dark-400">
                <Clock className="w-5 h-5 inline-block ml-2" />
                شنبه تا پنج‌شنبه: ۹ صبح تا ۶ عصر
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default TehranAgency;
