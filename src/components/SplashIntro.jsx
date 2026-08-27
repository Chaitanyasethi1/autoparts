import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let completed = false;
    const safeComplete = () => {
      if (!completed) {
        completed = true;
        onComplete();
      }
    };

    // Hard fallback after 3.2s max
    const fallbackTimer = setTimeout(safeComplete, 3200);

    const sequence = async () => {
      try {
        // Step 1: Car drives in from left to center
        await animate(".car-icon", { x: [-1000, 0], opacity: [0, 1] }, { duration: 1.0, ease: "easeOut" });
        
        // Step 2: Text fades and slides in from right to sit under car
        await animate(".logo-text", { x: [60, 0], opacity: [0, 1] }, { duration: 0.6, ease: "easeOut" });
        
        // Step 3: Hold clean logo static
        await new Promise(r => setTimeout(r, 700));
        
        // Step 4: Fast acceleration exit to the right
        await animate(".logo-wrapper", { x: 1600, skewX: -8 }, { duration: 0.5, ease: "easeIn" });
        
        // Step 5: Fade out dark intro screen
        await animate(scope.current, { opacity: 0 }, { duration: 0.3 });
        
        safeComplete();
      } catch {
        safeComplete();
      }
    };

    sequence();

    return () => clearTimeout(fallbackTimer);
  }, [animate, scope, onComplete]);

  return (
    <div 
      ref={scope}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center w-full px-4">
        <div className="logo-wrapper relative flex items-center justify-center">
          <motion.img 
            src="/assets/intro/car-icon.png" 
            alt="Car Logo" 
            className="car-icon w-56 sm:w-80 md:w-96 lg:w-[480px] z-10 relative object-contain"
            initial={{ opacity: 0, x: -1000 }}
          />
          <motion.img 
            src="/assets/intro/logo-text.png" 
            alt="Primetech Auto" 
            className="logo-text h-28 sm:h-40 md:h-48 lg:h-[230px] -ml-[145px] sm:-ml-[190px] md:-ml-[230px] lg:-ml-[310px] mt-1 md:mt-2 z-10 relative object-contain"
            style={{ mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 60 }}
          />
        </div>
      </div>
    </div>
  );
};
