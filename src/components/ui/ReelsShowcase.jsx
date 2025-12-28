import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import api from '../../services/api';

const defaultReels = [
  { id: 1, title: 'معرفی محصول جدید', views: '۱۲.۵K', likes: '۲.۳K', comments: '۱۵۶', gradient: 'from-rose-500 to-pink-600' },
  { id: 2, title: 'پشت صحنه تولید محتوا', views: '۸.۲K', likes: '۱.۸K', comments: '۸۹', gradient: 'from-violet-500 to-purple-600' },
  { id: 3, title: 'نکات طلایی اینستاگرام', views: '۲۵.۱K', likes: '۵.۴K', comments: '۳۲۱', gradient: 'from-blue-500 to-cyan-600' },
  { id: 4, title: 'ترند جدید ریلز', views: '۱۸.۷K', likes: '۴.۱K', comments: '۲۱۸', gradient: 'from-orange-500 to-amber-600' },
  { id: 5, title: 'آموزش ادیت حرفه‌ای', views: '۱۵.۳K', likes: '۳.۲K', comments: '۱۷۴', gradient: 'from-emerald-500 to-teal-600' },
];

const ReelCard = ({ reel, index, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (reel.video_url && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isPlaying && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer flex-shrink-0 w-[220px] md:w-[260px]"
    >
      {/* Background - Thumbnail or Gradient */}
      <div className={`absolute inset-0 ${!reel.thumbnail ? `bg-gradient-to-br ${reel.gradient}` : ''}`}>
        {reel.thumbnail ? (
          <img 
            src={reel.thumbnail} 
            alt={reel.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl opacity-30">🎬</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Video Element - Hidden until played */}
      {reel.video_url && (
        <video
          ref={videoRef}
          src={reel.video_url}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
        />
      )}

      {/* Play Button Overlay */}
      <AnimatePresence>
        {(isHovered || !reel.thumbnail) && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
            >
              <Play className="w-6 h-6 text-white mr-[-2px]" fill="white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pause Button when playing */}
      {isPlaying && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
            className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
          >
            <Pause className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white font-bold text-lg mb-3">{reel.title}</h4>
        
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {reel.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {reel.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {reel.comments}
          </span>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
        >
          <Heart className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
        >
          <Share2 className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Type Badge */}
      <div className="absolute top-4 left-4">
        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold">
          {reel.video_type === 'horizontal' ? 'ویدیو' : 'ریلز'}
        </div>
      </div>
    </motion.div>
  );
};

const ReelsShowcase = () => {
  const scrollRef = useRef(null);
  const [currentReel, setCurrentReel] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [reels, setReels] = useState(defaultReels);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await api.getReels('vertical');
        if (response.success && response.data && response.data.length > 0) {
          setReels(response.data);
        }
      } catch (error) {
        console.error('Error fetching reels:', error);
      }
    };
    fetchReels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInView && !isUserScrolling) {
        setCurrentReel((prev) => {
          const next = (prev + 1) % reels.length;
          if (scrollRef.current) {
            const reelElements = scrollRef.current.children;
            if (reelElements[next]) {
              reelElements[next].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
              });
            }
          }
          return next;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isUserScrolling, reels.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleUserScroll = () => {
    setIsUserScrolling(true);
    setTimeout(() => setIsUserScrolling(false), 5000); // Reset after 5 seconds
  };

  const scrollToReel = (index) => {
    setCurrentReel(index);
    setIsUserScrolling(true);
    setTimeout(() => setIsUserScrolling(false), 5000);
    if (scrollRef.current) {
      const reelElements = scrollRef.current.children;
      if (reelElements[index]) {
        reelElements[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(236,72,153,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400 text-sm font-medium mb-4 border border-pink-500/20">
            ریلز و ویدیو
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            محتوای <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">ویدیویی</span> حرفه‌ای
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            ریلزهای جذاب و وایرال برای افزایش تعامل و رشد پیج شما
          </p>
        </motion.div>

        <div 
          ref={scrollRef}
          onScroll={handleUserScroll}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-4 -mx-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {reels.map((reel, index) => (
            <div key={reel.id} style={{ scrollSnapAlign: 'center' }}>
              <ReelCard reel={reel} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-6"
        >
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToReel(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentReel 
                  ? 'bg-pink-500 w-8' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReelsShowcase;
