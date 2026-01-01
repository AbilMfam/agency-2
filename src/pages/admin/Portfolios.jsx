import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import Toast from '../../components/admin/Toast';

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', full_description: '', category: '', type: 'video',
    thumbnail: '', cover_image: '', video_url: '', client: '', industry: '',
    views: '', growth: '', services: [], tags: [], duration: '', year: '',
    is_active: true, is_featured: false, order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.getPortfolios();
      setPortfolios(response.data || []);
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
    
    // Map form fields to API fields
    const apiData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      thumbnail: formData.thumbnail,
      video_url: formData.video_url,
      client_name: formData.client || '',
      industry: formData.industry,
      views: formData.views,
      growth: formData.growth,
      services: formData.services,
      tags: formData.tags,
      gallery: formData.gallery,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      order: formData.order,
    };
    
    console.log('Submitting portfolio data:', apiData);
    try {
      if (editingItem) {
        await api.updatePortfolio(editingItem.id, apiData);
        setToast({ message: 'نمونه کار با موفقیت بروزرسانی شد', type: 'success' });
      } else {
        await api.createPortfolio(apiData);
        setToast({ message: 'نمونه کار با موفقیت ایجاد شد', type: 'success' });
      }
      fetchData();
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
    if (!confirm('آیا از حذف این نمونه کار مطمئن هستید؟')) return;
    try {
      await api.deletePortfolio(id);
      setPortfolios(portfolios.filter(p => p.id !== id));
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      // Map API fields to form fields
      setFormData({
        ...item,
        client: item.client_name || '',
        // Ensure arrays are properly set
        tags: item.tags || [],
        services: item.services || [],
        gallery: item.gallery || [],
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', description: '', full_description: '', category: '', type: 'video',
        thumbnail: '', cover_image: '', video_url: '', client: '', industry: '',
        views: '', growth: '', services: [], tags: [], duration: '', year: '',
        is_active: true, is_featured: false, order: 0
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">نمونه کارها</h1>
          <p className="text-dark-400">مدیریت پورتفولیو</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن نمونه کار
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group"
            >
              <div className="relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {item.is_featured && (
                    <span className="px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs flex items-center gap-1">
                      <Star className="w-3 h-3" /> ویژه
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-lg text-xs ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-dark-700 text-dark-400'}`}>
                    {item.is_active ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-dark-400 text-sm mb-3">{item.category} • {item.type}</p>
                <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                  {item.views && <span>{item.views} ویو</span>}
                  {item.growth && <span className="text-green-400">{item.growth} رشد</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
              {editingItem ? 'ویرایش نمونه کار' : 'افزودن نمونه کار جدید'}
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
                  <label className="block text-dark-300 text-sm mb-2">دسته‌بندی *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full bg-dark-800 border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 ${
                      errors.category ? 'border-red-500' : 'border-white/10'
                    }`}
                    required
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-400">{errors.category[0]}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات کوتاه *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
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
                  value={formData.full_description || ''}
                  onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                  rows={4}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">دسته‌بندی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="cafe">کافه و رستوران</option>
                    <option value="beauty">زیبایی و لاغری</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="automotive">خودرویی</option>
                    <option value="fashion">استایل و لباس</option>
                    <option value="medical">پزشکی و سلامت</option>
                    <option value="fitness">ورزشی</option>
                    <option value="education">آموزشی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">صنعت</label>
                  <input
                    type="text"
                    value={formData.industry || ''}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">نام مشتری</label>
                  <input
                    type="text"
                    value={formData.client || ''}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">مدت زمان پروژه</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="مثال: ۳ ماه"
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">سال</label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    placeholder="مثال: ۱۴۰۳"
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
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
                value={formData.thumbnail || ''}
                onChange={(url) => setFormData({...formData, thumbnail: url})}
                folder="portfolios"
                label="تصویر بندانگشتی *"
              />
              <ImageUpload
                value={formData.cover_image || ''}
                onChange={(url) => setFormData({...formData, cover_image: url})}
                folder="portfolios"
                label="تصویر کاور"
              />
              <div>
                <label className="block text-dark-300 text-sm mb-2">خدمات ارائه شده (هر خط یک خدمت)</label>
                <textarea
                  value={Array.isArray(formData.services) ? formData.services.join('\n') : ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value.split('\n').filter(s => s.trim())})}
                  rows={3}
                  placeholder="فیلمبرداری&#10;تدوین&#10;تولید محتوا"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">تگ‌ها (هر خط یک تگ)</label>
                <textarea
                  value={Array.isArray(formData.tags) ? formData.tags.join('\n') : ''}
                  onChange={(e) => setFormData({...formData, tags: e.target.value.split('\n').filter(t => t.trim())})}
                  rows={2}
                  placeholder="کافه&#10;رستوران&#10;ریلز"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">تعداد ویو</label>
                  <input
                    type="text"
                    value={formData.views}
                    onChange={(e) => setFormData({...formData, views: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                    placeholder="مثال: 2.5M"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">درصد رشد</label>
                  <input
                    type="text"
                    value={formData.growth}
                    onChange={(e) => setFormData({...formData, growth: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                    placeholder="مثال: +350%"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-white">فعال</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-5 h-5 rounded"
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
                  {isSubmitting ? 'در حال پردازش...' : (editingItem ? 'بروزرسانی' : 'ایجاد')}
                </button>
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
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

export default Portfolios;
