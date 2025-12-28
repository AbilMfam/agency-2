import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Sparkles, Rocket, Eye, Award } from 'lucide-react';
import Button from '../ui/Button';
import VideoPlayer from '../ui/VideoPlayer';
import { AnimatedCounter, FloatingElements } from '../ui';

const stats = [
  { value: 150, suffix: '+', label: 'پروژه موفق', icon: Rocket, color: 'from-orange-500 to-red-500' },
  { value: 50, suffix: 'M+', label: 'ویو کل', icon: Eye, color: 'from-blue-500 to-cyan-500' },
  { value: 98, suffix: '%', label: 'رضایت مشتری', icon: Award, color: 'from-yellow-500 to-amber-500' },
];

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-950 to-dark-950" />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-100px] right-[-100px] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.4) 0%, rgba(217,70,239,0.1) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />

        <FloatingElements />

        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container-custom mx-auto px-4 md:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-dark-300">آژانس خلاق دیجیتال در تهران</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-white">خلاقیت را با </span>
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              نتیجه
            </span>
            <br />
            <span className="text-white">ترکیب می‌کنیم</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-dark-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            تولید محتوای ویدیویی با ویوهای میلیونی، رشد ارگانیک پیج و 
            استراتژی‌های دیجیتال مارکتینگ که نتیجه می‌دهند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/start">
              <Button size="lg" icon={<ArrowLeft className="w-5 h-5" />}>
                شروع پروژه
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="secondary" size="lg" icon={<Play className="w-5 h-5" />} iconPosition="left">
                نمونه کارها
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-black text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 md:mt-20 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10">
            <VideoPlayer
              src="/storage/videos/sample/hero-video.mp4"
              poster="/storage/hero/agency-team.jpg"
              autoPlay={false}
              muted={true}
              loop={true}
              controls={true}
              className="w-full"
            />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-center justify-between pointer-events-none">
              <div>
                <p className="text-white font-bold text-sm md:text-base lg:text-lg">شوریل آژانس خلاق</p>
                <p className="text-dark-400 text-xs md:text-sm hidden sm:block">مشاهده نمونه کارها و پروژه‌های ما</p>
              </div>
              <div className="flex items-center gap-2 text-dark-400 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl text-xs md:text-sm">2:30</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
