import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Car drives in from left to center
      await animate(".car-icon", { x: [-1000, 0], opacity: [0, 1] }, { duration: 1.1, ease: "easeOut" });
      
      // Step 2: Text fades and slides in from right to sit under car
      await animate(".logo-text", { x: [60, 0], opacity: [0, 1] }, { duration: 0.7, ease: "easeOut" });
      
      // Step 3: Hold with a subtle red brand glow behind the logo
      animate(".logo-wrapper", { filter: ["drop-shadow(0px 0px 0px rgba(225, 6, 0, 0))", "drop-shadow(0px 0px 25px rgba(225, 6, 0, 0.7))"] }, { duration: 0.8 });
      await new Promise(r => setTimeout(r, 800)); // Hold for 0.8s
      
      // Step 4: Smoke particle burst behind rear wheel/gear
      animate(".smoke-puffs", { scale: [0.2, 2.5], opacity: [0, 0.8, 0], x: [0, -180], y: [0, -30] }, { duration: 0.7, ease: "easeOut" });
      
      // Step 5: Fast acceleration exit to the right
      await animate(".logo-wrapper", { x: 1600, skewX: -8 }, { duration: 0.55, ease: "easeIn", delay: 0.1 });
      
      // Step 6: Fade out dark intro screen
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      
      onComplete();
    };

    sequence();
  }, [animate, scope, onComplete]);

  return (
    <div 
      ref={scope}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* Wrapper centered dead-middle of viewport */}
      <div className="relative flex items-center justify-center w-full px-4">
        
        {/* Main animated logo group */}
        <div className="logo-wrapper relative flex items-center justify-center">
          
          {/* Smoke particle puffs attached to car rear */}
          <div className="smoke-puffs absolute left-0 bottom-4 pointer-events-none z-0 opacity-0">
            <div className="w-24 h-24 bg-zinc-300/30 blur-2xl rounded-full transform -translate-x-12" />
            <div className="w-16 h-16 bg-red-600/20 blur-xl rounded-full transform -translate-x-8 -translate-y-4" />
          </div>
          
          {/* Car Icon */}
          <motion.img 
            src="/assets/intro/car-icon.png" 
            alt="Car Logo" 
            className="car-icon w-56 sm:w-80 md:w-96 lg:w-[480px] z-10 relative object-contain"
            initial={{ opacity: 0, x: -1000 }}
          />
          
          {/* Text Logo */}
          <motion.img 
            src="/assets/intro/logo-text.png" 
            alt="Primetech Auto" 
            className="logo-text h-28 sm:h-40 md:h-48 lg:h-[230px] -ml-[145px] sm:-ml-[210px] md:-ml-[270px] lg:-ml-[380px] mt-1 md:mt-2 z-10 relative object-contain"
            style={{ mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 60 }}
          />
          
        </div>

      </div>
    </div>
  );
};
