import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Calendar, Star, Clock, Eye, Search, Filter, ChevronDown, Settings, Image as ImageIcon, User, Hash, Globe, BarChart, MessageSquare, Zap, FileText, Heart } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import TipTapEditor from '../../components/admin/TipTapEditor';
import CalloutBuilder from '../../components/admin/CalloutBuilder';
import Toast from '../../components/admin/Toast';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    content_blocks: [],
    thumbnail: '',
    featured_image_alt: '',
    featured_image_caption: '',
    category: '',
    category_id: null,
    tags: [],
    author: 'ادمین',
    author_avatar: '',
    author_bio: '',
    read_time: 5,
    word_count: 0,
    views: 0,
    likes: 0,
    is_published: true,
    is_featured: false,
    allow_comments: true,
    status: 'draft',
    scheduled_at: '',
    // SEO Fields
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    // Open Graph
    og_title: '',
    og_description: '',
    og_image: '',
    // Table of Contents
    table_of_contents: [],
    show_toc: true,
  });

  useEffect(() => { 
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      const response = await api.getBlogPosts();
      setPosts(response.data || []);
    } catch (error) {
      // If unauthorized, clear token and redirect to login
      if (error.message === 'Unauthenticated' || error.message.includes('401')) {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
        return;
      }
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.request('/blog/categories');
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const data = { 
        ...formData,
        // Ensure tags is array
        tags: Array.isArray(formData.tags) ? formData.tags : (formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []),
        // Ensure content_blocks is included
        content_blocks: formData.content_blocks || '',
        read_time: parseInt(formData.read_time) || 5,
        word_count: parseInt(formData.word_count) || 0,
        // Convert boolean fields
        is_published: Boolean(formData.is_published),
        is_featured: Boolean(formData.is_featured),
        allow_comments: Boolean(formData.allow_comments),
        show_toc: Boolean(formData.show_toc),
      };
      
      // Generate slug from title for both create and update
      if (data.title && !data.slug) {
        // Transliterate Persian to Latin and create slug
        const persianToLatin = {
          'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch',
          'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
          'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
          'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
          'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', ' ': '-', 'ئ': 'y', 'آ': 'a'
        };
        
        let slug = data.title.toLowerCase();
        Object.keys(persianToLatin).forEach(key => {
          slug = slug.replace(new RegExp(key, 'g'), persianToLatin[key]);
        });
        
        // Remove non-alphanumeric characters except dash
        slug = slug.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        
        // Remove consecutive dashes
        slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        // Ensure slug is not empty
        if (!slug || slug === '-') {
          slug = 'post-' + Date.now();
        }
        
        data.slug = slug;
      }
      
      if (editingItem) {
        // Remove fields that shouldn't be sent in update
        delete data.id;
        delete data.user_id;
        delete data.created_at;
        delete data.updated_at;
        delete data.published_at;
        delete data.views;
        delete data.likes;
        delete data.shares;
        
        console.log('Final data to API:', data);
        await api.updateBlogPost(editingItem.id, data);
        setToast({ message: 'مقاله با موفقیت بروزرسانی شد', type: 'success' });
        await fetchData();
        
        // Update formData with fresh data from the updated post
        const updatedPosts = await api.getBlogPosts();
        const updatedPost = updatedPosts.data.find(post => post.id === editingItem.id);
        if (updatedPost) {
          // Re-open modal with updated data
          openModal(updatedPost);
        }
        
        // Trigger real-time update for frontend
        localStorage.setItem('blog_updated', Date.now().toString());
        localStorage.removeItem('blog_updated');
      } else {
        // Generate slug for create
        if (!data.slug) {
          // Transliterate Persian to Latin and create slug
          const persianToLatin = {
            'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch',
            'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
            'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
            'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
            'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', ' ': '-', 'ئ': 'y', 'آ': 'a'
          };
          
          let slug = data.title.toLowerCase();
          Object.keys(persianToLatin).forEach(key => {
            slug = slug.replace(new RegExp(key, 'g'), persianToLatin[key]);
          });
          
          // Remove non-alphanumeric characters except dash
          slug = slug.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          
          // Remove consecutive dashes
          slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');
          
          // Ensure slug is not empty
          if (!slug || slug === '-') {
            slug = 'post-' + Date.now();
          }
          
          data.slug = slug;
        }
        
        const response = await api.createBlogPost(data);
        setPosts([response.data, ...posts]);
        setToast({ message: 'مقاله با موفقیت ایجاد شد', type: 'success' });
        
        // Trigger real-time update for frontend
        localStorage.setItem('blog_updated', Date.now().toString());
        localStorage.removeItem('blog_updated');
      }
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
    if (!confirm('آیا از حذف این مقاله مطمئن هستید؟')) return;
    try {
      await api.deleteBlogPost(id);
      setPosts(posts.filter(p => p.id !== id));
      
      // Trigger real-time update for frontend
      localStorage.setItem('blog_updated', Date.now().toString());
      localStorage.removeItem('blog_updated');
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        ...item, 
        tags: Array.isArray(item.tags) ? item.tags : [],
        author: item.author || 'ادمین',
        content_blocks: typeof item.content_blocks === 'string' 
          ? item.content_blocks 
          : Array.isArray(item.content_blocks) 
            ? item.content_blocks.map(block => block.html || '').join('\n')
            : '',
        read_time: item.read_time || 5,
        word_count: item.word_count || 0,
        views: item.views || 0,
        likes: item.likes || 0,
        author_bio: item.author_bio || '',
        status: item.status || 'draft',
        scheduled_at: item.scheduled_at || '',
        // SEO fields
        meta_title: item.meta_title || '',
        meta_description: item.meta_description || '',
        meta_keywords: item.meta_keywords || '',
        canonical_url: item.canonical_url || '',
        // Open Graph
        og_title: item.og_title || '',
        og_description: item.og_description || '',
        og_image: item.og_image || '',
        featured_image_alt: item.featured_image_alt || '',
        featured_image_caption: item.featured_image_caption || '',
        allow_comments: item.allow_comments !== false,
        show_toc: item.show_toc !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', slug: '', excerpt: '', content: '', content_blocks: [], thumbnail: '',
        featured_image_alt: '', featured_image_caption: '',
        category: '', category_id: null, tags: [], author: 'ادمین', author_avatar: '', author_bio: '',
        read_time: 5, word_count: 0, views: 0, likes: 0,
        is_published: true, is_featured: false, allow_comments: true,
        status: 'draft', scheduled_at: '',
        // SEO fields
        meta_title: '', meta_description: '', meta_keywords: '', canonical_url: '',
        // Open Graph
        og_title: '', og_description: '', og_image: '',
        // Table of Contents
        table_of_contents: [], show_toc: true,
      });
    }
    setErrors({});
    setActiveTab('content');
    setShowModal(true);
  };

  const closeModal = () => { 
    setShowModal(false); 
    setEditingItem(null); 
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (post) => {
    if (post.is_published) {
      return <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs">منتشر شده</span>;
    }
    if (post.status === 'scheduled') {
      return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">زمان‌بندی شده</span>;
    }
    return <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">پیش‌نویس</span>;
  };

  const token = localStorage.getItem('auth_token');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مقالات بلاگ</h1>
          <p className="text-dark-400">مدیریت مقالات و محتوا</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" /> افزودن مقاله
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات..."
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-dark-800 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="">همه دسته‌ها</option>
          <option value="social-media">سوشال مدیا</option>
          <option value="content">تولید محتوا</option>
          <option value="marketing">بازاریابی</option>
          <option value="seo">سئو</option>
          <option value="branding">برندینگ</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : !token ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">احراز هویت لازم است</h1>
            <p className="text-dark-400 mb-6">برای دسترسی به مدیریت بلاگ، باید وارد شوید.</p>
            <a
              href="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              ورود به پنل مدیریت
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group"
            >
              <div className="relative">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-dark-500" />
                  </div>
                )}
                {item.is_featured && (
                  <div className="absolute top-2 left-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-dark-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.created_at).toLocaleDateString('fa-IR')}
                  {getStatusBadge(item)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-dark-400 text-sm line-clamp-2 mb-3">{item.excerpt}</p>
                
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.read_time || 5} دقیقه
                  </span>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-dark-900 border border-white/10 rounded-2xl"
          >
            <div className="sticky top-0 z-10 bg-dark-900 border-b border-white/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
                </h2>
                <button onClick={closeModal} className="text-dark-400 hover:text-white">
                  ✕
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'content', label: 'محتوا', icon: <FileText className="w-4 h-4" /> },
                  { id: 'blocks', label: 'بلاک‌ها', icon: <Zap className="w-4 h-4" /> },
                  { id: 'media', label: 'رسانه', icon: <ImageIcon className="w-4 h-4" /> },
                  { id: 'seo', label: 'سئو', icon: <Globe className="w-4 h-4" /> },
                  { id: 'author', label: 'نویسنده', icon: <User className="w-4 h-4" /> },
                  { id: 'advanced', label: 'پیشرفته', icon: <Settings className="w-4 h-4" /> },
                  { id: 'analytics', label: 'آمار', icon: <BarChart className="w-4 h-4" /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white/5 text-dark-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {tab.icon}
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">عنوان مقاله *</label>
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
                    <label className="block text-dark-300 text-sm mb-2">خلاصه مقاله</label>
                    <textarea 
                      value={formData.excerpt} 
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
                      rows={3} 
                      className={`w-full bg-dark-800 border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 ${
                        errors.excerpt ? 'border-red-500' : 'border-white/10'
                      }`}
                      placeholder="خلاصه‌ای کوتاه از مقاله که در لیست مقالات نمایش داده می‌شود..."
                    />
                    {errors.excerpt && (
                      <p className="mt-1 text-sm text-red-400">{errors.excerpt[0]}</p>
                    )}
                  </div>
                  
                  <TipTapEditor
                    value={formData.content || ''}
                    onChange={(content) => setFormData({...formData, content})}
                    label="محتوای مقاله *"
                    placeholder="محتوای مقاله را اینجا بنویسید... می‌توانید تصاویر را با کشیدن و رها کردن اضافه کنید."
                  />
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      تگ‌ها
                      <span className="text-dark-500 mr-2">
                        (با کاما یا Enter جدا کنید)
                      </span>
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-dark-400" />
                      <input 
                        type="text" 
                        value={formData.tags.join(', ')} 
                        onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})} 
                        placeholder="سئو, بازاریابی, محتوا"
                        className="flex-1 bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm flex items-center gap-1"
                          >
                            #{tag}
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, tags: formData.tags.filter((_, i) => i !== index)})}
                              className="text-primary-400 hover:text-primary-300"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Blocks Tab */}
              {activeTab === 'blocks' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <h4 className="text-yellow-400 font-medium mb-2">بلاک‌های محتوایی</h4>
                    <p className="text-dark-400 text-sm">
                      با استفاده از بلاک‌های آماده، محتوای جذاب‌تری ایجاد کنید. این بلاک‌ها به صورت خودکار به محتوای اصلی اضافه می‌شوند.
                    </p>
                  </div>
                  
                  <CalloutBuilder 
                    value={typeof formData.content_blocks === 'string' 
                      ? formData.content_blocks 
                      : Array.isArray(formData.content_blocks) 
                        ? formData.content_blocks.map(block => block.html || '').join('\n')
                        : ''}
                    onChange={(html) => {
                      // Add to content or update content_blocks
                      setFormData({...formData, content_blocks: html});
                    }}
                  />
                  
                  <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-3">پیش‌نمایش HTML</h4>
                    <pre className="bg-dark-900 rounded-lg p-3 text-xs text-green-400 overflow-auto max-h-40">
                      {typeof formData.content_blocks === 'string' 
                        ? formData.content_blocks 
                        : Array.isArray(formData.content_blocks) 
                          ? formData.content_blocks.map(block => block.html || '').join('\n')
                          : '<!-- بلاک‌ها در اینجا نمایش داده می‌شوند -->'
                      }
                    </pre>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">تصویر شاخص</h3>
                    <ImageUpload
                      value={formData.thumbnail || ''}
                      onChange={(url) => setFormData({...formData, thumbnail: url})}
                      folder="blog"
                      label="تصویر شاخص مقاله"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">متن جایگزین (Alt Text)</label>
                        <input 
                          type="text" 
                          value={formData.featured_image_alt || ''} 
                          onChange={(e) => setFormData({...formData, featured_image_alt: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder="توضیح تصویر برای سئو"
                        />
                      </div>
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">کپشن تصویر</label>
                        <input 
                          type="text" 
                          value={formData.featured_image_caption || ''} 
                          onChange={(e) => setFormData({...formData, featured_image_caption: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder="توضیح زیر تصویر"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-2">راهنمای سئو</h4>
                    <p className="text-dark-400 text-sm">
                      عنوان متا باید بین ۵۰ تا ۶۰ کاراکتر و توضیحات متا بین ۱۵۰ تا ۱۶۰ کاراکتر باشد.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      عنوان متا (Meta Title)
                      <span className="text-dark-500 mr-2">
                        {(formData.meta_title || formData.title || '').length}/60
                      </span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.meta_title || ''} 
                      onChange={(e) => setFormData({...formData, meta_title: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder={formData.title || 'عنوان صفحه در نتایج جستجو'}
                      maxLength={70}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      توضیحات متا (Meta Description)
                      <span className="text-dark-500 mr-2">
                        {(formData.meta_description || formData.excerpt || '').length}/160
                      </span>
                    </label>
                    <textarea 
                      value={formData.meta_description || ''} 
                      onChange={(e) => setFormData({...formData, meta_description: e.target.value})} 
                      rows={3} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder={formData.excerpt || 'توضیح کوتاه برای نتایج جستجو'}
                      maxLength={170}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">کلمات کلیدی (Meta Keywords)</label>
                    <input 
                      type="text" 
                      value={formData.meta_keywords || ''} 
                      onChange={(e) => setFormData({...formData, meta_keywords: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="کلمه۱, کلمه۲, کلمه۳"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">آدرس کانونیکال (Canonical URL)</label>
                    <input 
                      type="url" 
                      value={formData.canonical_url || ''} 
                      onChange={(e) => setFormData({...formData, canonical_url: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="https://example.com/blog/post-slug"
                    />
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-white font-medium mb-4">تنظیمات Open Graph (شبکه‌های اجتماعی)</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">عنوان OG</label>
                        <input 
                          type="text" 
                          value={formData.og_title || ''} 
                          onChange={(e) => setFormData({...formData, og_title: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder={formData.title || 'عنوان برای اشتراک‌گذاری'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">توضیحات OG</label>
                        <textarea 
                          value={formData.og_description || ''} 
                          onChange={(e) => setFormData({...formData, og_description: e.target.value})} 
                          rows={2} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder={formData.excerpt || 'توضیح برای اشتراک‌گذاری'}
                        />
                      </div>
                      
                      <ImageUpload
                        value={formData.og_image || ''}
                        onChange={(url) => setFormData({...formData, og_image: url})}
                        folder="blog/og"
                        label="تصویر OG (1200x630 پیکسل)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Author Tab */}
              {activeTab === 'author' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2">اطلاعات نویسنده</h4>
                    <p className="text-dark-400 text-sm">
                      اطلاعات نویسنده برای نمایش در مقاله و بهبود اعتبار محتوا
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">نام نویسنده *</label>
                      <input 
                        type="text" 
                        value={formData.author || ''} 
                        onChange={(e) => setFormData({...formData, author: e.target.value})} 
                        placeholder="نام کامل نویسنده" 
                        className={`w-full bg-dark-800 border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500 ${
                          errors.author ? 'border-red-500' : 'border-white/10'
                        }`}
                        required
                      />
                      {errors.author && (
                        <p className="mt-1 text-sm text-red-400">{errors.author[0]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">آواتار نویسنده</label>
                      <ImageUpload
                        value={formData.author_avatar || ''}
                        onChange={(url) => setFormData({...formData, author_avatar: url})}
                        folder="authors"
                        label="آواتار نویسنده"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">بیوگرافی نویسنده</label>
                    <textarea 
                      value={formData.author_bio || ''} 
                      onChange={(e) => setFormData({...formData, author_bio: e.target.value})} 
                      rows={4}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="معرفی کوتاه از نویسنده و تخصص او..."
                    />
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <h4 className="text-orange-400 font-medium mb-2">تنظیمات پیشرفته</h4>
                    <p className="text-dark-400 text-sm">
                      تنظیمات پیشرفته برای کنترل دقیق‌تر مقاله
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">وضعیت مقاله</label>
                      <select 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      >
                        <option value="draft">پیش‌نویس</option>
                        <option value="pending">در انتظار بررسی</option>
                        <option value="published">منتشر شده</option>
                        <option value="archived">بایگانی شده</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">زمان انتشار برنامه‌ریزی شده</label>
                      <input 
                        type="datetime-local" 
                        value={formData.scheduled_at || ''} 
                        onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">تعداد کلمات</label>
                      <input 
                        type="number" 
                        value={formData.word_count || 0} 
                        readOnly
                        className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">تعداد بازدیدها</label>
                      <input 
                        type="number" 
                        value={formData.views || 0} 
                        readOnly
                        className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.allow_comments} 
                        onChange={(e) => setFormData({...formData, allow_comments: e.target.checked})} 
                        className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                      />
                      <span className="text-dark-300 text-sm">اجازه کامنت</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.show_toc} 
                        onChange={(e) => setFormData({...formData, show_toc: e.target.checked})} 
                        className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                      />
                      <span className="text-dark-300 text-sm">نمایش فهرست مطالب</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-2">آمار و تحلیل</h4>
                    <p className="text-dark-400 text-sm">
                      آمار بازدید و تعامل با مقاله
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <span className="text-dark-300 text-sm">بازدیدها</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formData.views || 0}</div>
                    </div>
                    <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        <span className="text-dark-300 text-sm">لایک‌ها</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formData.likes || 0}</div>
                    </div>
                    <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-dark-300 text-sm">زمان مطالعه</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formData.read_time || 5} دقیقه</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <span className="text-dark-300 text-sm">تعداد کلمات</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{formData.word_count || 0}</div>
                    </div>
                    <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-orange-400" />
                        <span className="text-dark-300 text-sm">کامنت‌ها</span>
                      </div>
                      <div className="text-2xl font-bold text-white">-</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">دسته‌بندی</label>
                      <select 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      >
                        <option value="">انتخاب کنید...</option>
                        <option value="social-media">سوشال مدیا</option>
                        <option value="content">تولید محتوا</option>
                        <option value="marketing">بازاریابی</option>
                        <option value="seo">سئو</option>
                        <option value="branding">برندینگ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">زمان مطالعه (دقیقه)</label>
                      <input 
                        type="number" 
                        value={formData.read_time || 5} 
                        onChange={(e) => setFormData({...formData, read_time: parseInt(e.target.value) || 5})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">نام نویسنده</label>
                      <input 
                        type="text" 
                        value={formData.author || ''} 
                        onChange={(e) => setFormData({...formData, author: e.target.value})} 
                        placeholder="تیم محتوا" 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">آواتار نویسنده (URL)</label>
                      <input 
                        type="text" 
                        value={formData.author_avatar || ''} 
                        onChange={(e) => setFormData({...formData, author_avatar: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                    <input 
                      type="text" 
                      value={formData.tags} 
                      onChange={(e) => setFormData({...formData, tags: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      placeholder="سئو, دیجیتال مارکتینگ, تولید محتوا" 
                    />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.is_published} 
                        onChange={(e) => setFormData({...formData, is_published: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">منتشر شود</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.is_featured} 
                        onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">مقاله ویژه</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.allow_comments} 
                        onChange={(e) => setFormData({...formData, allow_comments: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">اجازه نظرات</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'در حال پردازش...' : (editingItem ? 'بروزرسانی مقاله' : 'انتشار مقاله')}
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

export default Blog;
