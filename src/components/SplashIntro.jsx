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
    }, 2800); // 2.8 seconds total
    return () => clearTimeout(timer);
  }, [started, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden ${started ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute z-[200] flex flex-col items-center gap-16 w-full max-w-lg px-4"
          >
            {/* Logo above the button for a premium look */}
            <img 
              src="/PRIMETECH_LOGO_TRANSPARENT.png" 
              alt="Primetech Auto" 
              className="w-64 sm:w-80 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            />

            <button 
              onClick={() => setStarted(true)}
              className="relative group px-12 py-5 bg-gradient-to-b from-primary to-primary/90 text-white font-display font-black text-2xl sm:text-3xl uppercase tracking-[0.2em] rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:shadow-[0_0_80px_rgba(220,38,38,0.8)] hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden border border-red-500/50"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              Start Engine
            </button>
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
            transition={{ times: [0, 0.7, 1], duration: 2.8, ease: ["easeOut", "easeOut", "easeIn"] }}
          >
            {/* Car Icon */}
            <motion.img 
              src="/assets/intro/car-icon.png" 
              alt="Car Logo" 
              className="w-48 sm:w-72 md:w-80 lg:w-[420px] z-10 relative object-contain"
              initial={{ opacity: 0, x: -600 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
            {/* Text Logo */}
            <motion.img 
              src="/assets/intro/logo-text.png" 
              alt="Primetech Auto" 
              className="h-24 sm:h-36 md:h-44 lg:h-[200px] -ml-[130px] sm:-ml-[170px] md:-ml-[210px] lg:-ml-[280px] mt-1 md:mt-2 z-10 relative object-contain"
              style={{ mixBlendMode: 'screen' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
