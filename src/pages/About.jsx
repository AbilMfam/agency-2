import { motion } from 'framer-motion';
import { Target, Zap, Users, Award, Heart, Rocket, Linkedin, Instagram, Twitter, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle, Card, AnimatedCounter, ScrollReveal } from '../components/ui';
import { teamMembers, companyStats } from '../data/team';
import Button from '../components/ui/Button';

const stats = [
  { value: 150, suffix: '+', label: 'پروژه موفق', icon: Rocket, color: 'from-orange-500 to-red-500' },
  { value: 50, suffix: 'M+', label: 'ویو کل', icon: Target, color: 'from-blue-500 to-cyan-500' },
  { value: 98, suffix: '%', label: 'رضایت مشتری', icon: Award, color: 'from-yellow-500 to-amber-500' },
  { value: 5, suffix: '+', label: 'سال تجربه', icon: Heart, color: 'from-purple-500 to-pink-500' },
];

const services = [
  {
    title: 'استراتژی دیجیتال',
    description: 'طراحی سایت، فروشگاه آنلاین، سئو و رنکینگ در گوگل، طراحی اپلیکیشن و اجرای کامل مسیر رشد دیجیتال',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'برندینگ و طراحی',
    description: 'طراحی ساختار برند، طراحی لوگو، انتخاب پالت رنگی، طراحی گرافیک، موشن گرافیک و تولید محتوای بصری',
    color: 'from-purple-500 to-violet-500',
  },
  {
    title: 'تولید محتوا',
    description: 'فیلمبرداری، تصویربرداری، عکاسی حرفه‌ای و تدوین مخصوص اینستاگرام، ریلز و کمپین‌های دیجیتال',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'AI مارکتینگ',
    description: 'تحلیل دیتا و رفتار کاربران، بهینه‌سازی محتوا، افزایش نرخ تعامل و بهبود نرخ تبدیل با هوش مصنوعی',
    color: 'from-red-500 to-orange-500',
  },
  {
    title: 'تبلیغات پولی',
    description: 'گوگل ادز، تبلیغات یکتانت، کمپین‌های هدفمند در تبلیغات فیسبوک و پلتفرم‌های دیجیتال',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    title: 'شریک رشد برند',
    description: 'ترکیب دیجیتال مارکتینگ، سئو، طراحی، تولید محتوا و هوش مصنوعی برای رشد دقیق و نتیجه‌محور',
    color: 'from-indigo-500 to-blue-500',
  },
];

const achievements = [
  'بیش از ۱۵۰ پروژه موفق در ۵ سال',
  'همکاری با بیش از ۵۰ برند معتبر',
  'تولید محتوا با بیش از ۵۰ میلیون ویو',
  'تیم ۱۵+ نفره متخصص',
  'رضایت ۹۸٪ مشتریان',
  'برنده ۱۲ جایزه خلاقیت',
];

const About = () => {
  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                داستان برند Amonix
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                مارکتینگ با{' '}
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  هوش مصنوعی
                </span>
              </h1>
              <p className="text-xl text-dark-400 leading-relaxed">
                Amonix با تمرکز بر مارکتینگ با هوش مصنوعی متولد شد؛
                برای کسب‌وکارهایی که به رشد واقعی، فروش پایدار و دیده شدن هدفمند فکر می‌کنند.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="text-4xl font-black text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-dark-400">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/storage/hero/agency-team.jpg"
                  alt="تیم آژانس Amonix"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  داستان ما
                </h2>
                <p className="text-dark-300 leading-relaxed mb-6">
                  ما در Amonix باور داریم دیجیتال مارکتینگ موفق، نتیجه‌ی کنار هم قرار گرفتن استراتژی، خلاقیت، تکنولوژی و داده است. به همین دلیل خدمات ما از طراحی سایت و طراحی فروشگاه آنلاین شروع می‌شود و تا سئو و رنکینگ در گوگل، طراحی اپلیکیشن و اجرای کامل مسیر رشد دیجیتال ادامه دارد.
                </p>
                <p className="text-dark-300 leading-relaxed mb-8">
                  Amonix به برندها کمک می‌کند هویت منسجم و حرفه‌ای بسازند؛ از برندینگ، طراحی ساختار برند، طراحی لوگو و انتخاب پالت رنگی مناسب گرفته تا طراحی گرافیک، موشن گرافیک و تولید محتوای بصری که با استراتژی مارکتینگ هم‌راستا باشد.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-dark-300 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mb-20">
            <SectionTitle
              subtitle="خدمات ما"
              title="مارکتینگ هوشمند برای رشد پایدار"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <div className="w-7 h-7 bg-white rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-dark-400">{service.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <SectionTitle
              subtitle="تیم ما"
              title="متخصصین پشت موفقیت شما"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.slice(0, 4).map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.1} variant="fadeUp">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative group"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <motion.img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
                        
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <div className="flex justify-center gap-3">
                            {member.social.linkedin && (
                              <a 
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-primary-500 transition-colors"
                              >
                                <Linkedin className="w-5 h-5 text-white" />
                              </a>
                            )}
                            {member.social.instagram && (
                              <a 
                                href={member.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-primary-500 transition-colors"
                              >
                                <Instagram className="w-5 h-5 text-white" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="p-5 text-center">
                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-primary-400 text-sm mb-3">{member.role}</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {member.skills.slice(0, 2).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-white/5 text-dark-400 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden p-12 text-center bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, transparent 50%)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Amonix یک آژانس معمولی نیست
                </h2>
                <p className="text-dark-300 max-w-2xl mx-auto mb-8">
                  ما شریک رشد برندها هستیم و با ترکیب دیجیتال مارکتینگ، سئو، طراحی، تولید محتوا و هوش مصنوعی مسیر رشد را دقیق، قابل اندازه‌گیری و نتیجه‌محور طراحی می‌کنیم.
                </p>
                <Link to="/start">
                  <Button size="lg" icon={<ArrowLeft className="w-5 h-5" />}>
                    شروع همکاری
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
