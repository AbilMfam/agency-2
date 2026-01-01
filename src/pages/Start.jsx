import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Building2, Target, Calendar, DollarSign } from 'lucide-react';
import { services as defaultServices } from '../data/services';
import { Button, Card, Input, Textarea } from '../components/ui';
import api from '../services/api';

const steps = [
  { id: 1, title: 'نوع کسب‌وکار', icon: Building2 },
  { id: 2, title: 'خدمات مورد نیاز', icon: Target },
  { id: 3, title: 'بودجه و زمان', icon: DollarSign },
  { id: 4, title: 'اطلاعات تماس', icon: Calendar },
];

const businessTypes = [
  { id: 'cafe', name: 'کافه و رستوران', emoji: '☕' },
  { id: 'beauty', name: 'زیبایی و سلامت', emoji: '💄' },
  { id: 'shop', name: 'فروشگاه', emoji: '🛍️' },
  { id: 'startup', name: 'استارتاپ', emoji: '🚀' },
  { id: 'personal', name: 'برند شخصی', emoji: '👤' },
  { id: 'other', name: 'سایر', emoji: '📦' },
];

const budgetRanges = [
  { id: 'low', name: 'کمتر از ۵ میلیون', value: '< 5M' },
  { id: 'medium', name: '۵ تا ۱۵ میلیون', value: '5-15M' },
  { id: 'high', name: '۱۵ تا ۳۰ میلیون', value: '15-30M' },
  { id: 'premium', name: 'بیشتر از ۳۰ میلیون', value: '> 30M' },
];

const Start = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState(defaultServices);
  const [formData, setFormData] = useState({
    businessType: '',
    services: [],
    budget: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        if (response.success && response.data?.length > 0) {
          setServices(response.data);
        }
      } catch (error) {
        // Fallback to default services
      }
    };
    fetchServices();
  }, []);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.submitContact({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: `درخواست پروژه - ${formData.businessType}`,
        message: `نوع کسب‌وکار: ${formData.businessType}\nخدمات: ${formData.services.join(', ')}\nبودجه: ${formData.budget}\nزمان‌بندی: ${formData.timeline}\nتوضیحات: ${formData.description}`,
        type: 'project_request',
        business_type: formData.businessType,
        services: formData.services,
        budget: formData.budget,
        timeline: formData.timeline,
      });
      navigate('/thank-you');
    } catch (error) {
      alert('خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">نوع کسب‌وکار شما چیست؟</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, businessType: type.id })}
                  className={`p-6 rounded-xl border transition-all ${
                    formData.businessType === type.id
                      ? 'bg-primary-500/20 border-primary-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-4xl block mb-3">{type.emoji}</span>
                  <span className="text-white font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">چه خدماتی نیاز دارید؟</h2>
            <p className="text-dark-400 mb-6">می‌توانید چند گزینه انتخاب کنید</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    formData.services.includes(service.id)
                      ? 'bg-primary-500/20 border-primary-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm">{service.shortTitle}</span>
                  {formData.services.includes(service.id) && (
                    <Check className="w-4 h-4 text-primary-400 mr-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">بودجه و زمان‌بندی</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-dark-300 mb-4">بودجه ماهانه شما</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setFormData({ ...formData, budget: range.id })}
                      className={`p-4 rounded-xl border transition-all ${
                        formData.budget === range.id
                          ? 'bg-primary-500/20 border-primary-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-white font-medium">{range.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Input
                  label="زمان شروع مورد نظر"
                  placeholder="مثلاً: هفته آینده، ماه بعد..."
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
            <div className="space-y-6">
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
              <Input
                label="ایمیل"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Textarea
                label="توضیحات بیشتر (اختیاری)"
                placeholder="هر توضیح اضافی که فکر می‌کنید مفید است..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                شروع پروژه جدید
              </h1>
              <p className="text-dark-400">
                چند سوال ساده پاسخ دهید تا بهترین پیشنهاد را برای شما آماده کنیم
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-2 mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : 'bg-white/10 text-dark-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 transition-all ${
                        currentStep > step.id ? 'bg-primary-500' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="left"
                >
                  قبلی
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    بعدی
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    loading={loading}
                    icon={<Check className="w-4 h-4" />}
                  >
                    ارسال درخواست
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Start;
