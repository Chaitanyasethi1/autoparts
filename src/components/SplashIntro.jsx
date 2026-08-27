import { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Wrapper centered dead-middle of viewport */}
      <div className="relative flex items-center justify-center w-full px-4">
        
        {/* Main animated logo group */}
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ x: [0, 0, 1200] }}
          transition={{ times: [0, 0.65, 1], duration: 1.5, ease: ["easeOut", "easeOut", "easeIn"] }}
        >
          {/* Car Icon */}
          <motion.img 
            src="/assets/intro/car-icon.png" 
            alt="Car Logo" 
            className="w-48 sm:w-72 md:w-80 lg:w-[420px] z-10 relative object-contain"
            initial={{ opacity: 0, x: -600 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          
          {/* Text Logo */}
          <motion.img 
            src="/assets/intro/logo-text.png" 
            alt="Primetech Auto" 
            className="h-24 sm:h-36 md:h-44 lg:h-[200px] -ml-[130px] sm:-ml-[170px] md:-ml-[210px] lg:-ml-[280px] mt-1 md:mt-2 z-10 relative object-contain"
            style={{ mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
};
