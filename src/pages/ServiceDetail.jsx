import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowRight, Play, Star, Users, Clock, Award, X, Video, Film, Camera, FileText, Share2, TrendingUp, Palette, Globe, Search, Eye } from 'lucide-react';
import { Button, Card, SectionTitle, ScrollReveal } from '../components/ui';
import api from '../services/api';
import { useState, useEffect } from 'react';
import React from 'react';
import { services as defaultServices } from '../data/services';
import { portfolioItems as defaultPortfolios } from '../data/portfolio';

// PortfolioCard component for related portfolios
const PortfolioCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/portfolio/${item.id}`}>
        <motion.div 
          whileHover={{ y: -8 }}
          className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <motion.img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
              >
                <Play className="w-6 h-6 text-white mr-[-2px]" fill="white" />
              </motion.div>
            </motion.div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl text-white text-xs flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {item.views}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white text-xs">
                  {item.category}
                </span>
                <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.views || '0'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};


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
  const [packages, setPackages] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [serviceResponse, servicesResponse, packagesResponse, portfoliosResponse] = await Promise.all([
          api.getService(slug),
          api.getServices(),
          api.getPackages(),
          api.getPortfolios()
        ]);
        
        if (serviceResponse.success && serviceResponse.data) {
          setService(serviceResponse.data);
        }
        
        if (servicesResponse.success && servicesResponse.data) {
          setServices(servicesResponse.data);
        }

        if (packagesResponse.success && packagesResponse.data?.length > 0) {
          setPackages(packagesResponse.data.map(pkg => ({
            ...pkg,
            features: pkg.features || [],
            notIncluded: pkg.not_included || [],
            popular: pkg.is_popular,
          })));
        }

        if (portfoliosResponse.success && portfoliosResponse.data) {
          setPortfolios(portfoliosResponse.data);
        } else {
          // Fallback to static portfolio data
          setPortfolios(defaultPortfolios);
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
  
  // Filter portfolios by service title - handle both Persian and English categories and services array
  const relatedPortfolios = portfolios
    .filter(portfolio => {
      // Direct match with service title
      if (portfolio.category === service.title) return true;
      
      // Check if service title is in portfolio services array
      if (portfolio.services && portfolio.services.includes(service.title)) return true;
      
      // Handle service title variations and related services
      const serviceVariations = {
        'تدوین ویدیو': ['فیلمبرداری', 'تدوین', 'تولید محتوا'],
        'فیلمبرداری': ['فیلمبرداری', 'تدوین', 'تولید محتوا'],
        'تولید محتوا': ['فیلمبرداری', 'تدوین', 'تولید محتوا', 'سوشال مدیا'],
        'موشن گرافیک': ['موشن گرافیک', 'فیلمبرداری', 'تدوین'],
        'عکاسی': ['عکاسی', 'فیلمبرداری'],
        'سوشال مدیا': ['تولید محتوا', 'سوشال مدیا'],
        'دیجیتال مارکتینگ': ['تولید محتوا', 'سوشال مدیا', 'فیلمبرداری']
      };
      
      // Check if any variation matches portfolio services
      const variations = serviceVariations[service.title] || [service.title];
      return portfolio.services && portfolio.services.some(service => variations.includes(service));
      
      // Map service titles to portfolio categories (fallback)
      const categoryMapping = {
        'سئو': 'seo',
        'طراحی سایت': 'web-design',
        'اپلیکیشن': 'app-design',
        'فیلمبرداری': 'filming',
        'عکاسی': 'photography',
        'طراحی گرافیک': 'graphic-design',
        'موشن گرافیک': 'motion-graphics',
        'سوشال مدیا': 'social-media',
        'تبلیغات paid': 'paid-ads',
        'AI مارکتینگ': 'ai-marketing',
        'برندینگ': 'branding',
        'تدوین ویدیو': 'filming',
        'تولید محتوا': 'filming'
      };
      
      return portfolio.category === categoryMapping[service.title];
    })
    .slice(0, 3);
  
  // Use packages from state (fetched from API) or fallback to defaults
  const displayPackages = packages.length > 0 ? packages : [
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

  // Service-specific background images
  const serviceBackgrounds = {
    'سئو': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=90&auto=format',
    'طراحی سایت': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&h=1080&fit=crop&q=90&auto=format',
    'اپلیکیشن': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop&q=90&auto=format',
    'فیلمبرداری': 'https://images.unsplash.com/photo-1573164713611-4e6db56b5bfc?w=1920&h=1080&fit=crop&q=90&auto=format',
    'عکاسی': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=1080&fit=crop&q=90&auto=format',
    'طراحی گرافیک': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&h=1080&fit=crop&q=90&auto=format',
    'موشن گرافیک': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop&q=90&auto=format',
    'سوشال مدیا': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop&q=90&auto=format',
    'تبلیغات paid': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=90&auto=format',
    'AI مارکتینگ': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=90&auto=format',
    'برندینگ': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&q=90&auto=format',
    'تدوین ویدیو': 'https://images.unsplash.com/photo-1596487101266-567991b9918e?w=1920&h=1080&fit=crop&q=90&auto=format',
    'تولید محتوا': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=1080&fit=crop&q=90&auto=format',
    'دیجیتال مارکتینگ': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=90&auto=format'
  };

  const backgroundImage = serviceBackgrounds[service.title] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=90&auto=format';

  return (
    <div className="pt-24">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={`${service.title} Background`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-950/70" />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950 via-dark-950/80 to-dark-950/60" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 py-20 relative z-10">
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

            <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl leading-relaxed">
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">درباره این خدمت</h2>
                <div className="text-dark-300 mb-8 leading-relaxed text-base md:text-lg space-y-4">
                  {service.full_description ? (
                    <div dangerouslySetInnerHTML={{ __html: service.full_description }} />
                  ) : service.fullDescription ? (
                    <p>{service.fullDescription}</p>
                  ) : (
                    <p>{service.description}</p>
                  )}
                </div>

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

      {/* Related Portfolios Section */}
      {relatedPortfolios.length > 0 ? (
        <section className="section-padding pt-0">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <SectionTitle
                subtitle="نمونه کارها"
                title={`نمونه‌کارهای موفق ${service.title}`}
                description={`مشاهده آخرین پروژه‌های موفق در زمینه ${service.title}`}
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {relatedPortfolios.map((portfolio, index) => (
                <ScrollReveal key={portfolio.id} delay={index * 0.1}>
                  <PortfolioCard item={portfolio} index={index} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <Link 
                  to={`/portfolios?category=${(() => {
                    // Map service titles to portfolio categories for URL
                    const categoryMapping = {
                      'سئو': 'seo',
                      'طراحی سایت': 'web-design',
                      'اپلیکیشن': 'app-design',
                      'فیلمبرداری': 'filming',
                      'عکاسی': 'photography',
                      'طراحی گرافیک': 'graphic-design',
                      'موشن گرافیک': 'motion-graphics',
                      'سوشال مدیا': 'social-media',
                      'تبلیغات paid': 'paid-ads',
                      'AI مارکتینگ': 'ai-marketing',
                      'برندینگ': 'branding',
                      'تدوین ویدیو': 'filming',
                      'تولید محتوا': 'filming'
                    };
                    return categoryMapping[service.title] || service.title;
                  })()}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                >
                  <span>مشاهده همه نمونه‌کارهای {service.title}</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ) : (
        // Show section with CTA even when no portfolios exist
        <section className="section-padding pt-0">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <SectionTitle
                subtitle="نمونه کارها"
                title={`نمونه‌کارهای موفق ${service.title}`}
                description={`به زودی نمونه‌کارهای جدید در زمینه ${service.title} اینجا اضافه می‌شوند`}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12">
                <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-white/10 rounded-2xl p-12">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">در حال آماده‌سازی نمونه‌کارها</h3>
                  <p className="text-dark-300 mb-8 max-w-md mx-auto">
                    ما در حال جمع‌آوری بهترین نمونه‌کارهای {service.title} هستیم. به زودی پروژه‌های موفق ما را در این بخش مشاهده خواهید کرد.
                  </p>
                  <Link 
                    to={`/portfolios?category=${(() => {
                      const categoryMapping = {
                        'سئو': 'seo',
                        'طراحی سایت': 'web-design',
                        'اپلیکیشن': 'app-design',
                        'فیلمبرداری': 'filming',
                        'عکاسی': 'photography',
                        'طراحی گرافیک': 'graphic-design',
                        'موشن گرافیک': 'motion-graphics',
                        'سوشال مدیا': 'social-media',
                        'تبلیغات paid': 'paid-ads',
                        'AI مارکتینگ': 'ai-marketing',
                        'برندینگ': 'branding'
                      };
                      return categoryMapping[service.title] || service.title;
                    })()}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                  >
                    <span>مشاهده همه نمونه‌کارها</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

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
            {displayPackages.map((pkg, index) => (
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
