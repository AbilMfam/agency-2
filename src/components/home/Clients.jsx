import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Stethoscope, ShoppingBag, Car, Shirt, UtensilsCrossed, Lightbulb, Sparkles, Building2, Dumbbell, GraduationCap, Plane } from 'lucide-react';
import api from '../../services/api';

const iconMap = {
  Coffee, Stethoscope, ShoppingBag, Car, Shirt, UtensilsCrossed, 
  Lightbulb, Sparkles, Building2, Dumbbell, GraduationCap, Plane
};

const InfiniteMarquee = ({ children, direction = 'left', speed = 30 }) => {
  const marqueeRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      const firstChild = marqueeRef.current.querySelector('.marquee-content');
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [children]);

  const animationDuration = contentWidth / speed;

  return (
    <div className="overflow-hidden" ref={marqueeRef}>
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? [-contentWidth, 0] : [0, -contentWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: animationDuration || 30,
            ease: 'linear',
          },
        }}
        style={{ width: 'fit-content' }}
      >
        <div className="flex gap-6 marquee-content">
          {children}
        </div>
        <div className="flex gap-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const defaultClients = [
  { name: 'کافه لمیز', icon: 'Coffee', color: 'from-amber-500 to-orange-500' },
  { name: 'کلینیک رز', icon: 'Stethoscope', color: 'from-pink-500 to-rose-500' },
  { name: 'فروشگاه آریا', icon: 'ShoppingBag', color: 'from-purple-500 to-violet-500' },
  { name: 'نمایشگاه پرشیا', icon: 'Car', color: 'from-blue-500 to-cyan-500' },
  { name: 'بوتیک استایل', icon: 'Shirt', color: 'from-fuchsia-500 to-pink-500' },
  { name: 'رستوران ویوا', icon: 'UtensilsCrossed', color: 'from-red-500 to-orange-500' },
  { name: 'استارتاپ تک', icon: 'Lightbulb', color: 'from-yellow-500 to-amber-500' },
  { name: 'برند نوین', icon: 'Sparkles', color: 'from-emerald-500 to-teal-500' },
  { name: 'هلدینگ آسمان', icon: 'Building2', color: 'from-slate-500 to-gray-500' },
  { name: 'باشگاه فیت', icon: 'Dumbbell', color: 'from-green-500 to-emerald-500' },
  { name: 'آموزشگاه نخبگان', icon: 'GraduationCap', color: 'from-indigo-500 to-blue-500' },
  { name: 'آژانس سفر', icon: 'Plane', color: 'from-sky-500 to-blue-500' },
];

const ClientCard = ({ client, index }) => {
  const IconComponent = iconMap[client.icon] || Coffee;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm group cursor-pointer h-full min-w-[200px]"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${client.color || 'from-primary-500 to-secondary-500'} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0`}>
        {client.logo ? (
          <img src={client.logo} alt={client.name} className="w-8 h-8 rounded-lg object-cover" />
        ) : (
          <IconComponent className="w-6 h-6 text-white" />
        )}
      </div>
      <div className="min-w-0">
        <span className="text-white font-medium block truncate">{client.name}</span>
        <span className="text-dark-500 text-xs">مشتری فعال</span>
      </div>
    </motion.div>
  );
};

const Clients = () => {
  const [clients, setClients] = useState(defaultClients);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.getClients();
        if (response.success && response.data && response.data.length > 0) {
          setClients(response.data);
        }
      } catch (error) {
        // Fallback to default clients
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
            مشتریان ما
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">برندهایی که به ما اعتماد کرده‌اند</h3>
          <p className="text-dark-400">بیش از ۵۰ برند معتبر در صنایع مختلف</p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Second row - scrolling left */}
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee-right" style={{ width: 'max-content' }}>
              {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0">
                  <ClientCard client={client} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/5"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-white">۵۰+</div>
            <div className="text-dark-400 text-sm">مشتری فعال</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">۱۵+</div>
            <div className="text-dark-400 text-sm">صنعت مختلف</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">۹۸%</div>
            <div className="text-dark-400 text-sm">رضایت مشتری</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
