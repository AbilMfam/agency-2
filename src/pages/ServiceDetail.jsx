import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowRight, Play, Star, Users, Clock, Award, X, Video, Film, Camera, FileText, Share2, TrendingUp, Palette, Globe, Search } from 'lucide-react';
import { Button, Card, SectionTitle, ScrollReveal } from '../components/ui';
import api from '../services/api';
import { useState, useEffect } from 'react';
import React from 'react';
import { services as defaultServices } from '../data/services';


const serviceGallery = {
  'video-production': [
    'https://images.unsplash.com/photo-1573164713611-4e6db56b5bfc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
  ],
  'video-editing': [
    'https://images.unsplash.com/photo-1596487101266-567991b9918e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  ],
  'motion-graphics': [
    'https://images.unsplash.com/photo-1573164713611-4e6db56b5bfc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
  ],
  'content-creation': [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596487101266-567991b9918e?w=800&h=600&fit=crop',
  ],
  'social-media': [
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7238a3?w=800&h=600&fit=crop',
  ],
  'digital-marketing': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  ],
};

const iconMap = {
  'video-production': Video,
  'video-editing': Film,
  'motion-graphics': Camera,
  'content-creation': FileText,
  'social-media': Share2,
  'digital-marketing': TrendingUp,
  'Video': Video,
  'Film': Film,
  'Camera': Camera,
  'FileText': FileText,
  'Share2': Share2,
  'TrendingUp': TrendingUp,
  'Palette': Palette,
  'Globe': Globe,
  'Search': Search,
};

const defaultGallery = [
  'https://images.unsplash.com/photo-1573164713611-4e6db56b5bfc?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [serviceResponse, servicesResponse] = await Promise.all([
          api.getService(slug),
          api.getServices()
        ]);
        
        if (serviceResponse.success && serviceResponse.data) {
          setService(serviceResponse.data);
        }
        
        if (servicesResponse.success && servicesResponse.data) {
          setServices(servicesResponse.data);
        }
      } catch (error) {
        // Fallback to static data
        setService(defaultServices.find(s => s.id === slug || s.slug === slug));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">خدمت یافت نشد</h1>
          <Link to="/services">
            <Button>بازگشت به خدمات</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);
  const gallery = service?.gallery || serviceGallery[slug] || defaultGallery;
  
  // Default packages if not provided by API
  const packages = service.packages || [
    {
      id: 1,
      name: 'استاندارد',
      price: 'از ۲ میلیون تومان',
      features: ['تحویل ۷ روزه', '۲ ویرایش', 'کیفیت HD', 'پشتیبانی ۱ ماهه'],
      notIncluded: ['فایل‌های اصلی', 'تحویل فوری'],
      popular: false
    },
    {
      id: 2,
      name: 'حرفه‌ای',
      price: 'از ۵ میلیون تومان',
      features: ['تحویل ۵ روزه', '۵ ویرایش', 'کیفیت 4K', 'پشتیبانی ۳ ماهه', 'فایل‌های اصلی'],
      notIncluded: ['تحویل فوری'],
      popular: true
    },
    {
      id: 3,
      name: 'پریمیوم',
      price: 'از ۱۰ میلیون تومان',
      features: ['تحویل ۳ روزه', 'ویرایش نامحدود', 'کیفیت 4K', 'پشتیبانی ۶ ماهه', 'فایل‌های اصلی', 'تحویل فوری'],
      notIncluded: [],
      popular: false
    }
  ];

  return (
    <div className="pt-24">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image && !service.image.includes('/storage/') ? service.image : gallery[0]}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-950/80" />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950 via-dark-950/90 to-dark-950/70" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-6"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به خدمات
            </Link>

            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center mb-6`}>
              {(() => {
                const IconComponent = iconMap[service.icon] || iconMap[service.id] || Video;
                return <IconComponent className="w-8 h-8 text-white" />;
              })()}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {service.title}
            </h1>

            <p className="text-xl text-dark-300 mb-8 max-w-2xl leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/start">
                <Button icon={<ArrowLeft className="w-4 h-4" />}>
                  شروع پروژه
                </Button>
              </Link>
              <a href="#pricing" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all">
                مشاهده قیمت‌ها
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-white mb-6">درباره این خدمت</h2>
                <p className="text-dark-300 mb-8 leading-relaxed text-lg">
                  {service.fullDescription}
                </p>

                {/* Persuasive Description Section - Ready for content */}
                {service.persuasiveContent && (
                  <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-white/10">
                    {service.persuasiveContent.headline && (
                      <h3 className="text-2xl font-bold text-white mb-4">{service.persuasiveContent.headline}</h3>
                    )}
                    {service.persuasiveContent.subheadline && (
                      <p className="text-lg text-dark-300 mb-6">{service.persuasiveContent.subheadline}</p>
                    )}
                    {service.persuasiveContent.benefits && (
                      <ul className="space-y-3 mb-6">
                        {service.persuasiveContent.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-dark-300">
                            <Check className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {service.persuasiveContent.cta && (
                      <Link to="/start">
                        <Button icon={<ArrowLeft className="w-4 h-4" />}>
                          {service.persuasiveContent.cta}
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {gallery.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative rounded-xl overflow-hidden aspect-video"
                    >
                      <img
                        src={img}
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">ویژگی‌ها و خروجی‌ها</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features?.ui_suggestion?.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-dark-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">مناسب برای</h2>
                  <div className="flex flex-wrap gap-3">
                    {service.suitableFor?.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-dark-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <Users className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">۵۰+</div>
                    <div className="text-dark-400 text-sm">پروژه موفق</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">۴.۹</div>
                    <div className="text-dark-400 text-sm">امتیاز مشتریان</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">۷۲h</div>
                    <div className="text-dark-400 text-sm">تحویل سریع</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <Award className="w-6 h-6 text-secondary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">۱۰۰%</div>
                    <div className="text-dark-400 text-sm">تضمین کیفیت</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32"
              >
                <Card className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    آماده شروع هستید؟
                  </h3>
                  <p className="text-dark-400 mb-6">
                    همین حالا درخواست مشاوره رایگان ثبت کنید.
                  </p>
                  <Link to="/start">
                    <Button className="w-full mb-4" icon={<ArrowLeft className="w-4 h-4" />}>
                      شروع پروژه
                    </Button>
                  </Link>
                  <a href="#pricing">
                    <Button variant="secondary" className="w-full">
                      مشاهده پکیج‌ها
                    </Button>
                  </a>
                </Card>

                <Card className="p-6 mt-6">
                  <h4 className="font-bold text-white mb-4">خدمات مرتبط</h4>
                  <div className="space-y-3">
                    {relatedServices?.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${s.color} flex items-center justify-center`}>
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-dark-300 hover:text-white transition-colors">
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="پکیج‌ها و قیمت‌ها"
              title="پکیج مناسب خود را انتخاب کنید"
              description="پکیج‌های متنوع برای هر نوع کسب‌وکار و بودجه"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full"
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" fill="white" />
                        محبوب‌ترین
                      </span>
                    </div>
                  )}
                  
                  <Card className={`p-6 h-full flex flex-col ${pkg.popular ? 'border-primary-500/50 bg-primary-500/5' : ''}`}>
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-3`}>
                        <span className="text-xl font-black text-white">
                          {pkg.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      <p className="text-dark-400 text-sm">{pkg.subtitle}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{pkg.price}</span>
                        {pkg.period && (
                          <span className="text-dark-400 text-sm">تومان / {pkg.period}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 mb-4">
                        {pkg.features.slice(0, 5).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-dark-300 text-sm">
                            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-green-400" />
                            </div>
                            {feature}
                          </li>
                        ))}
                        {pkg.notIncluded.slice(0, 2).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-dark-500 text-sm">
                            <div className="w-4 h-4 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                              <X className="w-2.5 h-2.5 text-dark-500" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/start">
                      <Button
                        variant={pkg.popular ? 'primary' : 'secondary'}
                        className="w-full"
                        size="sm"
                      >
                        انتخاب پکیج
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
