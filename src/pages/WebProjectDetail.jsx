import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ExternalLink, Globe, Smartphone, Search, 
  ShoppingCart, Code, CheckCircle, TrendingUp, Users, 
  Calendar, Building2, Quote, ChevronLeft, ChevronRight,
  Play
} from 'lucide-react';
import { SectionTitle, ScrollReveal, VideoPlayer } from '../components/ui';
import api from '../services/api';
import { webProjects as defaultWebProjects } from '../data/webProjects';

const iconMap = {
  Globe,
  Smartphone,
  Search,
  ShoppingCart,
  Code,
};

const WebProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(defaultWebProjects.find(p => p.id === slug || p.slug === slug) || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.getWebProject(slug);
        if (response.success && response.data) {
          setProject(response.data);
        } else {
          setError('پروژه یافت نشد');
        }
      } catch (err) {
        // Fallback to static data
        const staticProject = defaultWebProjects.find(p => p.id === slug || p.slug === slug);
        if (staticProject) {
          setProject(staticProject);
        } else {
          setError('پروژه یافت نشد');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-12 h-12 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h1 className="text-2xl font-bold text-white mb-4">{error || 'پروژه یافت نشد'}</h1>
        <Link to="/portfolio" className="text-primary-400 hover:text-primary-300 flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          بازگشت به نمونه کارها
        </Link>
      </div>
    );
  }

  const IconComponent = typeof project.icon === 'string' ? iconMap[project.icon] : Globe;
  const technologies = project.technologies || [];
  const features = project.features || [];
  const results = project.results || {};
  const gallery = project.gallery || [];
  const projectImage = project.image;
  const mockupImage = project.mockup_image || null;

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          {/* Breadcrumb */}
          <ScrollReveal>
            <div className="flex items-center gap-2 text-dark-400 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">خانه</Link>
              <ChevronLeft className="w-4 h-4" />
              <Link to="/portfolio" className="hover:text-white transition-colors">نمونه کارها</Link>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-white">{project.title}</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${project.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-dark-300 text-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                  {project.title}
                </h1>

                <p className="text-dark-300 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {project.client && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <Building2 className="w-5 h-5 text-primary-400 mb-2" />
                      <p className="text-dark-400 text-xs mb-1">مشتری</p>
                      <p className="text-white font-medium text-sm">{project.client}</p>
                    </div>
                  )}
                  {project.industry && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <Users className="w-5 h-5 text-secondary-400 mb-2" />
                      <p className="text-dark-400 text-xs mb-1">صنعت</p>
                      <p className="text-white font-medium text-sm">{project.industry}</p>
                    </div>
                  )}
                  {project.year && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <Calendar className="w-5 h-5 text-accent-400 mb-2" />
                      <p className="text-dark-400 text-xs mb-1">سال</p>
                      <p className="text-white font-medium text-sm">{project.year}</p>
                    </div>
                  )}
                  {project.type && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <Globe className="w-5 h-5 text-green-400 mb-2" />
                      <p className="text-dark-400 text-xs mb-1">نوع پروژه</p>
                      <p className="text-white font-medium text-sm">{project.category}</p>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-5 h-5" />
                      مشاهده سایت
                    </a>
                  )}
                  <Link
                    to="/start"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                  >
                    پروژه مشابه می‌خوام
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Image/Mockup */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={mockupImage || projectImage || '/storage/portfolios/default-portfolio.jpg'}
                    alt={project.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
                </div>
                
                {/* Floating Stats */}
                {Object.keys(results).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 md:right-6 p-4 rounded-xl bg-dark-900/90 backdrop-blur-xl border border-white/10 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      {Object.entries(results).slice(0, 2).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <p className="text-primary-400 font-bold text-xl">{value}</p>
                          <p className="text-dark-400 text-xs">{key}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {Object.keys(results).length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">نتایج پروژه</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(results).map(([key, value], i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <p className="text-3xl font-black text-white mb-2">{value}</p>
                    <p className="text-dark-400 text-sm">{key}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.challenge && (
                <ScrollReveal>
                  <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                        ⚡
                      </span>
                      چالش
                    </h3>
                    <p className="text-dark-300 leading-relaxed">{project.challenge}</p>
                  </div>
                </ScrollReveal>
              )}
              {project.solution && (
                <ScrollReveal delay={0.1}>
                  <div className="p-8 rounded-2xl bg-green-500/5 border border-green-500/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        ✓
                      </span>
                      راه‌حل
                    </h3>
                    <p className="text-dark-300 leading-relaxed">{project.solution}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">تکنولوژی‌های استفاده شده</h2>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <span className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                    {tech}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">ویژگی‌های پروژه</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">گالری تصاویر</h2>
            </ScrollReveal>
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img
                src={gallery[activeImage]}
                alt={`${project.title} - تصویر ${activeImage + 1}`}
                className="w-full h-[500px] object-cover"
              />
              
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(prev => prev === 0 ? gallery.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage(prev => prev === gallery.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-white/10 text-center">
                <Quote className="w-12 h-12 text-primary-400 mx-auto mb-6" />
                <p className="text-xl text-white leading-relaxed mb-6">
                  "{project.testimonial}"
                </p>
                <p className="text-primary-400 font-medium">{project.client}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 relative">
        <div className="container-custom mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-4">پروژه مشابه می‌خواید؟</h2>
            <p className="text-dark-400 mb-8">با ما تماس بگیرید تا پروژه شما را هم به این زیبایی طراحی کنیم</p>
            <Link
              to="/start"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              شروع پروژه
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default WebProjectDetail;
