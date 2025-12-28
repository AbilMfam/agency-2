import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Star, TrendingUp, Users, Play, Coffee, Car, Scissors, Stethoscope, ShoppingBag, Dumbbell } from 'lucide-react';
import { SectionTitle, ScrollReveal, ProjectTimeline } from '../components/ui';
import api from '../services/api';
import React from 'react';

const iconMap = {
  Coffee,
  Car,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Dumbbell,
};

const Industry = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [industryResponse, industriesResponse] = await Promise.all([
          api.getIndustry(slug),
          api.getIndustries()
        ]);
        
        if (industryResponse.success && industryResponse.data) {
          setIndustry(industryResponse.data);
        }
        
        if (industriesResponse.success && industriesResponse.data) {
          setIndustries(industriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching industry data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">صفحه یافت نشد</h1>
          <Link to="/industries" className="text-primary-400 hover:underline">
            بازگشت به صنایع
          </Link>
        </div>
      </div>
    );
  }

  
  return (
    <div className="pt-24">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={industry.hero_image || industry.image?.startsWith('http') ? industry.image : `http://127.0.0.1:8000${industry.image}`}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950 via-dark-950/80 to-dark-950/60" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <ScrollReveal>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-6 shadow-2xl`}
              >
                {industry.icon && iconMap[industry.icon] && 
                React.createElement(iconMap[industry.icon], { className: "w-10 h-10 text-white" })
              }
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {industry.title}
              </h1>

              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                {industry.full_description || industry.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/start"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                >
                  شروع همکاری
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  نمونه کارها
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.results?.map((result, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <div className={`text-5xl font-black bg-gradient-to-r ${industry.color} bg-clip-text text-transparent mb-2`}>
                    {result.metric}
                  </div>
                  <p className="text-dark-400">{result.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="خدمات تخصصی"
              title={`خدمات ما برای ${industry.short_title || industry.title}`}
              description="خدمات تخصصی طراحی شده برای نیازهای این صنعت"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(industry.services || []).map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-4`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                    {service}
                  </h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="فرآیند کار"
              title="چگونه کار می‌کنیم؟"
              description="مراحل همکاری ما از شروع تا نتیجه"
            />
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ProjectTimeline />
          </div>
        </div>
      </section>

      {industry.caseStudy && (
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <ScrollReveal>
              <SectionTitle
                subtitle="نمونه موفق"
                title={`داستان موفقیت ${industry.caseStudy.title}`}
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={industry.caseStudy.image}
                    alt={industry.caseStudy.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {industry.caseStudy.title}
                  </h3>
                  <p className="text-dark-300 mb-6 leading-relaxed text-lg">
                    {industry.caseStudy.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {industry.caseStudy.results.map((result, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${industry.color} text-white font-bold`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>

                  {industry.testimonial && (
                    <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-dark-300 mb-3 italic">
                        "{industry.testimonial.text}"
                      </p>
                      <p className="text-white font-medium">{industry.testimonial.author}</p>
                      <p className="text-dark-500 text-sm">{industry.testimonial.role}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="سایر صنایع"
              title="خدمات ما در صنایع دیگر"
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.filter(i => i.id !== industry.id).map((ind, index) => {
              return (
                <ScrollReveal key={ind.id} delay={index * 0.05}>
                  <Link to={`/industries/${ind.slug}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center group"
                    >
                      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${ind.color} flex items-center justify-center mb-3`}>
                        {ind.icon && iconMap[ind.icon] && 
                          React.createElement(iconMap[ind.icon], { className: "w-6 h-6 text-white" })
                        }
                      </div>
                      <p className="text-white text-sm font-medium group-hover:text-primary-400 transition-colors">
                        {ind.shortTitle}
                      </p>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                آماده شروع هستید؟
              </h2>
              <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
                همین حالا با ما تماس بگیرید و یک مشاوره رایگان دریافت کنید
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/start"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all flex items-center gap-2"
                >
                  شروع پروژه
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                >
                  تماس با ما
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Industry;
