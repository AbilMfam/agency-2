import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, X, Star, ArrowLeft } from 'lucide-react';
import { packages as defaultPackages } from '../data/packages';
import { SectionTitle, Card, Button } from '../components/ui';
import api from '../services/api';

const Pricing = () => {
  const [packages, setPackages] = useState(defaultPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.getPackages();
        if (response.success && response.data?.length > 0) {
          setPackages(response.data.map(pkg => ({
            ...pkg,
            features: pkg.features || [],
            notIncluded: pkg.not_included || [],
            popular: pkg.is_popular,
          })));
        }
      } catch (error) {
        // Fallback to default packages
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/10 to-transparent rounded-full" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="پکیج‌ها و قیمت‌ها"
            title="پکیج مناسب خود را انتخاب کنید"
            description="پکیج‌های متنوع برای هر نوع کسب‌وکار و بودجه"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" fill="white" />
                      محبوب‌ترین
                    </span>
                  </div>
                )}
                
                <Card className={`p-8 h-full flex flex-col ${pkg.popular ? 'border-primary-500/50 bg-primary-500/5' : ''}`}>
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl font-black text-white">
                        {pkg.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-dark-400 text-sm">{pkg.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{pkg.price}</span>
                      {pkg.period && (
                        <span className="text-dark-400">تومان / {pkg.period}</span>
                      )}
                    </div>
                    <p className="text-dark-400 text-sm mt-2">{pkg.description}</p>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-dark-300">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          {feature}
                        </li>
                      ))}
                      {pkg.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-dark-500">
                          <div className="w-5 h-5 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                            <X className="w-3 h-3 text-dark-500" />
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
                      icon={<ArrowLeft className="w-4 h-4" />}
                    >
                      انتخاب پکیج
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                نیاز به پکیج سفارشی دارید؟
              </h3>
              <p className="text-dark-400 mb-6">
                اگر نیازهای خاصی دارید که در پکیج‌های بالا نیست، با ما تماس بگیرید 
                تا پکیج اختصاصی برای شما طراحی کنیم.
              </p>
              <Link to="/contact">
                <Button variant="secondary">
                  تماس با ما
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
