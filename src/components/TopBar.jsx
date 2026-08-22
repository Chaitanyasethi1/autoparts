import { MapPin, Zap, ShieldCheck, Smartphone, Apple, Tag } from 'lucide-react'

export const TopBar = () => {
  return (
    <div className="bg-transparent text-zinc-200 text-sm py-3 border-b border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* Left Side: Announcements */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-5 font-body tracking-wide font-bold text-center md:text-left">
          
          {/* Sale Announcement */}
          <span className="flex items-center gap-1.5 text-primary drop-shadow-md">
            <Tag className="w-4 h-4" /> BIG SALE: UP TO 20% OFF ON TIRES!
          </span>
          <span className="hidden sm:inline text-zinc-600">|</span>

          <span className="flex items-center gap-1.5">
            Proudly Canadian
          </span>
          <span className="hidden lg:inline text-zinc-600">|</span>
          <span className="hidden lg:flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-500" /> Fast Walk-In Service
          </span>
        </div>

        {/* Right Side: App Download Coming Soon */}
        <div className="flex items-center gap-3 shrink-0 mt-2 md:mt-0">
          <span className="font-display uppercase tracking-wider text-xs font-bold text-zinc-300">
            Download App:
          </span>
          <div className="flex items-center gap-2 relative group cursor-not-allowed">
            <div className="bg-zinc-800 p-2 rounded-md text-zinc-400 group-hover:text-zinc-500 transition-colors">
              <Apple className="w-4 h-4" />
            </div>
            <div className="bg-zinc-800 p-2 rounded-md text-zinc-400 group-hover:text-zinc-500 transition-colors">
              <Smartphone className="w-4 h-4" />
            </div>
            
            {/* Coming Soon Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              Coming Soon
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
