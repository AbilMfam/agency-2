import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '../components/ui';
import api from '../services/api';
import {
  Callout, BlockQuote, CallToAction, FeatureCard, PointList,
  FullWidthImage, ImageGallery, VideoEmbed, ReelsEmbed, CodeBlock,
  Divider, TableOfContents
} from '../components/blog/BlogContentBlocks';
import {
  AuthorMeta, PostStats, AuthorBox, QuickStatsWidget, ShareWidget,
  EngagementBar, RelatedPostsSection, TagsSection, FeaturedImage, Breadcrumb
} from '../components/blog/BlogPostComponents';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.getBlogPost(slug);
        const postData = response.data;
        
        const transformedPost = {
          id: postData.id,
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt,
          content: postData.content,
          contentBlocks: postData.content_blocks || [],
          thumbnail: postData.thumbnail,
          thumbnailAlt: postData.featured_image_alt || postData.title,
          thumbnailCaption: postData.featured_image_caption,
          category: postData.category,
          categoryName: postData.category_name || postData.category,
          tags: postData.tags || [],
          author: postData.author,
          authorAvatar: postData.author_avatar,
          authorBio: postData.author_bio,
          readTime: postData.read_time || 5,
          wordCount: postData.word_count || 0,
          views: postData.views || 0,
          likes: postData.likes || 0,
          date: new Date(postData.created_at).toLocaleDateString('fa-IR'),
          featured: postData.is_featured || false,
          metaTitle: postData.meta_title,
          metaDescription: postData.meta_description,
          tableOfContents: postData.table_of_contents || [],
          showToc: postData.show_toc !== false,
          galleries: postData.galleries || [],
          videos: postData.videos || [],
          reels: postData.reels || [],
          quotes: postData.quotes || [],
          callouts: postData.callouts || [],
          ctas: postData.ctas || [],
          cards: postData.cards || [],
          lists: postData.lists || [],
        };
        
        setPost(transformedPost);
        document.title = transformedPost.metaTitle || transformedPost.title;
        
        try {
          await api.incrementBlogViews(postData.id);
        } catch {}
        
        try {
          const relatedResponse = await api.getRelatedPosts(postData.id);
          if (relatedResponse.success) {
            setRelatedPosts(relatedResponse.data || []);
          }
        } catch {
          const allPostsResponse = await api.getPublicBlogPosts();
          const related = allPostsResponse.data
            .filter(p => p.slug !== slug && p.category === postData.category)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    if (!post || liked) return;
    try {
      await api.toggleBlogLike(post.id);
      setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
      setLiked(true);
    } catch {
      // Error handled silently
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {}
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-dark-400">در حال بارگذاری مقاله...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-4xl font-bold text-white mb-4">مقاله یافت نشد</h1>
          <p className="text-dark-400 mb-8">متأسفانه مقاله مورد نظر شما پیدا نشد.</p>
          <Link to="/blog">
            <Button>بازگشت به بلاگ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="container-article mx-auto relative">
            {/* Breadcrumb */}
            <Breadcrumb categoryName={post.categoryName} />

            {/* Article Header */}
            <div className="max-w-3xl lg:max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 lg:mb-12"
              >
                {/* Category Badge */}
                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 text-sm font-medium mb-6">
                  {post.categoryName}
                </span>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 lg:mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-base md:text-lg lg:text-xl text-dark-300 max-w-2xl mx-auto mb-6 lg:mb-8">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-dark-400">
                  <AuthorMeta author={post.author} authorAvatar={post.authorAvatar} date={post.date} />
                  <PostStats readTime={post.readTime} views={post.views} />
                </div>
              </motion.div>

              {/* Featured Image */}
              <FeaturedImage 
                thumbnail={post.thumbnail} 
                thumbnailAlt={post.thumbnailAlt} 
                thumbnailCaption={post.thumbnailCaption} 
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="container-article mx-auto">
          <div className="max-w-3xl lg:max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="min-w-0 lg:pr-8"
              >
                {/* Table of Contents */}
                {post.showToc && post.tableOfContents?.length > 0 && (
                  <TableOfContents items={post.tableOfContents} />
                )}

                {/* Rich Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {/* Main HTML Content */}
                  <div 
                    className="text-dark-200 leading-relaxed blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Render Content Blocks */}
                  {post.contentBlocks && typeof post.contentBlocks === 'string' && (
                    <div 
                      className="content-blocks"
                      dangerouslySetInnerHTML={{ __html: post.contentBlocks }}
                    />
                  )}
                  
                  {/* Legacy Content Blocks (for backward compatibility) */}
                  {(Array.isArray(post.contentBlocks) ? post.contentBlocks : []).map((block, index) => {
                    switch (block.type) {
                      case 'callout':
                        return (
                          <Callout key={index} type={block.callout_type} title={block.title}>
                            {block.content}
                          </Callout>
                        );
                      case 'quote':
                        return (
                          <BlockQuote 
                            key={index}
                            author={block.author}
                            authorTitle={block.author_title}
                            authorAvatar={block.author_avatar}
                            source={block.source}
                            style={block.style}
                          >
                            {block.content}
                          </BlockQuote>
                        );
                      case 'cta':
                        return (
                          <CallToAction
                            key={index}
                            title={block.title}
                            description={block.description}
                            buttonText={block.button_text}
                            buttonUrl={block.button_url}
                            style={block.style}
                          />
                        );
                      case 'list':
                        return (
                          <PointList
                            key={index}
                            title={block.title}
                            items={block.items}
                            type={block.list_type}
                            style={block.style}
                          />
                        );
                      case 'gallery':
                        return (
                          <ImageGallery
                            key={index}
                            images={block.images}
                            layout={block.layout}
                            columns={block.columns}
                          />
                        );
                      case 'video':
                        return (
                          <VideoEmbed
                            key={index}
                            type={block.video_type}
                            videoId={block.video_id}
                            url={block.url}
                            title={block.title}
                          />
                        );
                      case 'image':
                        return (
                          <FullWidthImage
                            key={index}
                            src={block.url}
                            alt={block.alt}
                            caption={block.caption}
                            parallax={block.parallax}
                          />
                        );
                      case 'divider':
                        return <Divider key={index} style={block.style} />;
                      case 'code':
                        return (
                          <CodeBlock
                            key={index}
                            code={block.code}
                            language={block.language}
                            title={block.title}
                          />
                        );
                      default:
                        return null;
                    }
                  })}

                  {/* Render Quotes */}
                  {post.quotes?.map((quote, index) => (
                    <BlockQuote
                      key={`quote-${index}`}
                      author={quote.author}
                      authorTitle={quote.author_title}
                      authorAvatar={quote.author_avatar}
                      source={quote.source}
                      sourceUrl={quote.source_url}
                      style={quote.style}
                    >
                      {quote.content}
                    </BlockQuote>
                  ))}

                  {/* Render Callouts */}
                  {post.callouts?.map((callout, index) => (
                    <Callout
                      key={`callout-${index}`}
                      type={callout.type}
                      title={callout.title}
                    >
                      {callout.content}
                    </Callout>
                  ))}

                  {/* Render CTAs */}
                  {post.ctas?.map((cta, index) => (
                    <CallToAction
                      key={`cta-${index}`}
                      title={cta.title}
                      description={cta.description}
                      buttonText={cta.button_text}
                      buttonUrl={cta.button_url}
                      style={cta.background_type}
                    />
                  ))}

                  {/* Render Galleries */}
                  {post.galleries?.map((gallery, index) => (
                    <div key={`gallery-${index}`}>
                      {gallery.title && (
                        <h3 className="text-xl font-bold text-white mb-4">{gallery.title}</h3>
                      )}
                      <ImageGallery
                        images={gallery.images}
                        layout={gallery.layout}
                        columns={gallery.columns}
                      />
                    </div>
                  ))}

                  {/* Render Videos */}
                  {post.videos?.map((video, index) => (
                    <VideoEmbed
                      key={`video-${index}`}
                      type={video.type}
                      videoId={video.video_id}
                      url={video.url}
                      title={video.title}
                      autoplay={video.autoplay}
                    />
                  ))}

                  {/* Render Reels */}
                  {post.reels?.length > 0 && (
                    <div className="my-12">
                      <h3 className="text-xl font-bold text-white mb-4">ویدیوهای کوتاه مرتبط</h3>
                      <ReelsEmbed reels={post.reels} />
                    </div>
                  )}

                  {/* Render Cards */}
                  {post.cards?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      {post.cards.map((card, index) => (
                        <FeatureCard
                          key={`card-${index}`}
                          title={card.title}
                          description={card.description}
                          icon={card.icon}
                          image={card.image}
                          link={card.link_url}
                          linkText={card.link_text}
                          style={card.style}
                        />
                      ))}
                    </div>
                  )}

                  {/* Render Lists */}
                  {post.lists?.map((list, index) => (
                    <PointList
                      key={`list-${index}`}
                      title={list.title}
                      items={list.items}
                      type={list.type}
                      style={list.style}
                    />
                  ))}
                </div>

                {/* Tags */}
                <TagsSection tags={post.tags} />
                {/* Engagement Bar */}
                <EngagementBar 
                  post={post} 
                  liked={liked} 
                  onLike={handleLike} 
                  onShare={handleShare} 
                  copied={copied} 
                />

                {/* Mobile Sidebar */}
                <div className="lg:hidden mt-8 space-y-4">
                  <ShareWidget onShare={handleShare} copied={copied} />
                  <QuickStatsWidget readTime={post.readTime} wordCount={post.wordCount} views={post.views} />
                </div>

                {/* Author Box */}
                {post.author && (
                  <AuthorBox author={post.author} authorAvatar={post.authorAvatar} authorBio={post.authorBio} />
                )}
              </motion.article>

              {/* Sidebar - Sticky */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <ShareWidget onShare={handleShare} copied={copied} />
                  <QuickStatsWidget readTime={post.readTime} wordCount={post.wordCount} views={post.views} />
                </div>
              </aside>
            </div>

            {/* Related Posts */}
            <RelatedPostsSection posts={relatedPosts} />
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 w-12 h-12 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-all flex items-center justify-center z-40"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default BlogPost;
