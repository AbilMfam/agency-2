import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import IconPicker from '../../components/admin/IconPicker';

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', short_title: '', description: '', full_description: '',
    icon: '', color: 'from-amber-500 to-orange-500', image: '', services: [], is_active: true
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await api.getIndustries(true); // Use admin route
      setIndustries(response.data || []);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateIndustry(editingItem.id, formData);
      } else {
        await api.createIndustry(formData);
      }
      fetchData();
      closeModal();
    } catch (error) {
      // Error handled silently
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این صنعت مطمئن هستید؟')) return;
    try {
      await api.deleteIndustry(id);
      setIndustries(industries.filter(i => i.id !== id));
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '', slug: '', short_title: '', description: '', full_description: '',
        icon: '', color: 'from-amber-500 to-orange-500', image: '', services: [], is_active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingItem(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">صنایع</h1>
          <p className="text-dark-400">مدیریت صنایع و حوزه‌های کاری</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
          <Plus className="w-5 h-5" /> افزودن صنعت
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl">
                  {item.icon || '🏢'}
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-dark-700 text-dark-400'}`}>
                  {item.is_active ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-dark-400 text-sm line-clamp-2 mb-4">{item.description}</p>
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
            <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'ویرایش صنعت' : 'افزودن صنعت جدید'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">عنوان *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">عنوان کوتاه</label>
                  <input type="text" value={formData.short_title || ''} onChange={(e) => setFormData({...formData, short_title: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات کوتاه</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات کامل</label>
                <textarea value={formData.full_description || ''} onChange={(e) => setFormData({...formData, full_description: e.target.value})} rows={4} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <IconPicker
                  value={formData.icon || ''}
                  onChange={(icon) => setFormData({...formData, icon})}
                  label="آیکون"
                />
                <div>
                  <label className="block text-dark-300 text-sm mb-2">رنگ گرادیانت</label>
                  <select value={formData.color || 'from-amber-500 to-orange-500'} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500">
                    <option value="from-amber-500 to-orange-500">کهربایی به نارنجی</option>
                    <option value="from-blue-500 to-indigo-500">آبی به نیلی</option>
                    <option value="from-pink-500 to-rose-500">صورتی به رز</option>
                    <option value="from-cyan-500 to-teal-500">فیروزه‌ای به سبزآبی</option>
                    <option value="from-purple-500 to-violet-500">بنفش</option>
                    <option value="from-green-500 to-emerald-500">سبز به زمردی</option>
                  </select>
                </div>
              </div>
              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({...formData, image: url})}
                folder="industries"
                label="تصویر صنعت"
              />
              <div>
                <label className="block text-dark-300 text-sm mb-2">خدمات مرتبط (هر خط یک خدمت)</label>
                <textarea
                  value={Array.isArray(formData.services) ? formData.services.join('\n') : ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value.split('\n').filter(s => s.trim())})}
                  rows={3}
                  placeholder="عکاسی غذا&#10;فیلمبرداری&#10;مدیریت پیج"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded" />
                <span className="text-white">فعال</span>
              </label>
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

export default Industries;
