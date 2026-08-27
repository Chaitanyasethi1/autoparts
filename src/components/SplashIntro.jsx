import { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Wrapper centered dead-middle of viewport */}
      <div className="relative flex items-center justify-center w-full px-4">
        
        {/* Main animated logo group */}
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ x: [0, 0, 1600] }}
          transition={{ times: [0, 0.72, 1], duration: 2.6, ease: ["easeOut", "easeOut", "easeIn"] }}
        >
          {/* Car Icon */}
          <motion.img 
            src="/assets/intro/car-icon.png" 
            alt="Car Logo" 
            className="w-56 sm:w-80 md:w-96 lg:w-[480px] z-10 relative object-contain"
            initial={{ opacity: 0, x: -800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          
          {/* Text Logo */}
          <motion.img 
            src="/assets/intro/logo-text.png" 
            alt="Primetech Auto" 
            className="h-28 sm:h-40 md:h-48 lg:h-[230px] -ml-[145px] sm:-ml-[190px] md:-ml-[230px] lg:-ml-[310px] mt-1 md:mt-2 z-10 relative object-contain"
            style={{ mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
};
