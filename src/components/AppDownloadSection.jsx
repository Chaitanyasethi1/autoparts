import { Check, Apple, Play } from 'lucide-react'

export const AppDownloadSection = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-24 border-t border-border overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: Content */}
          <div className="flex-1 max-w-2xl relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Download Our <span className="text-primary">Mobile App</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8">
              Now book appointments, approve estimates, and track your vehicle's service history right from our upcoming mobile app!
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Exclusive app-only discounts and loyalty rewards",
                "Real-time service tracking & push notifications",
                "Digital vehicle inspection reports & photos",
                "Saved vehicles & complete service history"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 font-body text-foreground">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* App Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group inline-block cursor-not-allowed">
                <button disabled className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 pointer-events-none">
                  <Apple className="w-6 h-6 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-body leading-none mb-1">Download on</div>
                    <div className="text-lg font-display font-bold leading-none">App Store</div>
                  </div>
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  Coming Soon
                </div>
              </div>

              <div className="relative group inline-block cursor-not-allowed">
                <button disabled className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 pointer-events-none">
                  <Play className="w-6 h-6 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-body leading-none mb-1">Get it on</div>
                    <div className="text-lg font-display font-bold leading-none">Google Play</div>
                  </div>
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Phone Mockup */}
          <div className="flex-1 relative w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[580px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden z-10">
              {/* Dynamic Island Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
              
              {/* Phone Screen Image */}
              <img 
                src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80" 
                alt="Primetech App Preview" 
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Overlay UI to make it look like an auto app */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-display text-sm">2018 Honda Civic</span>
                    <span className="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded">Ready</span>
                  </div>
                  <p className="text-white/70 text-xs">Oil Change & Brake Inspection completed.</p>
                </div>
              </div>
            </div>

            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
