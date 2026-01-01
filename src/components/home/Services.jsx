import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, Film, Sparkles, Camera, FileText, Lightbulb, Share2, TrendingUp, Megaphone, Palette, Globe, Search, Smartphone, Users } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../ui';
import api from '../../services/api';
import { services as defaultServices } from '../../data/services';

const iconMap = {
  Video,
  Film,
  Sparkles,
  Camera,
  FileText,
  Lightbulb,
  Share2,
  TrendingUp,
  Megaphone,
  Palette,
  Globe,
  Search,
  Smartphone,
  Users
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = typeof service.icon === 'string' ? iconMap[service.icon] : service.icon || Video;
  const features = Array.isArray(service.features?.ui_suggestion) ? service.features.ui_suggestion : [];

  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <Link to={`/services/${service.slug || service.id}`}>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0">
            <img
              src={service.image || '/storage/services/default-service.jpg'}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <motion.div 
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center mb-4 shadow-lg`}
              animate={{ y: isHovered ? -5 : 0 }}
            >
              <Video className="w-7 h-7 text-white" />
            </motion.div>
            
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4 line-clamp-2">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {features.slice(0, 3).map((feature, i) => (
                <span key={i} className="px-1.5 sm:px-2 py-1 rounded-md bg-white/10 text-white text-xs">
                  {feature}
                </span>
              ))}
            </div>
            
            <motion.div 
              className="flex items-center gap-2 text-primary-400 font-medium"
              animate={{ x: isHovered ? -5 : 0 }}
            >
              <span className="text-xs sm:text-sm">بیشتر بدانید</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
};

const Services = () => {
  const [services, setServices] = useState(defaultServices.slice(0, 6));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        if (response.success && response.data) {
          setServices(response.data.slice(0, 6));
        }
      } catch (error) {
        // Fallback to static data
        setServices(defaultServices.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="خدمات ما"
            title="همه چیز برای رشد دیجیتال شما"
            description="از ایده تا اجرا، تمام خدمات مورد نیاز برای موفقیت در فضای دیجیتال"
          />
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        <ScrollReveal delay={0.5}>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/30 font-medium transition-all duration-300"
            >
              مشاهده همه خدمات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
