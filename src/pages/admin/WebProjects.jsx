import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Globe, Smartphone, Search, ShoppingCart, Code, X, Upload } from 'lucide-react';
import api from '../../services/api';

const typeOptions = [
  { value: 'website', label: 'وب‌سایت' },
  { value: 'app', label: 'اپلیکیشن' },
  { value: 'ecommerce', label: 'فروشگاه' },
  { value: 'seo', label: 'سئو' },
  { value: 'webapp', label: 'وب اپ' },
];

const iconOptions = [
  { value: 'Globe', label: 'Globe' },
  { value: 'Smartphone', label: 'Smartphone' },
  { value: 'Search', label: 'Search' },
  { value: 'ShoppingCart', label: 'ShoppingCart' },
  { value: 'Code', label: 'Code' },
];

const colorOptions = [
  { value: 'from-primary-500 to-secondary-500', label: 'نارنجی-بنفش' },
  { value: 'from-blue-500 to-indigo-500', label: 'آبی' },
  { value: 'from-green-500 to-emerald-500', label: 'سبز' },
  { value: 'from-pink-500 to-rose-500', label: 'صورتی' },
  { value: 'from-purple-500 to-violet-500', label: 'بنفش' },
  { value: 'from-cyan-500 to-teal-500', label: 'فیروزه‌ای' },
  { value: 'from-amber-500 to-orange-500', label: 'نارنجی' },
];

const WebProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'website',
    category: '',
    icon: 'Globe',
    color: 'from-primary-500 to-secondary-500',
    image: '',
    mockup_image: '',
    description: '',
    client: '',
    industry: '',
    year: '',
    technologies: [],
    features: [],
    results: {},
    link: '',
    testimonial: '',
    challenge: '',
    solution: '',
    gallery: [],
    order: 0,
    is_featured: false,
    is_active: true,
  });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [resultKey, setResultKey] = useState('');
  const [resultValue, setResultValue] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.getWebProjects();
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.updateWebProject(editingProject.id, formData);
      } else {
        await api.createWebProject(formData);
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('خطا در ذخیره پروژه');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این پروژه مطمئن هستید؟')) return;
    try {
      await api.deleteWebProject(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      type: project.type || 'website',
      category: project.category || '',
      icon: project.icon || 'Globe',
      color: project.color || 'from-primary-500 to-secondary-500',
      image: project.image || '',
      mockup_image: project.mockup_image || '',
      description: project.description || '',
      client: project.client || '',
      industry: project.industry || '',
      year: project.year || '',
      technologies: project.technologies || [],
      features: project.features || [],
      results: project.results || {},
      link: project.link || '',
      testimonial: project.testimonial || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      gallery: project.gallery || [],
      order: project.order || 0,
      is_featured: project.is_featured ?? false,
      is_active: project.is_active ?? true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      type: 'website',
      category: '',
      icon: 'Globe',
      color: 'from-primary-500 to-secondary-500',
      image: '',
      mockup_image: '',
      description: '',
      client: '',
      industry: '',
      year: '',
      technologies: [],
      features: [],
      results: {},
      link: '',
      testimonial: '',
      challenge: '',
      solution: '',
      gallery: [],
      order: 0,
      is_featured: false,
      is_active: true,
    });
    setTechInput('');
    setFeatureInput('');
    setResultKey('');
    setResultValue('');
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await api.uploadFile(file, 'web-projects');
      setFormData({ ...formData, [field]: response.path });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== index) });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addResult = () => {
    if (resultKey.trim() && resultValue.trim()) {
      setFormData({ ...formData, results: { ...formData.results, [resultKey.trim()]: resultValue.trim() } });
      setResultKey('');
      setResultValue('');
    }
  };

  const removeResult = (key) => {
    const newResults = { ...formData.results };
    delete newResults[key];
    setFormData({ ...formData, results: newResults });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت پروژه‌های وب</h1>
          <p className="text-dark-400">وب‌سایت‌ها، اپلیکیشن‌ها و پروژه‌های سئو</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          افزودن پروژه
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="relative h-48">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <Globe className="w-16 h-16 text-white/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {project.is_active ? 'فعال' : 'غیرفعال'}
                </span>
                {project.is_featured && (
                  <span className="px-2 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium">
                    ویژه
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-bold mb-2">{project.title}</h3>
              <p className="text-dark-400 text-sm line-clamp-2 mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-dark-400 text-xs">
                  <span>{project.client}</span>
                  {project.year && <span>• {project.year}</span>}
                </div>
                
                <div className="flex items-center gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-lg bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">هنوز پروژه‌ای اضافه نشده است</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-dark-900 z-10">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}
              </h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">عنوان *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">اسلاگ</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="خودکار از عنوان"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">نوع پروژه *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">دسته‌بندی *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="مثلاً: طراحی سایت"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">آیکون</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">رنگ</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  >
                    {colorOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">مشتری</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">صنعت</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">سال</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="۱۴۰۳"
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">لینک پروژه</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-dark-300 text-sm mb-2">تکنولوژی‌ها</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="React, Node.js, ..."
                  />
                  <button type="button" onClick={addTechnology} className="px-4 py-2 bg-primary-500 text-white rounded-xl">
                    افزودن
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm flex items-center gap-2">
                      {tech}
                      <button type="button" onClick={() => removeTechnology(i)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-dark-300 text-sm mb-2">ویژگی‌ها</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="پنل مدیریت، سئو، ..."
                  />
                  <button type="button" onClick={addFeature} className="px-4 py-2 bg-primary-500 text-white rounded-xl">
                    افزودن
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm flex items-center gap-2">
                      {feature}
                      <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <label className="block text-dark-300 text-sm mb-2">نتایج</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resultKey}
                    onChange={(e) => setResultKey(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="عنوان (مثلاً: ترافیک)"
                  />
                  <input
                    type="text"
                    value={resultValue}
                    onChange={(e) => setResultValue(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                    placeholder="مقدار (مثلاً: +350%)"
                  />
                  <button type="button" onClick={addResult} className="px-4 py-2 bg-primary-500 text-white rounded-xl">
                    افزودن
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.results).map(([key, value]) => (
                    <span key={key} className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm flex items-center gap-2">
                      {key}: {value}
                      <button type="button" onClick={() => removeResult(key)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">تصویر اصلی</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-dark-300 hover:text-white cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading ? 'در حال آپلود...' : 'آپلود'}
                    </label>
                    {formData.image && (
                      <img src={formData.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">تصویر ماکاپ</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'mockup_image')}
                      className="hidden"
                      id="mockup-upload"
                    />
                    <label
                      htmlFor="mockup-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-dark-300 hover:text-white cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      آپلود
                    </label>
                    {formData.mockup_image && (
                      <img src={formData.mockup_image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-dark-300 text-sm mb-2">نظر مشتری</label>
                <textarea
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">چالش</label>
                  <textarea
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">راه‌حل</label>
                  <textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-dark-300">فعال</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-dark-300">ویژه</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {editingProject ? 'بروزرسانی' : 'ذخیره'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-white/5 text-dark-300 rounded-xl hover:bg-white/10 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WebProjects;
