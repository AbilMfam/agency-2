import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import IconPicker from '../../components/admin/IconPicker';
import Toast from '../../components/admin/Toast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', short_title: '', full_description: '',
    icon: '', color: 'from-primary-500 to-secondary-500', image: '',
    features: [], is_active: true, is_featured: false, order: 0
  });
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.getServices(true); // Use admin route
      setServices(response.data || []);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      if (editingService) {
        await api.updateService(editingService.id, formData);
        setToast({ message: 'سرویس با موفقیت بروزرسانی شد', type: 'success' });
      } else {
        await api.createService(formData);
        setToast({ message: 'سرویس با موفقیت ایجاد شد', type: 'success' });
      }
      fetchServices();
      closeModal();
    } catch (error) {
      if (error.status === 422 && error.errors) {
        setErrors(error.errors);
        setToast({ message: 'لطفاً خطاهای را برطرف کنید', type: 'error' });
      } else {
        setToast({ 
          message: error.message || 'خطایی در عملیات رخ داد', 
          type: 'error' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این سرویس مطمئن هستید؟')) return;
    try {
      await api.deleteService(id);
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        title: '', description: '', short_title: '', full_description: '',
        icon: '', color: 'from-primary-500 to-secondary-500', image: '',
        features: [], is_active: true, is_featured: false, order: 0
      });
      setFeaturesInput('');
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">خدمات</h1>
          <p className="text-dark-400">مدیریت خدمات آژانس</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن سرویس
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {service.image && (
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.svg';
                  }}
                />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <div className="flex items-center gap-1">
                    {service.is_active ? (
                      <Eye className="w-4 h-4 text-green-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-dark-500" />
                    )}
                  </div>
                </div>
                <p className="text-dark-400 text-sm line-clamp-2 mb-4">{service.description}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(service)}
                    className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-900 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {editingService ? 'ویرایش سرویس' : 'افزودن سرویس جدید'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">عنوان *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full bg-dark-800 border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 ${
                      errors.title ? 'border-red-500' : 'border-white/10'
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">عنوان کوتاه</label>
                  <input
                    type="text"
                    value={formData.short_title}
                    onChange={(e) => setFormData({...formData, short_title: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className={`w-full bg-dark-800 border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 ${
                    errors.description ? 'border-red-500' : 'border-white/10'
                  }`}
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400">{errors.description[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات کامل</label>
                <textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                  rows={5}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IconPicker
                  value={formData.icon || ''}
                  onChange={(icon) => setFormData({...formData, icon})}
                  label="آیکون"
                />
                <div>
                  <label className="block text-dark-300 text-sm mb-2">ترتیب</label>
                  <input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({...formData, image: url})}
                folder="services"
                label="تصویر سرویس"
              />
              <div>
                <label className="block text-dark-300 text-sm mb-2">رنگ گرادیانت</label>
                <select
                  value={formData.color || 'from-primary-500 to-secondary-500'}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                >
                  <option value="from-red-500 to-orange-500">قرمز به نارنجی</option>
                  <option value="from-purple-500 to-pink-500">بنفش به صورتی</option>
                  <option value="from-cyan-500 to-blue-500">فیروزه‌ای به آبی</option>
                  <option value="from-amber-500 to-yellow-500">کهربایی به زرد</option>
                  <option value="from-green-500 to-emerald-500">سبز به زمردی</option>
                  <option value="from-pink-500 to-rose-500">صورتی به رز</option>
                  <option value="from-blue-500 to-indigo-500">آبی به نیلی</option>
                  <option value="from-fuchsia-500 to-pink-500">سرخابی به صورتی</option>
                  <option value="from-indigo-500 to-violet-500">نیلی به بنفش</option>
                  <option value="from-lime-500 to-green-500">لیمویی به سبز</option>
                  <option value="from-primary-500 to-secondary-500">اصلی</option>
                </select>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">ویژگی‌ها (هر خط یک ویژگی)</label>
                <textarea
                  value={Array.isArray(formData.features) ? formData.features.join('\n') : ''}
                  onChange={(e) => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})}
                  rows={4}
                  placeholder="فیلمبرداری با کیفیت 4K&#10;نورپردازی حرفه‌ای&#10;تیم مجرب"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="w-5 h-5 rounded bg-dark-800 border-white/10"
                  />
                  <span className="text-white">فعال</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-5 h-5 rounded bg-dark-800 border-white/10"
                  />
                  <span className="text-white">ویژه</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'در حال پردازش...' : (editingService ? 'بروزرسانی' : 'ایجاد')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Services;
