import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Users, Instagram, Linkedin, Twitter } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    social_links: { instagram: '', linkedin: '', twitter: '' },
    skills: [],
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.request('/admin/team');
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.request(`/admin/team-members/${editingItem.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await api.request('/admin/team-members', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      fetchMembers();
      closeModal();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این عضو اطمینان دارید؟')) return;
    try {
      await api.request(`/admin/team-members/${id}`, { method: 'DELETE' });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        role: item.role || '',
        bio: item.bio || '',
        image: item.image || '',
        email: item.email || '',
        phone: item.phone || '',
        social_links: item.social_links || { instagram: '', linkedin: '', twitter: '' },
        skills: item.skills || [],
        order: item.order || 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        image: '',
        email: '',
        phone: '',
        social_links: { instagram: '', linkedin: '', twitter: '' },
        skills: [],
        order: 0,
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, skills });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت تیم</h1>
          <p className="text-dark-400 mt-1">اعضای تیم را مدیریت کنید</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          افزودن عضو جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="aspect-square relative">
              {member.image ? (
                <img
                  src={member.image.startsWith('http') ? member.image : `http://127.0.0.1:8000${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                  <Users className="w-16 h-16 text-dark-600" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <button
                  onClick={() => openModal(member)}
                  className="p-2 bg-dark-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-primary-500 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 bg-dark-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {!member.is_active && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/80 backdrop-blur-sm rounded text-xs text-white">
                  غیرفعال
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-primary-400 text-sm mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-dark-400 text-sm line-clamp-2">{member.bio}</p>
              )}
              {member.social_links && (
                <div className="flex gap-2 mt-3">
                  {member.social_links.instagram && (
                    <span className="p-1.5 bg-white/5 rounded text-dark-400">
                      <Instagram className="w-4 h-4" />
                    </span>
                  )}
                  {member.social_links.linkedin && (
                    <span className="p-1.5 bg-white/5 rounded text-dark-400">
                      <Linkedin className="w-4 h-4" />
                    </span>
                  )}
                  {member.social_links.twitter && (
                    <span className="p-1.5 bg-white/5 rounded text-dark-400">
                      <Twitter className="w-4 h-4" />
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">هنوز عضوی اضافه نشده است</p>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-dark-900 border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? 'ویرایش عضو' : 'افزودن عضو جدید'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-dark-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">نام</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">سمت</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">بیوگرافی</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>

                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="team"
                  label="تصویر"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">ایمیل</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">تلفن</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">مهارت‌ها (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    value={formData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="مثال: طراحی، برندینگ، موشن"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">اینستاگرام</label>
                    <input
                      type="text"
                      value={formData.social_links.instagram || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, instagram: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">لینکدین</label>
                    <input
                      type="text"
                      value={formData.social_links.linkedin || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, linkedin: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">توییتر</label>
                    <input
                      type="text"
                      value={formData.social_links.twitter || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, twitter: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">ترتیب</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer mt-6">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-dark-300">فعال</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    {editingItem ? 'ذخیره تغییرات' : 'افزودن عضو'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamMembers;
