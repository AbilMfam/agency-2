import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Send, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin,
  ArrowUp,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'فیلمبرداری', path: '/services/video-production' },
    { name: 'تدوین ویدیو', path: '/services/video-editing' },
    { name: 'موشن گرافیک', path: '/services/motion-graphics' },
    { name: 'تولید محتوا', path: '/services/content-creation' },
    { name: 'سوشال مدیا', path: '/services/social-media' },
    { name: 'دیجیتال مارکتینگ', path: '/services/digital-marketing' },
  ],
  company: [
    { name: 'درباره ما', path: '/about' },
    { name: 'نمونه کارها', path: '/portfolio' },
    { name: 'داستان موفقیت', path: '/case-studies' },
    { name: 'جوایز و افتخارات', path: '/awards' },
    { name: 'همکاران ما', path: '/partners' },
    { name: 'پکیج‌ها و قیمت‌ها', path: '/pricing' },
  ],
  support: [
    { name: 'بلاگ', path: '/blog' },
    { name: 'سوالات متداول', path: '/faq' },
    { name: 'تماس با ما', path: '/contact' },
    { name: 'فرآیند کار', path: '/process' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'اینستاگرام' },
  { icon: Send, href: 'https://t.me', label: 'تلگرام' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'لینکدین' },
];

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-64">
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما"
          className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
          disabled={status === 'loading' || status === 'success'}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium disabled:opacity-50 flex items-center gap-2"
      >
        {status === 'loading' ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </motion.button>
    </form>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 text-center lg:text-right">
            <Link to="/" className="inline-flex items-center mb-6">
              <img 
                src="/images/logo.svg" 
                alt="AMONIX" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-dark-400 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              مارکتینگ با هوش مصنوعی برای کسب‌وکارهایی که به رشد واقعی، فروش پایدار و دیده شدن هدفمند فکر می‌کنند.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <a href="tel:+989052010799" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-dark-300 hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">09052010799</span>
              </a>
              <a href="mailto:amonixagency@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-dark-300 hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">amonixagency@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-primary-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 lg:col-span-3">
            <div className="text-center lg:text-right">
              <h4 className="text-white font-bold mb-4 text-sm">خدمات</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-right">
              <h4 className="text-white font-bold mb-4 text-sm">شرکت</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-right">
              <h4 className="text-white font-bold mb-4 text-sm">پشتیبانی</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <h4 className="text-white font-bold">عضو خبرنامه شوید</h4>
              </div>
              <p className="text-dark-400 text-sm">جدیدترین مقالات و ترندها را دریافت کنید</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © ۱۴۰۳ Amonix. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              حریم خصوصی
            </Link>
            <Link to="/terms" className="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
