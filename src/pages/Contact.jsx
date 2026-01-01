import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Instagram, MessageCircle } from 'lucide-react';
import { SectionTitle, Card, Button, Input, Textarea } from '../components/ui';
import api from '../services/api';

const contactInfo = [
  {
    icon: Phone,
    title: 'شماره تماس',
    value: '09052010799',
    link: 'tel:+989052010799',
  },
  {
    icon: Mail,
    title: 'ایمیل',
    value: 'amonixagency@gmail.com',
    link: 'mailto:amonixagency@gmail.com',
  },
  {
    icon: MapPin,
    title: 'آدرس',
    value: 'تهران، دیباجی جنوبی، خیابان تسلیمی، خیابان بختیاری، پلاک ۴',
    link: '#',
  },
  {
    icon: Clock,
    title: 'ساعات کاری',
    value: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸',
    link: '#',
  },
];

const socialLinks = [
  { icon: Instagram, name: 'اینستاگرام', href: 'https://instagram.com', color: 'from-pink-500 to-purple-500' },
  { icon: Send, name: 'تلگرام', href: 'https://t.me', color: 'from-blue-400 to-blue-600' },
  { icon: MessageCircle, name: 'واتساپ', href: 'https://wa.me', color: 'from-green-400 to-green-600' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitContact(formData);
      alert('پیام شما با موفقیت ارسال شد!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      alert('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="تماس با ما"
            title="برای شروع همکاری، مشاوره یا ثبت پروژه، با ما در ارتباط باشید"
            description="پاسخ‌گویی سریع، مستقیم و حرفه‌ای."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">ارسال پیام</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="نام و نام خانوادگی"
                        placeholder="نام خود را وارد کنید"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="شماره تماس"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="ایمیل"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Input
                        label="موضوع"
                        placeholder="موضوع پیام"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <Textarea
                      label="پیام"
                      placeholder="پیام خود را بنویسید..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                    <Button type="submit" loading={loading} className="w-full md:w-auto">
                      ارسال پیام
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="block"
                  >
                    <Card className="p-6 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-dark-400">{info.title}</div>
                          <div className="text-white font-medium">{info.value}</div>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">شبکه‌های اجتماعی</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white hover:scale-110 transition-transform`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
                  <h3 className="text-lg font-bold text-white mb-2">پاسخگویی سریع</h3>
                  <p className="text-dark-400 text-sm">
                    تیم ما در کمتر از ۲۴ ساعت به پیام شما پاسخ خواهد داد.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
