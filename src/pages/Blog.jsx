import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, TrendingUp, Sparkles } from 'lucide-react';
import { blogCategories } from '../data/blog';
import { SectionTitle, ScrollReveal } from '../components/ui';
import api from '../services/api';

const FeaturedPost = ({ post }) => (
  <Link to={`/blog/${post.slug}`}>
    <motion.div
      whileHover={{ y: -8 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
    >
      <div className="absolute inset-0">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
      </div>
      
      <div className="relative p-8 h-full flex flex-col justify-end min-h-[400px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            ویژه
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">
            {blogCategories.find(c => c.id === post.category)?.name}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-dark-300 mb-6 line-clamp-2">{post.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <p className="text-white font-medium text-sm">{post.author}</p>
              <p className="text-dark-400 text-xs">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary-400 font-medium">
            <span>ادامه مطلب</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

const BlogCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Link to={`/blog/${post.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group cursor-pointer h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-sm text-white text-xs">
              {blogCategories.find(c => c.id === post.category)?.name}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
            <div className="flex items-center gap-2">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{post.author}</span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-dark-400 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
);

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await api.getBlogPosts();
        // Transform data to match expected format
        const transformedPosts = response.data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          thumbnail: post.thumbnail,
          category: post.category,
          tags: post.tags || [],
          author: post.author,
          authorAvatar: post.author_avatar,
          readTime: post.read_time || 5,
          date: new Date(post.created_at).toLocaleDateString('fa-IR'),
          featured: post.is_featured || false
        }));
        setBlogPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== 'all');

  if (loading) {
    return (
      <div className="pt-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="بلاگ"
              title="مقالات و آموزش‌ها"
              description="جدیدترین مطالب در حوزه دیجیتال مارکتینگ و تولید محتوا"
            />
          </ScrollReveal>

          {activeCategory === 'all' && featuredPosts.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                <FeaturedPost post={featuredPosts[0]} />
                <div className="grid grid-cols-1 gap-6">
                  {featuredPosts.slice(1, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <motion.div
                        whileHover={{ x: -8 }}
                        className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 group"
                      >
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-primary-400 mb-1 block">
                            {blogCategories.find(c => c.id === post.category)?.name}
                          </span>
                          <h4 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-dark-500 text-xs">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white/5 text-dark-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'all' ? regularPosts.filter(p => !p.featured) : regularPosts).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
