import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, TrendingUp, Play, ExternalLink, ArrowLeft, Target, Coffee, ShoppingBag, Car, Shirt, Camera, Video, Monitor, Smartphone, Search, Megaphone, Users, Brain, Palette } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../components/ui';
import { WebProjects } from '../components/home';
import api from '../services/api';


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

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check for category query parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Define all categories with their colors (same as Portfolio page)
  const allCategories = [
    { id: 'all', title: 'همه پروژه‌ها', icon: Target, color: 'primary' },
    // Visual categories - Purple
    { id: 'filming', title: 'فیلمبرداری و تدوین ویدیو', icon: Video, color: 'purple' },
    { id: 'graphic-design', title: 'طراحی گرافیک', icon: Palette, color: 'purple' },
    { id: 'photography', title: 'عکاسی', icon: Camera, color: 'purple' },
    { id: 'motion-graphics', title: 'موشن گرافیک', icon: Play, color: 'purple' },
    // Digital categories - Blue
    { id: 'web-design', title: 'طراحی سایت', icon: Monitor, color: 'blue' },
    { id: 'app-design', title: 'طراحی اپلیکیشن', icon: Smartphone, color: 'blue' },
    { id: 'seo', title: 'سئو و رنکینگ گوگل', icon: Search, color: 'blue' },
    // Advertising categories - Green
    { id: 'paid-ads', title: 'تبلیغات paid', icon: Megaphone, color: 'green' },
    { id: 'social-media', title: 'سوشال مدیا', icon: Users, color: 'green' },
    { id: 'ai-marketing', title: 'AI مارکتینگ', icon: Brain, color: 'green' },
    { id: 'branding', title: 'برندینگ', icon: Target, color: 'green' }
  ];


  useEffect(() => {
    fetchPortfolios();
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.getServices();
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const response = await api.getPortfolios();
      setPortfolioItems(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // Create categories array
  const categories = allCategories;

  if (loading) {
    return (
      <div className="pt-24">
        <div className="container-custom mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="نمونه کارها"
              title="پروژه‌های ما"
              description="نمونه کارهای برجسته‌ی ما را در صنایع مختلف مشاهده کنید"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* All Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;
                const colorClasses = {
                  primary: 'from-primary-500 to-secondary-500 shadow-primary-500/25 hover:bg-primary-500/10',
                  purple: 'from-purple-500 to-purple-600 shadow-purple-500/25 hover:bg-purple-500/10',
                  blue: 'from-blue-500 to-blue-600 shadow-blue-500/25 hover:bg-blue-500/10',
                  green: 'from-green-500 to-green-600 shadow-green-500/25 hover:bg-green-500/10'
                };
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? `bg-gradient-to-r ${colorClasses[category.color]} text-white shadow-lg`
                        : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.title}
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
