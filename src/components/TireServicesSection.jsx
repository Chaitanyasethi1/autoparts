import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Settings, RefreshCw } from 'lucide-react';

export const TireServicesSection = () => {
  return (
    <section className="bg-zinc-950 py-16 border-y border-red-600/30 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-wider text-white">
            TIRE REPAIRS, INSTALLATIONS <span className="text-primary">&</span> ROTATIONS
          </h2>
          <div className="w-32 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:h-[400px] mb-12 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden h-[300px] md:h-full"
          >
            <img 
              src="/assets/service-tires-real.jpg" 
              alt="Tire Repairs" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Repairs</h3>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group overflow-hidden h-[300px] md:h-full"
          >
            <img 
              src="/assets/service-alignment-real.jpg" 
              alt="Installations" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Installations</h3>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group overflow-hidden h-[300px] md:h-full"
          >
            <img 
              src="/assets/wheel-alignment-yeT8hptM.jpg" 
              alt="Rotations" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Rotations</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wide text-white m-0">TIRE REPAIRS</h3>
            </div>
            <p className="text-zinc-400 font-body text-sm md:text-base leading-relaxed md:pl-18">
              Puncture repairs, leak sealing and flat tire solutions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wide text-white m-0">INSTALLATIONS</h3>
            </div>
            <p className="text-zinc-400 font-body text-sm md:text-base leading-relaxed md:pl-18">
              Professional tire mounting and balancing for a smooth, safe ride.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wide text-white m-0">ROTATIONS</h3>
            </div>
            <p className="text-zinc-400 font-body text-sm md:text-base leading-relaxed md:pl-18">
              Regular tire rotations for even wear and longer tire life.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
