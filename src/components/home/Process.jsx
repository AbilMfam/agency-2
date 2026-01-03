import { motion } from 'framer-motion';
import { Search, Lightbulb, Film, Rocket, BarChart3 } from 'lucide-react';
import { SectionTitle } from '../ui';

const steps = [
  {
    icon: Search,
    title: 'کشف و تحلیل',
    description: 'شناخت کسب‌وکار، رقبا و مخاطبان هدف شما',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightbulb,
    title: 'استراتژی و ایده',
    description: 'طراحی استراتژی محتوا و ایده‌پردازی خلاقانه',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Film,
    title: 'تولید محتوا',
    description: 'فیلمبرداری، عکاسی و تولید محتوای حرفه‌ای',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'انتشار و اجرا',
    description: 'انتشار هوشمند و مدیریت کمپین‌ها',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'تحلیل و بهینه‌سازی',
    description: 'گزارش‌دهی و بهینه‌سازی مستمر',
    color: 'from-red-500 to-rose-500',
  },
];

const Process = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom mx-auto">
        <SectionTitle
          subtitle="فرآیند کار"
          title="چطور کار می‌کنیم؟"
          description="مسیر همکاری ما از ایده تا نتیجه"
        />

        <div className="relative">
          

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-9 h-9 text-white" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border-2 border-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-dark-400 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
