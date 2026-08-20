import { useState, useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, MapPin, Wrench, Check, Tag, Mail, ArrowRight, ArrowLeft, Menu, X, Star, Shield, Car, Battery, Disc } from 'lucide-react'
import { Toaster, toast } from 'sonner'

// Primetech Details
const PHONE_NUMBER = "+1 (289) 834-2838"
const PHONE_URL = "tel:+12898342838"
const ADDRESS = "336 Hilton Drive, Stoney Creek, ON L8E 2N3"
const INSTAGRAM_URL = "https://www.instagram.com/primetech_auto_tires/"
const EMAIL = "info@primetechauto.ca"
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=336+Hilton+Drive+Stoney+Creek+ON+L8E+2N3"
const GBP_URL = "https://maps.google.com/?q=336+Hilton+Drive,+Stoney+Creek,+ON+L8E+2N3"

// Logo Component
const BrandLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/assets/logo-ZdHDG6fE.jpg" alt="Primetech Auto & Tires Logo" className="h-12 w-auto object-contain" />
      <div className="flex flex-col">
        <span className="font-display text-xl font-black uppercase tracking-wider text-foreground leading-none">
          PRIMETECH
        </span>
        <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-secondary leading-none mt-1">
          AUTO & TIRES
        </span>
      </div>
    </div>
  )
}

const Wheel = () => (
  <div className="w-full h-full rounded-full bg-zinc-800 border-[5px] border-zinc-950 flex items-center justify-center shadow-lg relative overflow-hidden">
    <div className="absolute inset-0.5 rounded-full border border-zinc-700" />
    <div className="absolute w-full h-[4px] bg-zinc-500 rounded-sm" />
    <div className="absolute w-full h-[4px] bg-zinc-500 rounded-sm rotate-45" />
    <div className="absolute w-full h-[4px] bg-zinc-500 rounded-sm rotate-90" />
    <div className="absolute w-full h-[4px] bg-zinc-500 rounded-sm -rotate-45" />
    <div className="w-3 h-3 bg-secondary rounded-full z-10 border border-zinc-900" />
  </div>
)

const SplashAnimation = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
       {/* Smoke Particles */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="relative w-[240px] h-[100px]">
             {[...Array(8)].map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute w-10 h-10 bg-zinc-300 rounded-full blur-md opacity-0"
                 style={{ top: '60px', left: '10px' }}
                 animate={{
                   opacity: [0, 0, 0.8, 0],
                   scale: [0, 0, 1, 3 + (i % 3)],
                   x: [0, 0, -40 - (i * 15), -100 - (i * 30)],
                   y: [0, 0, -10 - (i * 5), -40 - (i * 10)]
                 }}
                 transition={{
                   times: [0, 0.7, 0.8, 1], // triggers when car accelerates at 0.7
                   duration: 3.5,
                   ease: "easeOut"
                 }}
               />
             ))}
          </div>
       </div>

       <motion.div
          className="relative w-[240px] h-[100px] z-10"
          animate={{ 
             x: ["-100vw", "0vw", "0vw", "100vw"],
             y: [0, 0, 15, -8, 0, 0] 
          }}
          transition={{ 
             x: { times: [0, 0.2, 0.7, 1], duration: 3.5, ease: ["easeOut", "linear", "easeIn"] },
             y: { times: [0, 0.44, 0.45, 0.48, 0.52, 1], duration: 3.5 }
          }}
          onAnimationComplete={onComplete}
       >
          {/* Car Body */}
          <svg width="240" height="100" viewBox="0 0 240 100" className="text-primary fill-current absolute top-0 left-0 drop-shadow-2xl z-10">
            <path d="M 15 80 L 15 50 Q 15 40 25 40 L 55 40 L 85 20 L 165 20 Q 175 20 185 30 L 215 50 Q 225 50 225 60 L 225 80 L 200 80 A 25 25 0 0 1 150 80 L 100 80 A 25 25 0 0 1 50 80 Z" />
            <path d="M 65 40 L 90 25 L 125 25 L 125 40 Z" fill="#fff" opacity="0.3"/>
            <path d="M 130 25 L 160 25 L 180 45 L 130 45 Z" fill="#fff" opacity="0.3"/>
            <path d="M 15 50 L 225 50" stroke="#000" strokeWidth="2" opacity="0.2" />
            <path d="M 215 55 L 225 55 L 225 65 L 210 65 Z" fill="#fbbf24" opacity="0.9" />
            <path d="M 15 55 L 25 55 L 25 65 L 15 65 Z" fill="#ef4444" opacity="0.9" />
          </svg>
          
          {/* Back Wheel */}
          <motion.div 
             className="absolute top-[60px] left-[55px] w-[40px] h-[40px] z-20"
             animate={{ rotate: [0, 720, 720, 2160] }}
             transition={{ times: [0, 0.2, 0.7, 1], duration: 3.5, ease: ["easeOut", "linear", "easeIn"] }}
          >
             <Wheel />
          </motion.div>

          {/* Front Wheel Container - Flies in from behind/left */}
          <motion.div
            className="absolute top-[60px] left-[155px] w-[40px] h-[40px] z-20"
            animate={{ 
                x: [-800, -800, 0, 0], 
                y: [-400, -400, 0, 0],
                opacity: [0, 1, 1, 1],
                scale: [2, 2, 1, 1]
            }}
            transition={{ 
                times: [0, 0.2, 0.45, 1], 
                duration: 3.5, 
                ease: ["linear", "easeOut", "linear"] // smooth landing
            }}
          >
             <motion.div 
               className="w-full h-full"
               animate={{ rotate: [0, 0, 1080, 1080, 2520] }} // Fast clockwise spin
               transition={{ times: [0, 0.2, 0.45, 0.7, 1], duration: 3.5, ease: ["linear", "easeOut", "linear", "easeIn"] }}
             >
                <Wheel />
             </motion.div>
          </motion.div>
       </motion.div>
       
       <motion.div 
         className="mt-12 flex flex-col items-center relative z-20"
         animate={{ opacity: [0, 1, 1, 0] }}
         transition={{ times: [0, 0.1, 0.8, 1], duration: 3.5 }}
       >
         <BrandLogo className="scale-150 transform mb-4" />
         <motion.div 
            className="h-1 bg-secondary rounded-full mt-4"
            animate={{ width: [0, 200, 200, 0] }}
            transition={{ times: [0, 0.2, 0.8, 1], duration: 3.5 }}
         />
       </motion.div>
    </motion.div>
  )
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const menuItems = [
    { label: "Services", hash: "#services" },
    { label: "Why Primetech", hash: "#why-us" },
    { label: "Reviews", hash: "#reviews" },
    { label: "Contact", hash: "#contact" }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="stripe-accent w-full" />
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <a href="#" className="flex items-center" aria-label="Primetech Auto & Tires home">
          <BrandLogo />
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((c) => (
            <a
              key={c.hash}
              href={c.hash}
              className="font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-secondary text-secondary px-4 py-2.5 rounded-md font-display text-sm uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
          <a
            href={PHONE_URL}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity glow-red"
            id="nav-call-btn"
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </a>
        </div>
        
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {menuItems.map((c) => (
                <a
                  key={c.hash}
                  href={c.hash}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-lg uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  {c.label}
                </a>
              ))}
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-secondary text-secondary px-5 py-3 rounded-md font-display uppercase tracking-wider"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={PHONE_URL}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md font-display uppercase tracking-wider justify-center"
              >
                <Phone className="w-4 h-4" />
                Call Now: {PHONE_NUMBER}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
      <img
        src="/assets/hero-mechanic-4RsVa3Uu.jpg"
        alt="Certified mechanics performing auto repair and tire services at Primetech"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.6) 0%, hsl(0 0% 0% / 0.95) 100%)" }} />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 text-primary px-4 py-1.5 rounded-full font-display text-xs uppercase tracking-wider font-bold mb-6">
            <Star className="w-3.5 h-3.5 fill-primary" /> Stoney Creek's Trusted Auto Care
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            Expert <span className="text-gradient">Auto & Tire</span> Service
            <br />
            You Can Count On
          </h1>
          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
            From vehicle inspections and engine diagnostics to new tires and brake repair. Our certified mechanics deliver fast, reliable repairs in Stoney Creek.
          </p>
          <p className="font-display text-secondary text-sm sm:text-base uppercase tracking-wider font-bold mb-10 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-secondary" /> Open Monday to Saturday — Walk-ins Welcome
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_URL}
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-md font-display text-lg uppercase tracking-wider hover:opacity-90 transition-opacity glow-red"
            >
              <Phone className="w-5 h-5" />
              Call Now: {PHONE_NUMBER}
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-secondary text-secondary px-8 py-4 rounded-md font-display text-lg uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { num: "336", label: "Hilton Drive" },
            { num: "5★", label: "Rated Shop" },
            { num: "100%", label: "Licensed" },
            { num: "Best", label: "Prices in Town" }
          ].map((e) => (
            <div key={e.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient">{e.num}</div>
              <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">{e.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Services mapping matching the flyer exactly
const servicesList = [
  {
    title: "Vehicle Inspection & Safety",
    desc: "Complete pre-purchase inspections, visual checks, and safety standards certifications to ensure your vehicle is safe and legally compliant on Ontario roads.",
    img: "/assets/safety-inspection-driveon-DZvfbrbb.jpg",
    alt: "Vehicle inspection and safety standards certification at Primetech",
    badge: "Safety Standards"
  },
  {
    title: "Engine Diagnostics & Repair",
    desc: "Complete engine diagnostics, check engine light scanning, ECU/BCM programming, timing belt replacement, tuning, overhaul, and major engine repairs.",
    img: "/assets/engine-diagnostics-aYzMGD8l.jpg",
    alt: "Engine diagnostics and check engine repair service at Primetech",
    badge: "Most Advanced"
  },
  {
    title: "AC Servicing & Repairs",
    desc: "AC compressor replacement, AC gas recharge, leak detection, heating system diagnostics, and heater core repair to keep you comfortable through all seasons.",
    img: "/assets/ac-repair-s9aoEJV_.jpg",
    alt: "AC recharge and heating system repairs",
    badge: "Seasonal Special"
  },
  {
    title: "Exhaust Repairs",
    desc: "Muffler replacements, catalytic converter repair, exhaust pipe welding, oxygen sensor service, and exhaust leak diagnostics for clean, quiet operation.",
    img: "/assets/transmission-repair-CNGJsM-I.jpg",
    alt: "Exhaust repairs and muffler replacements"
  },
  {
    title: "Tire Repairs, Installations & Rotations",
    desc: "Flat tire repairs, professional mounting and computer wheel balancing, regular tire rotations, and seasonal tire changeovers (on or off rims).",
    img: "/assets/wheel-alignment-yeT8hptM.jpg",
    alt: "Tire mounting and wheel balancing service",
    badge: "Wheel & Tire Care"
  },
  {
    title: "New Tires Sales",
    desc: "We sell brand new tires from all major industry brands. Passenger tires, performance tires, SUV, light truck, and winter tires at competitive prices.",
    img: "/assets/safety-inspection-driveon-DZvfbrbb.jpg",
    alt: "New tires sales from top brands"
  },
  {
    title: "Lube & Oil Changes",
    desc: "Fast lube and synthetic oil changes, premium oil filters, top-up of all crucial fluids, and a complimentary 21-point vehicle safety checklist.",
    img: "/assets/hero-mechanic-4RsVa3Uu.jpg",
    alt: "Fast oil change and lube service",
    badge: "Quick Service"
  },
  {
    title: "Steering & Suspension",
    desc: "Replacing worn shocks and struts, ball joints, control arms, tie rod ends, sway bar links, wheel bearings, and power steering repairs.",
    img: "/assets/suspension-repair-DNFvjUw4.jpg",
    alt: "Steering and suspension repair service"
  },
  {
    title: "Brake Service & Replacement",
    desc: "Replacing brake pads and rotors, brake caliper replacement, master cylinder repair, ABS module diagnostics, and complete brake system flushes.",
    img: "/assets/brake-service-DsDAzs6N.jpg",
    alt: "Brake service and pad replacement",
    badge: "Stopping Power"
  },
  {
    title: "Battery & Alternator Repairs",
    desc: "Battery testing and replacement, alternator testing and rebuilds, starter motor replacement, and diagnostic of starting & charging electrical systems.",
    img: "/assets/auto-electrical-R8BtY7J1.jpg",
    alt: "Battery alternator auto electrical repair"
  }
]

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Our Core Services</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Auto & Tire Services</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We provide a complete range of auto repair services in Stoney Creek. Walk in anytime during business hours — no appointment needed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((i, o) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: o * 0.08 }}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={i.img}
                  alt={i.alt}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {i.badge && (
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-display uppercase tracking-wider px-3 py-1 rounded-sm">
                    {i.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{i.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const specialsList = [
  {
    title: "Full Synthetic Oil Change",
    price: "$69.99",
    note: "Starting at",
    features: [
      "Premium synthetic motor oil",
      "Factory-spec oil filter",
      "Free 21-point vehicle check",
      "Fluids top-up included"
    ],
    badge: "Quick Care",
    highlight: true
  },
  {
    title: "Seasonal Tire Changeover (On Rim)",
    price: "$39.99",
    note: "Per set of 4",
    features: [
      "Swap wheels already on rims",
      "Torque specs verified",
      "Visual brake inspection",
      "Optional wheel balancing"
    ],
    badge: "Popular"
  },
  {
    title: "Tire Dismount & Balancing",
    price: "$99.99",
    note: "Per set of 4",
    features: [
      "Mount tires off rims",
      "Computer balancing included",
      "Full safety check",
      "Fits passenger & SUVs"
    ],
    badge: "Best Value"
  }
]

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Service Specials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Specials & Pricing</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Transparent pricing on regular maintenance items. Call us or walk in to get your car serviced today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {specialsList.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-lg p-6 border transition-colors ${
                r.highlight ? "bg-primary/5 border-primary/50" : "bg-background border-border hover:border-primary/30"
              }`}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {r.badge && (
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-display uppercase tracking-wider px-3 py-1 rounded-sm">
                  {r.badge}
                </span>
              )}
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mt-1">{r.note}</p>
              <div className="font-display text-4xl font-bold text-foreground mb-1">{r.price}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-5">{r.title}</h3>
              <ul className="space-y-3 mb-6">
                {r.features.map((o) => (
                  <li key={o} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PHONE_URL}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-3 rounded-md font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-secondary text-secondary px-3 py-3 rounded-md font-display text-sm uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Navigate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const WhyChooseSection = () => {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Our Core Values</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Primetech Auto & Tires</span>
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: "Fully Licensed", desc: "Our repair facility and technicians are fully licensed, insured, and certified." },
            { icon: Clock, title: "No Appointment Needed", desc: "First come, first served. Stop by our shop anytime during regular hours." },
            { icon: Wrench, title: "Expert Mechanics", desc: "Factory-trained and certified automotive mechanics who do it right the first time." },
            { icon: Tag, title: "Best Prices in Town", desc: "Competitive pricing on all inspections, diagnostics, parts, and tire installations." },
            { icon: Car, title: "All Makes & Models", desc: "Domestic, Asian, and European imports, SUVs, passenger cars, and light trucks." },
            { icon: Star, title: "Top Rated Service", desc: "Focused on quality parts, honest assessments, and customer satisfaction." }
          ].map((e, t) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: t * 0.08 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <e.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">{e.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const reviews = [
  {
    name: "John D.",
    location: "Stoney Creek",
    rating: 5,
    text: "Fast service, honest mechanics, and very reasonable pricing. They fixed my brakes and rotated my tires the same afternoon.",
    source: "Google"
  },
  {
    name: "Amandeep S.",
    location: "Hamilton",
    rating: 5,
    text: "Great prices on brand new tires. They mounted and balanced my winter set quickly. Excellent customer service!",
    source: "Google"
  },
  {
    name: "Jessica M.",
    location: "Stoney Creek",
    rating: 5,
    text: "The only shop I trust with my car. Diagnosed my check engine light accurately and didn't charge me for unnecessary fixes.",
    source: "Google"
  }
]

const RatingStars = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${n < rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  )
}

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">5.0★</span> Rated in Stoney Creek
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            See what vehicle owners in Stoney Creek and Hamilton have to say about our auto care services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((e, t) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: t * 0.08 }}
              className="bg-background rounded-lg p-6 border border-border"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <RatingStars rating={e.rating} />
                <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  {e.source}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">"{e.text}"</p>
              <div>
                <p className="font-display text-sm font-bold text-foreground">{e.name}</p>
                <p className="font-body text-xs text-muted-foreground">{e.location}, ON</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Find Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Contact & <span className="text-gradient">Location Details</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Drive in for a free visual check and custom estimate, or call us directly. No appointments needed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="font-display text-2xl font-bold text-foreground">Stoney Creek Shop</h3>
            
            <ul className="space-y-4 font-body text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-foreground font-bold">{ADDRESS}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href={PHONE_URL} className="hover:text-foreground transition-colors">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div className="text-secondary font-semibold">
                  <p>Monday — Friday: 9 AM — 6 PM</p>
                  <p>Saturday: 9 AM — 4 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
              {INSTAGRAM_URL && (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors text-primary"
                  >
                    Instagram: @PRIMETECH_AUTO_TIRES
                  </a>
                </li>
              )}
            </ul>
            
            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href={PHONE_URL}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-md font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                Call Shop
              </a>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-secondary text-secondary px-4 py-3 rounded-md font-display text-sm uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Directions
              </a>
            </div>
          </div>
          
          <div className="h-[400px] bg-card border border-border rounded-lg overflow-hidden relative" style={{ boxShadow: "var(--shadow-card)" }}>
            {/* Embedded Google Maps iFrame */}
            <iframe
              title="Primetech Auto & Tires Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.9142828006846!2d-79.73142278451586!3d43.218525779138676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c97486e9e4f01%3A0xe542617f6cdbe954!2s336%20Hilton%20Dr%2C%20Stoney%20Creek%2C%20ON%20L8E%202N3!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <BrandLogo />
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-sm">
              Your trusted automotive repair and tire shop in Stoney Creek, Ontario. Fully licensed, certified mechanics, and the best prices in town.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-4">Services</h4>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              <li>Vehicle Inspections & Safety</li>
              <li>Engine Diagnostics & Repair</li>
              <li>AC Servicing & Repairs</li>
              <li>Tire Repairs, Installations & Rotations</li>
              <li>Brake Service & Replacement</li>
              <li>Battery & Alternator Repairs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {ADDRESS}
              </p>
              <a href={PHONE_URL} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                {PHONE_NUMBER}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                Instagram: @PRIMETECH_AUTO_TIRES
              </a>
            </div>
          </div>
        </div>
        <div className="stripe-accent w-full mt-10 mb-6" />
        <p className="font-body text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Primetech Auto & Tires. All rights reserved. Serving Stoney Creek and Hamilton.
        </p>
      </div>
    </footer>
  )
}

const StickyMobileCall = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary border-t border-primary/80 safe-bottom">
      <a
        href={PHONE_URL}
        className="flex items-center justify-center gap-3 w-full py-4 px-6 font-display text-primary-foreground text-base uppercase tracking-wider active:opacity-80 transition-opacity"
        id="sticky-call-btn"
      >
        <Phone className="w-5 h-5 animate-pulse" />
        Call Now: {PHONE_NUMBER}
      </a>
    </div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    document.title = "Primetech Auto & Tires | Licensed Auto Repair & Tire Services Stoney Creek"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute("content", "Professional auto repair and new tires sales in Stoney Creek. Engine diagnostics, brake service, battery, alternator & vehicle safety inspections. Call +1 (289) 834-2838.")
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>
        {showSplash && <SplashAnimation onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-background text-foreground font-body">
        <Navbar />
        <main className="pb-16 md:pb-0">
          <Hero />
          <ServicesSection />
          <PricingSection />
          <ReviewsSection />
          <WhyChooseSection />
          <ContactSection />
        </main>
        <Footer />
        <StickyMobileCall />
        <Toaster position="bottom-right" richColors theme="dark" />
      </div>
    </BrowserRouter>
  )
}

export default App
