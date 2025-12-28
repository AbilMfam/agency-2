import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant = 'default' }) => {
  const variants = {
    default: (
      <>
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.4) 0%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.35, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </>
    ),
    hero: (
      <>
        <motion.div
          className="absolute top-[-100px] right-[-100px] md:top-[-200px] md:right-[-200px] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 30%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-150px] left-[-100px] md:bottom-[-300px] md:left-[-200px] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, rgba(217,70,239,0.1) 30%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 60%)',
            filter: 'blur(50px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${10 + (i * 11) % 80}%`,
                willChange: 'transform, opacity',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </>
    ),
    glow: (
      <>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background: 'linear-gradient(90deg, rgba(249,115,22,0.3), rgba(217,70,239,0.3), rgba(6,182,212,0.3))',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </>
    ),
    mesh: (
      <>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.15) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'paint layout' }}>
      {variants[variant]}
    </div>
  );
};

export default AnimatedBackground;
