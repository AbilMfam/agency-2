import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, Film, Camera, FileText, Share2, TrendingUp, Palette, Globe, Search } from 'lucide-react';
import { SectionTitle, Card } from '../components/ui';
import api from '../services/api';

const iconMap = {
  Video,
  Film,
  Camera,
  FileText,
  Share2,
  TrendingUp,
  Palette,
  Globe,
  Search,
  'video-production': Video,
  'video-editing': Film,
  'motion-graphics': Camera,
  'content-creation': FileText,
  'social-media': Share2,
  'digital-marketing': TrendingUp,
  'branding': Palette,
  'graphic-design': Palette,
  'web-design': Globe,
  'seo': Search,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.getServices();
        if (response.success && response.data) {
          setServices(response.data);
        }
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="خدمات ما"
            title="خدمات جامع دیجیتال مارکتینگ"
            description="همه چیز برای رشد و موفقیت کسب‌وکار شما در فضای دیجیتال"
          />

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/services/${service.slug}`}>
                  <Card className="p-8 h-full group cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {(() => {
                        const IconComponent = iconMap[service.icon] || iconMap[service.id] || iconMap[service.slug] || Video;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-dark-400 mb-6 leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features?.ui_suggestion?.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 rounded-full bg-white/5 text-dark-400 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary-400 font-medium text-sm sm:text-base">
                      <span>اطلاعات بیشتر</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
