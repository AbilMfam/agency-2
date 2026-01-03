import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronLeft, Phone, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import api from '../../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const location = useLocation();

  // Fetch services and industries from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, industriesRes] = await Promise.all([
          api.getServices(),
          api.getIndustries()
        ]);
        setServices(servicesRes.data || []);
        setIndustries(industriesRes.data || []);
      } catch (error) {
        console.error('Error fetching nav data:', error);
      }
    };
    fetchData();
  }, []);

  // Build dynamic nav links
  const navLinks = [
    { name: 'خانه', path: '/' },
    { 
      name: 'خدمات', 
      path: '/services',
      submenu: services.slice(0, 6).map(s => ({
        name: s.title || s.short_title,
        path: `/services/${s.slug}`
      }))
    },
    { name: 'نمونه کارها', path: '/portfolio' },
    { 
      name: 'صنایع', 
      path: '/industries',
      submenu: [
        ...industries.map(i => ({
          name: i.title || i.short_title,
          path: `/industries/${i.slug}`
        })),
        { name: 'همه صنایع', path: '/industries' }
      ]
    },
    { name: 'درباره ما', path: '/about' },
    { name: 'بلاگ', path: '/blog' },
    { name: 'تهران', path: '/tehran' },
    { name: 'تماس', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.svg" 
              alt="AMONIX" 
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.path)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1',
                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      ? 'text-primary-400'
                      : 'text-dark-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                  {link.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                <AnimatePresence>
                  {link.submenu && activeSubmenu === link.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-56 py-2 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl"
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          className="block px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/start">
              <Button size="sm">
                شروع پروژه
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-dark-950/95 backdrop-blur-xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img 
                    src="/images/logo.svg" 
                    alt="AMONIX" 
                    className="h-10 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 touch-pan-y">
                {navLinks.map((link) => (
                  <div key={link.path} className="mb-2">
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === link.path ? null : link.path)}
                          className={cn(
                            'w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all touch-manipulation',
                            activeSubmenu === link.path
                              ? 'text-primary-400 bg-primary-500/10'
                              : 'text-white hover:bg-white/5'
                          )}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={cn(
                            'w-5 h-5 transition-transform',
                            activeSubmenu === link.path && 'rotate-180'
                          )} />
                        </button>
                        <AnimatePresence>
                          {activeSubmenu === link.path && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pr-4 py-2 space-y-1">
                                {link.submenu.map((sublink) => (
                                  <Link
                                    key={sublink.path}
                                    to={sublink.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                    {sublink.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block px-4 py-3 rounded-xl text-base font-medium transition-all touch-manipulation',
                          location.pathname === link.path
                            ? 'text-primary-400 bg-primary-500/10'
                            : 'text-white hover:bg-white/5'
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/10 space-y-3">
                <div className="flex gap-3">
                  <a
                    href="tel:+982191234567"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    تماس
                  </a>
                  <a
                    href="https://wa.me/989121234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/20 text-green-400 font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    واتساپ
                  </a>
                </div>
                <Link to="/start" onClick={() => setIsOpen(false)} className="block">
                  <Button className="w-full py-3">شروع پروژه رایگان</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
