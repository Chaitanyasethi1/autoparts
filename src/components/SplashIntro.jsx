import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  const [audio] = useState(() => new Audio('/assets/intro/intro-sound.mp3'));

  useEffect(() => {
    // Attempt to play audio gently on mount (will play if browser policies allow)
    audio.load();
    audio.volume = 0.6;
    audio.play().catch(err => {
      // Browsers often require interaction for sound; catch silently
      console.log("Audio autoplay prevented by browser policy", err);
    });

    // Automatically transition to website after intro animation completes
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [audio, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={onComplete}
      title="Click to skip"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20 pointer-events-none" />

      {/* Main animated logo group */}
      <div className="relative flex items-center justify-center w-full px-4">
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ x: [0, 0, 1400] }}
          transition={{ times: [0, 0.72, 1], duration: 2.2, ease: ["easeOut", "easeOut", "easeIn"] }}
        >
          {/* Car Icon */}
          <motion.img 
            src="/assets/intro/car-icon.png" 
            alt="Car Logo" 
            className="w-48 sm:w-72 md:w-80 lg:w-[420px] z-10 relative object-contain drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]"
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          
          {/* Text Logo */}
          <motion.img 
            src="/assets/intro/logo-text.png" 
            alt="Primetech Auto" 
            className="h-24 sm:h-36 md:h-44 lg:h-[200px] -ml-[130px] sm:-ml-[170px] md:-ml-[210px] lg:-ml-[280px] mt-1 md:mt-2 z-10 relative object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            style={{ mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Subtle skip indicator at the bottom */}
      <div className="absolute bottom-6 text-zinc-500 text-xs tracking-widest uppercase font-display opacity-60">
        Loading Primetech Auto...
      </div>
    </motion.div>
  );
};
