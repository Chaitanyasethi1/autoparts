import { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';

export const SplashIntro = ({ onComplete }) => {
  const [scope, animate] = useAnimate();
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    if (isSkipping) return;

    const sequence = async () => {
      // Step 1: Car drives in from the left
      await animate(".car-icon", { x: [-1000, 0], opacity: [0, 1] }, { duration: 1.2, ease: "easeOut" });
      
      // Step 2: Text fades and slides in from the right
      await animate(".logo-text", { x: [50, 0], opacity: [0, 1] }, { duration: 0.8, ease: "easeOut" });
      
      // Step 3: Hold with a subtle red glow
      animate(".logo-container", { filter: ["drop-shadow(0px 0px 0px rgba(225, 6, 0, 0))", "drop-shadow(0px 0px 20px rgba(225, 6, 0, 0.6))"] }, { duration: 0.8 });
      await new Promise(r => setTimeout(r, 800)); // Hold for 0.8s
      
      // Step 4: Smoke particle effect (CSS scaling/opacity)
      animate(".smoke-effect", { scale: [0.5, 2], opacity: [0, 0.8, 0], x: [-20, -100] }, { duration: 0.6, ease: "easeOut" });
      
      // Step 5: Fast exit to the right
      await animate(".logo-container", { x: 1500, skewX: -10 }, { duration: 0.6, ease: "easeIn", delay: 0.1 });
      
      // Step 6: Fade out overlay
      await animate(scope.current, { opacity: 0 }, { duration: 0.4 });
      
      onComplete();
    };

    sequence();
  }, [animate, scope, isSkipping, onComplete]);

  const handleSkip = () => {
    setIsSkipping(true);
    onComplete();
  };

  return (
    <div 
      ref={scope}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* Container for logo elements */}
      <div className="logo-container relative flex items-center justify-center">
        
        {/* Smoke Particle (behind the car) */}
        <div className="smoke-effect absolute left-[-20px] bottom-0 w-24 h-24 bg-white/20 blur-xl rounded-full opacity-0 pointer-events-none z-0" />
        
        {/* Car Icon */}
        <motion.img 
          src="/assets/intro/car-icon.png" 
          alt="Car Logo" 
          className="car-icon w-64 md:w-96 lg:w-[500px] z-10 relative object-contain"
          initial={{ opacity: 0, x: -1000 }}
        />
        
        {/* Text Logo */}
        <motion.img 
          src="/assets/intro/logo-text.png" 
          alt="Primetech Auto" 
          className="logo-text h-32 md:h-52 lg:h-[250px] -ml-[90px] md:-ml-[190px] lg:-ml-[320px] mt-1 md:mt-2 lg:mt-3 z-10 relative object-contain"
          style={{ mixBlendMode: 'screen' }} // Removes the black background
          initial={{ opacity: 0, x: 50 }}
        />
        
      </div>

      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors font-body text-sm tracking-wider uppercase z-20"
      >
        Skip Intro
      </button>
    </div>
  );
};
