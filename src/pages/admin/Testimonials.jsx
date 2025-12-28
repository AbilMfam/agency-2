import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    author: '', role: '', company: '', content: '', avatar: '', rating: 5,
    industry: '', results: '', is_featured: false, is_active: true, order: 0
  });

  useEffect(() => { 
    fetchData(); 
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.getTestimonials();
      setTestimonials(response.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateTestimonial(editingItem.id, formData);
      } else {
        await api.createTestimonial(formData);
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این نظر مطمئن هستید؟')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        author: '', role: '', company: '', content: '', avatar: '', rating: 5,
        industry: '', results: '', is_featured: false, is_active: true, order: 0
      });
    }
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => { 
    setShowModal(false); 
    setEditingItem(null); 
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">نظرات مشتریان</h1>
          <p className="text-dark-400">مدیریت نظرات و بازخوردها</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
          <Plus className="w-5 h-5" /> افزودن نظر
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
                  {item.avatar ? <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" /> : <span className="text-white font-bold">{item.author?.charAt(0)}</span>}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.author}</h3>
                  <p className="text-dark-400 text-sm">{item.role} - {item.company}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-600'}`} />
                ))}
              </div>
              <p className="text-dark-300 text-sm line-clamp-3 mb-4">"{item.content}"</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg max-h-[90vh] bg-dark-900 border border-white/10 rounded-2xl p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'ویرایش نظر' : 'افزودن نظر جدید'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">نام *</label>
                  <input type="text" value={formData.author || ''} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">سمت</label>
                  <input type="text" value={formData.role || ''} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">شرکت</label>
                  <input type="text" value={formData.company || ''} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">صنعت</label>
                  <input type="text" value={formData.industry || ''} onChange={(e) => setFormData({...formData, industry: e.target.value})} placeholder="مثال: کافه و رستوران" className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">متن نظر *</label>
                <textarea value={formData.content || ''} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">نتایج همکاری</label>
                <input type="text" value={formData.results || ''} onChange={(e) => setFormData({...formData, results: e.target.value})} placeholder="مثال: +340% رشد فالوور" className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <ImageUpload
                value={formData.avatar || ''}
                onChange={(url) => setFormData({...formData, avatar: url})}
                folder="testimonials"
                label="تصویر پروفایل"
              />
              <div>
                <label className="block text-dark-300 text-sm mb-2">امتیاز</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} type="button" onClick={() => setFormData({...formData, rating: num})}
                      className={`p-2 rounded-lg transition-colors ${formData.rating >= num ? 'text-yellow-400' : 'text-dark-600 hover:text-dark-400'}`}>
                      <Star className={`w-6 h-6 ${formData.rating >= num ? 'fill-yellow-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">فعال</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">ویژه</span>
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

export default Testimonials;
