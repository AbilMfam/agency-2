import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const VideoPlayer = ({ 
  src, 
  poster, 
  thumbnail,
  title,
  subtitle,
  icon,
  className = '', 
  autoPlay = false, 
  muted = true, 
  loop = true,
  controls = true,
  aspectRatio = '16/9',
  showOverlay = true,
  onPlay,
  onPause
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    if (isPlaying) {
      video.pause();
      onPause?.();
    } else {
      video.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayThumbnail = thumbnail || poster;

  return (
    <div 
      ref={containerRef}
      className={`relative bg-dark-900 rounded-2xl overflow-hidden ${className}`}
      style={{ aspectRatio }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Thumbnail Overlay - shown before video starts */}
      <AnimatePresence>
        {!hasStarted && displayThumbnail && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <img
              src={displayThumbnail}
              alt={title || 'Video thumbnail'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            
            {/* Title & Subtitle Overlay */}
            {(title || subtitle || icon) && showOverlay && (
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {icon && (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mb-3">
                    {typeof icon === 'string' ? (
                      <span className="text-xl">{icon}</span>
                    ) : (
                      icon
                    )}
                  </div>
                )}
                {title && (
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">{title}</h3>
                )}
                {subtitle && (
                  <p className="text-dark-300 text-sm md:text-base">{subtitle}</p>
                )}
              </div>
            )}

            {/* Big Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-2xl shadow-primary-500/30"
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
              </motion.button>
            </div>

            {/* Duration Badge */}
            {duration > 0 && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                  {formatTime(duration)}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        src={src}
        poster={!displayThumbnail ? poster : undefined}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline
        onLoadedMetadata={handleVideoLoaded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {controls && hasStarted && (
        <>
          {/* Overlay Controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 transition-opacity duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
            {/* Title in controls if provided */}
            {title && (
              <div className="mb-2">
                <p className="text-white text-sm font-medium truncate">{title}</p>
              </div>
            )}
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </motion.button>

                {/* Time */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Mute/Unmute */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              {/* Fullscreen */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            background: #3b82f6;
            border-radius: 50%;
            cursor: pointer;
          }
          .slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            background: #3b82f6;
            border-radius: 50%;
            cursor: pointer;
            border: none;
          }
        `
      }} />
    </div>
  );
};

export default VideoPlayer;
