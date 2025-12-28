import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Coffee, Car, Scissors, Stethoscope, ShoppingBag, Dumbbell } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../components/ui';
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

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const response = await api.getIndustries();
        if (response.success && response.data) {
          setIndustries(response.data);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="صنایع"
              title="خدمات تخصصی برای هر صنعت"
              description="ما برای هر صنعت، راهکارهای اختصاصی و تخصصی ارائه می‌دهیم"
            />
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => {
              return (
                <ScrollReveal key={industry.id} delay={index * 0.1}>
                  <Link to={`/industries/${industry.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="relative h-[450px] rounded-2xl overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                      </div>

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${industry.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center mb-4 shadow-lg`}
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                        >
                          {industry.icon && iconMap[industry.icon] && 
                            React.createElement(iconMap[industry.icon], { className: "w-8 h-8 text-white" })
                          }
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                          {industry.short_title || industry.title}
                        </h3>

                        <p className="text-dark-300 mb-4 line-clamp-2">
                          {industry.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {(industry.services || []).slice(0, 3).map((service, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/10 text-white text-xs"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-primary-400 font-medium">
                          <span>مشاهده جزئیات</span>
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              );
            })}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                صنعت شما در لیست نیست؟
              </h2>
              <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
                نگران نباشید! ما برای هر نوع کسب‌وکاری راهکار داریم. با ما تماس بگیرید.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                تماس با ما
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Industries;
