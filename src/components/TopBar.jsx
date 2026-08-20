import { MapPin, Zap, Wrench, ShieldCheck, Smartphone, Apple } from 'lucide-react'

export const TopBar = () => {
  return (
    <div className="bg-[#111111] text-zinc-300 text-xs py-2 border-b border-zinc-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left Side: Announcements */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 font-body tracking-wide text-center md:text-left">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Stoney Creek's Top Rated Shop
          </span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="flex items-center gap-1.5">
            <span>🇨🇦</span> Proudly Canadian Owned
          </span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-500" /> Fast Walk-In Service
          </span>
          <span className="hidden lg:inline text-zinc-600">|</span>
          <span className="hidden lg:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Fully Licensed Mechanics
          </span>
        </div>

        {/* Right Side: App Download Coming Soon */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-display uppercase tracking-wider text-[10px] text-zinc-400">
            Download App:
          </span>
          <div className="flex items-center gap-2 relative group cursor-not-allowed">
            <div className="bg-zinc-800 p-1.5 rounded-sm text-zinc-400 group-hover:text-zinc-500 transition-colors">
              <Apple className="w-3.5 h-3.5" />
            </div>
            <div className="bg-zinc-800 p-1.5 rounded-sm text-zinc-400 group-hover:text-zinc-500 transition-colors">
              <Smartphone className="w-3.5 h-3.5" />
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
