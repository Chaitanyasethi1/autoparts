import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    // Attempt to play audio
    const audio = new Audio('/assets/intro/intro-sound.mp3');
    audio.volume = 0.7; // Adjust volume here
    audio.play().catch(err => console.log("Audio autoplay prevented by browser", err));

    const timer = setTimeout(() => {
      onComplete();
    }, 2400); // Increased from 1400ms
    return () => clearTimeout(timer);
  }, [started, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden ${started ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute z-[200] flex flex-col items-center gap-6"
          >
            <button 
              onClick={() => setStarted(true)}
              className="px-8 py-4 bg-primary text-white font-display font-black text-2xl uppercase tracking-widest rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-primary/90 hover:scale-105 transition-all"
            >
              Start Engine
            </button>
            <p className="text-zinc-400 font-body text-sm">Click to enter site and play audio</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wrapper centered dead-middle of viewport */}
      {started && (
        <div className="relative flex items-center justify-center w-full px-4">
          
          {/* Main animated logo group */}
          <motion.div 
            className="relative flex items-center justify-center"
            animate={{ x: [0, 0, 1400] }}
            transition={{ times: [0, 0.65, 1], duration: 2.3, ease: ["easeOut", "easeOut", "easeIn"] }}
          >
            {/* Car Icon */}
            <motion.img 
              src="/assets/intro/car-icon.png" 
              alt="Car Logo" 
              className="w-48 sm:w-72 md:w-80 lg:w-[420px] z-10 relative object-contain"
              initial={{ opacity: 0, x: -600 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            />
            
            {/* Text Logo */}
            <motion.img 
              src="/assets/intro/logo-text.png" 
              alt="Primetech Auto" 
              className="h-24 sm:h-36 md:h-44 lg:h-[200px] -ml-[130px] sm:-ml-[170px] md:-ml-[210px] lg:-ml-[280px] mt-1 md:mt-2 z-10 relative object-contain"
              style={{ mixBlendMode: 'screen' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
