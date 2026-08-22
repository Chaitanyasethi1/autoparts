import { MapPin, Zap, ShieldCheck, Smartphone, Apple, Tag, Wrench, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const announcements = [
  { Icon: Tag, text: "BIG SALE: UP TO 20% OFF ON TIRES!" },
  { Icon: Zap, text: "FAST WALK-IN SERVICE - NO APPOINTMENT NEEDED" },
  { Icon: ShieldCheck, text: "FREE VEHICLE INSPECTION WITH ANY MAJOR REPAIR" },
  { Icon: Star, text: "PREMIUM QUALITY AUTO & TIRE SERVICE" },
  { Icon: Wrench, text: "EXPERT ENGINE DIAGNOSTICS & AC REPAIR" }
]

export const TopBar = () => {
  return (
    <div className="bg-transparent text-zinc-200 text-sm py-3 border-b border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* Left Side: Scrolling Sale Announcement */}
        <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center pr-4 md:pr-8">
          <motion.div
            className="flex items-center gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...announcements, ...announcements, ...announcements, ...announcements].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-primary font-body tracking-wide font-bold drop-shadow-md whitespace-nowrap">
                <item.Icon className="w-4 h-4" /> {item.text}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
