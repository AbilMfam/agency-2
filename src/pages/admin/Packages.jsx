import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, Check } from 'lucide-react';
import api from '../../services/api';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', subtitle: '', price: '', period: 'ماهانه', description: '',
    color: 'from-primary-500 to-secondary-500', features: '', not_included: '',
    is_popular: false, is_active: true, order: 0
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await api.getPackages();
      setPackages(response.data || []);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        features: typeof formData.features === 'string' ? formData.features.split('\n').filter(f => f.trim()) : formData.features,
        not_included: typeof formData.not_included === 'string' ? formData.not_included.split('\n').filter(f => f.trim()) : formData.not_included
      };
      if (editingItem) {
        await api.updatePackage(editingItem.id, data);
      } else {
        await api.createPackage(data);
      }
      fetchData();
      closeModal();
    } catch (error) {
      // Error handled silently
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این پکیج مطمئن هستید؟')) return;
    try {
      await api.deletePackage(id);
      setPackages(packages.filter(p => p.id !== id));
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        ...item, 
        features: Array.isArray(item.features) ? item.features.join('\n') : '',
        not_included: Array.isArray(item.not_included) ? item.not_included.join('\n') : ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '', slug: '', subtitle: '', price: '', period: 'ماهانه', description: '',
        color: 'from-primary-500 to-secondary-500', features: '', not_included: '',
        is_popular: false, is_active: true, order: 0
      });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingItem(null); };

  const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">پکیج‌ها</h1>
          <p className="text-dark-400">مدیریت پکیج‌های قیمت‌گذاری</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
          <Plus className="w-5 h-5" /> افزودن پکیج
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className={`bg-dark-900/50 backdrop-blur-xl border rounded-2xl p-6 relative ${item.is_popular ? 'border-primary-500' : 'border-white/10'}`}>
              {item.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary-500 text-white text-xs flex items-center gap-1">
                  <Star className="w-3 h-3" /> محبوب
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <div className="text-3xl font-bold text-primary-400 mb-4">
                {formatPrice(item.price)} <span className="text-sm text-dark-400">تومان</span>
              </div>
              <p className="text-dark-400 text-sm mb-4">{item.description}</p>
              <ul className="space-y-2 mb-6">
                {Array.isArray(item.features) && item.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-dark-300">
                    <Check className="w-4 h-4 text-green-400" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <button onClick={() => openModal(item)} className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" /> ویرایش
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-dark-900 border border-white/10 rounded-2xl p-6 my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'ویرایش پکیج' : 'افزودن پکیج جدید'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">نام پکیج *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">زیرعنوان</label>
                  <input type="text" value={formData.subtitle || ''} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} placeholder="مثال: محبوب‌ترین" className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">قیمت (تومان) *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">دوره</label>
                  <select value={formData.period || 'ماهانه'} onChange={(e) => setFormData({...formData, period: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500">
                    <option value="ماهانه">ماهانه</option>
                    <option value="سالانه">سالانه</option>
                    <option value="توافقی">توافقی</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">رنگ گرادیانت</label>
                <select value={formData.color || 'from-primary-500 to-secondary-500'} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500">
                  <option value="from-slate-500 to-slate-600">خاکستری</option>
                  <option value="from-primary-500 to-secondary-500">اصلی</option>
                  <option value="from-violet-500 to-purple-500">بنفش</option>
                  <option value="from-amber-500 to-orange-500">نارنجی</option>
                </select>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">ویژگی‌ها (هر خط یک ویژگی)</label>
                <textarea value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} rows={5} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" placeholder="۸ پست اینستاگرام&#10;۴ ریلز ماهانه&#10;تقویم محتوایی" />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">موارد شامل نشده (هر خط یک مورد)</label>
                <textarea value={formData.not_included} onChange={(e) => setFormData({...formData, not_included: e.target.value})} rows={3} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" placeholder="فیلمبرداری حرفه‌ای&#10;موشن گرافیک" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_popular} onChange={(e) => setFormData({...formData, is_popular: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">محبوب</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">فعال</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">{editingItem ? 'بروزرسانی' : 'ایجاد'}</button>
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">انصراف</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Packages;
