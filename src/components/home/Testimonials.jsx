import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { SectionTitle, ScrollReveal } from '../ui';
import api from '../../services/api';
import { testimonials as defaultTestimonials } from '../../data/testimonials';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

const TestimonialCard = ({ testimonial }) => {
  console.log('Testimonial data:', testimonial);
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative p-6 h-[320px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 group flex flex-col"
      style={{ transformOrigin: 'center bottom' }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 12 }}
        transition={{ duration: 0.3 }}
      >
        <Quote className="w-10 h-10 text-primary-500/50 mb-4" />
      </motion.div>
      
      <p className="text-dark-300 leading-relaxed mb-6 relative z-10 flex-grow">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        <motion.div 
          whileHover={{ rotate: 5 }}
          className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-primary-500/30"
        >
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex flex-col">
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-dark-400">{testimonial.role}</p>
          {testimonial.results && (
            <p className="text-xs text-primary-400 mt-1">{testimonial.results}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.getTestimonials();
        if (response.success && response.data) {
          // Map API fields to frontend expected fields
          const mappedTestimonials = response.data.map(t => ({
            ...t,
            name: t.author,
            text: t.content,
            rating: t.rating || 5
          }));
          setTestimonials(mappedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to static data
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="section-padding relative bg-dark-900/50 overflow-visible">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="نظرات مشتریان"
            title="مشتریان درباره ما چه می‌گویند؟"
            description="تجربه همکاری با ما از زبان مشتریان"
          />
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : testimonials.length > 0 ? (
          <ScrollReveal delay={0.2}>
            <div className="relative overflow-visible pt-12 pb-20">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{ 
                  delay: 4000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false,
                }}
                pagination={{ 
                  clickable: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="overflow-visible pb-20"
                style={{ height: 'auto' }}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="h-auto">
                    <div className="h-full min-h-[320px] flex">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </ScrollReveal>
        ) : (
          <p className="text-center text-dark-400 py-12">نظری ثبت نشده است</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;