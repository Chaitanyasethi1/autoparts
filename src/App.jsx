import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet, Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, MapPin, Wrench, Check, Tag, Mail, ArrowRight, ArrowLeft, Menu, X, Star, Shield, Car, Battery, Disc, Instagram, ArrowUp, ChevronRight, Calendar } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { BookingSection } from './components/BookingSection'
import { MagnetizeButton } from './components/ui/magnetize-button'
import { TopBar } from './components/TopBar'
import { ChatWidget } from './components/ChatWidget'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './context/ProtectedRoute'
import { AdminLogin } from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'

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
    <div className={`flex items-center justify-center ${className}`}>
      <img src="/primetechauto.png" alt="Primetech Auto & Tires Logo" className="w-[120px] md:w-[160px] lg:w-[180px] h-auto object-contain drop-shadow-lg" />
    </div>
  )
}

import { SplashIntro } from './components/SplashIntro'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const menuItems = [
    { label: "Why Us", to: "/why-us" },
    { label: "Services", to: "/services" },
    { label: "Reviews", to: "/reviews" },
    { label: "Contact", to: "/contact" }
  ]

  return (
    <nav className="bg-transparent">
      <div className="container mx-auto relative flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center z-10" aria-label="Primetech Auto & Tires home">
          <BrandLogo />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-10">
          {menuItems.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="font-display text-lg font-black uppercase tracking-wider text-white hover:text-primary transition-colors drop-shadow-md"
            >
              {c.label}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-3 z-10">
          <MagnetizeButton
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-secondary text-secondary px-6 py-2.5 font-display text-sm uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </MagnetizeButton>
          <MagnetizeButton
            href={PHONE_URL}
            className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity glow-red"
            id="nav-call-btn"
          >
            <Phone className="w-4 h-4" />
            {PHONE_NUMBER}
          </MagnetizeButton>
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
                <Link
                  key={c.to}
                  to={c.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-lg uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  {c.label}
                </Link>
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
    <section className="relative min-h-[95svh] md:min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-24 md:pt-0 pb-20 md:pb-0">
      <video
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(0 0% 0% / 0.2) 0%, hsl(0 0% 0% / 0.6) 100%)" }} />
      <div className="relative z-10 container mx-auto px-4 sm:px-8 text-left w-full md:mt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl flex flex-col gap-4 sm:gap-6"
        >
          <h1 className="font-display text-[1.45rem] sm:text-4xl md:text-6xl lg:text-7xl font-black leading-snug sm:leading-tight mb-2 md:mb-4 text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}>
            Expert <span className="text-primary" style={{ textShadow: 'none', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.8))' }}>Auto & Tire</span> Service
            <br />
            <span>You Can Count On</span>
          </h1>
          <p className="font-body text-zinc-200 text-sm sm:text-base md:text-xl mb-2 sm:mb-4 font-bold leading-relaxed max-w-xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)' }}>
            From vehicle inspections and engine diagnostics to new tires and brake repair. Our certified mechanics deliver fast, reliable repairs in Stoney Creek.
          </p>
          <p className="font-display text-secondary text-[11px] sm:text-xs md:text-base uppercase tracking-wider font-black mb-4 sm:mb-6 md:mb-10 flex items-center justify-start gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> Open 7 Days a Week - Walk-ins Welcome
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start">
            <a
              href={PHONE_URL}
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-primary text-primary-foreground px-5 py-3 md:px-8 md:py-4 rounded-md font-display text-base md:text-lg uppercase tracking-wider hover:opacity-90 transition-opacity glow-red"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Call Now: {PHONE_NUMBER}
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-zinc-900/80 border border-secondary text-secondary px-5 py-3 md:px-8 md:py-4 rounded-md font-display text-base md:text-lg uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              Get Directions
            </a>
          </div>
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
    img: "/assets/service-inspection-real.jpg",
    alt: "Vehicle inspection and safety standards certification at Primetech",
    badge: "Safety Standards"
  },
  {
    title: "Engine Diagnostics & Repair",
    desc: "Complete engine diagnostics, check engine light scanning, ECU/BCM programming, timing belt replacement, tuning, overhaul, and major engine repairs.",
    img: "/assets/service-engine-real.jpg",
    alt: "Engine diagnostics and check engine repair service at Primetech",
    badge: "Most Advanced"
  },
  {
    title: "AC Servicing & Repairs",
    desc: "AC compressor replacement, AC gas recharge, leak detection, heating system diagnostics, and heater core repair to keep you comfortable through all seasons.",
    img: "/assets/service-ac-real.jpg",
    alt: "AC recharge and heating system repairs",
    badge: "Seasonal Special"
  },
  {
    title: "Exhaust Repairs",
    desc: "Muffler replacements, catalytic converter repair, exhaust pipe welding, oxygen sensor service, and exhaust leak diagnostics for clean, quiet operation.",
    img: "/assets/service-exhaust-real.jpg",
    alt: "Exhaust repairs and muffler replacements"
  },
  {
    title: "Tire Repairs, Installations & Rotations",
    desc: "Flat tire repairs, professional mounting and computer wheel balancing, regular tire rotations, and seasonal tire changeovers (on or off rims).",
    img: "/assets/service-alignment-real.jpg",
    alt: "Tire mounting and wheel balancing service",
    badge: "Wheel & Tire Care"
  },
  {
    title: "New Tires Sales",
    desc: "We sell brand new tires from all major industry brands. Passenger tires, performance tires, SUV, light truck, and winter tires at competitive prices.",
    img: "/assets/service-tires-real.jpg",
    alt: "New tires sales from top brands"
  },
  {
    title: "Lube & Oil Changes",
    desc: "Fast lube and synthetic oil changes, premium oil filters, top-up of all crucial fluids, and a complimentary 21-point vehicle safety checklist.",
    img: "/assets/service-oil-real.jpg",
    alt: "Fast oil change and lube service",
    badge: "Quick Service"
  },
  {
    title: "Steering & Suspension",
    desc: "Replacing worn shocks and struts, ball joints, control arms, tie rod ends, sway bar links, wheel bearings, and power steering repairs.",
    img: "/assets/service-suspension-real.jpg",
    alt: "Steering and suspension repair service"
  },
  {
    title: "Brake Service & Replacement",
    desc: "Replacing brake pads and rotors, brake caliper replacement, master cylinder repair, ABS module diagnostics, and complete brake system flushes.",
    img: "/assets/service-brakes-real.jpg",
    alt: "Brake service and pad replacement",
    badge: "Stopping Power"
  },
  {
    title: "Battery & Alternator Repairs",
    desc: "Battery testing and replacement, alternator testing and rebuilds, starter motor replacement, and diagnostic of starting & charging electrical systems.",
    img: "/assets/service-battery-real.jpg",
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
            We provide a complete range of auto repair services in Stoney Creek and nearby areas. Walk in anytime during business hours - no appointment needed.
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
    price: "$79.99",
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
    price: "$79.99",
    note: "Starting at",
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

export const WhyChooseSection = () => {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Our Core Values</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Primetech</span>
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: "Fully Licensed", desc: "Our repair facility and technicians are fully licensed, insured, and certified." },
            { icon: Clock, title: "No Appointment Needed", desc: "First come, first served for lube and tire services only. Stop by our shop anytime during regular hours." },
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
              className="group w-full h-[230px] cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full h-full duration-700 transition-transform group-hover:[transform:rotateY(180deg)]" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-900/90 hover:bg-zinc-900 transition-all rounded-2xl border border-white/10 group-hover:border-primary/40 shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(225,6,0,0.15)]">
                    <e.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 text-white text-center tracking-wide">{e.title}</h3>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    Hover for info →
                  </span>
                </div>
                
                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-950 via-zinc-900 to-zinc-950 rounded-2xl border border-primary/50 flex flex-col items-center justify-center p-6 text-center shadow-2xl shadow-primary/20"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <e.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display text-base font-bold text-white mb-2">{e.title}</h4>
                  <p className="font-body text-zinc-300 text-xs leading-relaxed">{e.desc}</p>
                </div>
              </div>
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
  },
  {
    name: "Michael R.",
    location: "Grimsby",
    rating: 5,
    text: "Stopped by for an oil change without an appointment. They got me in right away. Very professional and friendly staff.",
    source: "Google"
  },
  {
    name: "Sarah L.",
    location: "Hamilton",
    rating: 5,
    text: "My AC stopped working in the middle of a heatwave. Primetech diagnosed and fixed the leak the same day. Highly recommended!",
    source: "Google"
  },
  {
    name: "David W.",
    location: "Stoney Creek",
    rating: 5,
    text: "Best tire shop in the area. They gave me a great deal on a set of Michelins and the alignment was spot on.",
    source: "Google"
  },
  {
    name: "Robert K.",
    location: "Burlington",
    rating: 5,
    text: "Honest and transparent pricing. They showed me exactly what was wrong with my suspension before doing any work.",
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

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Top</span> Rated in Stoney Creek
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10">
            See what vehicle owners in Stoney Creek and Hamilton have to say about our auto care services.
          </p>
        </div>
        
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="w-full relative flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-6 w-max animate-scroll">
            {[...reviews, ...reviews].map((e, t) => (
              <div
                key={t}
                className="w-[320px] md:w-[380px] shrink-0 bg-background rounded-lg p-6 border border-border"
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
              </div>
            ))}
          </div>
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
                <Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div className="text-secondary font-semibold">
                  <p>Monday - Friday: 9 AM - 8 PM</p>
                  <p>Saturday: 10 AM - 8 PM</p>
                  <p>Sunday: 11 AM - 5 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href={PHONE_URL} className="hover:text-foreground transition-colors font-bold text-foreground">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-foreground transition-colors font-semibold">
                  {EMAIL}
                </a>
              </li>
              {INSTAGRAM_URL && (
                <li className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors text-primary"
                  >
                    @PRIMETECH_AUTO_TIRES
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

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-[60] bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <BrandLogo className="mb-4 justify-start" />
            <p className="font-body text-sm text-muted-foreground mt-2 max-w-sm">
              Stoney Creek's most trusted automotive repair and tire shop. Providing expert, fully licensed services to Hamilton and surrounding areas since day one.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Customer Reviews', path: '/reviews' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="flex items-center gap-2 hover:text-primary transition-colors group">
                    <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Services */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-6">Top Services</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              {[
                { name: 'Vehicle Inspections & Safety', path: '/services/vehicle-inspections' },
                { name: 'Engine Diagnostics & Repair', path: '/services/engine-diagnostics' },
                { name: 'AC Servicing & Repairs', path: '/services/ac-repair' },
                { name: 'Tire Repairs & Installations', path: '/services/tire-services' },
                { name: 'Brake Service & Replacement', path: '/services/brake-service' },
                { name: 'Battery & Alternator Repairs', path: '/services/battery-repair' },
              ].map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="flex items-center gap-2 hover:text-primary transition-colors group">
                    <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4 font-body text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={PHONE_URL} className="hover:text-primary transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">MON to FRI: 9:00 AM - 6:00 PM</p>
                  <p className="font-bold text-foreground">SAT: 9:00 AM - 3:00 PM</p>
                  <p>SUN: Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="stripe-accent w-full mt-12 mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Primetech Auto & Tires. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const StickyMobileCall = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-zinc-950 border-t border-white/10 safe-bottom grid grid-cols-2 shadow-2xl">
      <a
        href={PHONE_URL}
        className="flex items-center justify-center gap-2 w-full py-4 px-2 bg-primary font-display text-primary-foreground text-sm sm:text-base uppercase tracking-wider active:opacity-80 transition-opacity"
        id="sticky-call-btn"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        Call Now
      </a>
      <a
        href="/#book"
        className="flex items-center justify-center gap-2 w-full py-4 px-2 bg-zinc-900 font-display text-white text-sm sm:text-base uppercase tracking-wider active:opacity-80 transition-colors hover:bg-zinc-800"
      >
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        Book Appt
      </a>
    </div>
  )
}

import { 
  AboutPage, 
  ServicesPage, 
  ReviewsPage, 
  ContactPage, 
  PrivacyPolicyPage, 
  TermsOfServicePage, 
  VehicleInspectionsPage,
  EngineDiagnosticsPage,
  ACRepairPage,
  TireServicesPage,
  BrakeServicePage,
  BatteryRepairPage,
  WhyUsPage
} from './pages/PublicPages'

const MainLayout = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Primetech Auto & Tires | Licensed Auto Repair & Tire Services Stoney Creek</title>
        <meta name="description" content="Professional auto repair and new tires sales in Stoney Creek. Engine diagnostics, brake service, battery, alternator & vehicle safety inspections. Call +1 (289) 834-2838." />
        <meta property="og:title" content="Primetech Auto & Tires | Stoney Creek" />
        <meta property="og:description" content="Professional auto repair and new tires sales in Stoney Creek. Walk-ins welcome!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/hero-mechanic-4RsVa3Uu.jpg" />
        <link rel="canonical" href="https://primetechauto.ca" />
      </Helmet>
      <div className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-md border-b border-white/10' : 'bg-transparent'}`}>
        <TopBar />
        <Navbar />
      </div>
      <div className="min-h-screen flex flex-col bg-background text-foreground font-body relative">
        <main className="flex-grow pb-16 md:pb-0 flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <StickyMobileCall />
        <ScrollToTopButton />
        <ChatWidget />
        <Toaster position="bottom-right" richColors theme="dark" />
      </div>
    </>
  )
}

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashIntro onComplete={() => {
          setShowSplash(false);
        }} />}
      </AnimatePresence>
      <Hero />
      <ServicesSection />
      <PricingSection />
      <WhyChooseSection />
      <BookingSection />
      <ReviewsSection />
      <ContactSection />
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="why-us" element={<WhyUsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/vehicle-inspections" element={<VehicleInspectionsPage />} />
              <Route path="services/engine-diagnostics" element={<EngineDiagnosticsPage />} />
              <Route path="services/ac-repair" element={<ACRepairPage />} />
              <Route path="services/tire-services" element={<TireServicesPage />} />
              <Route path="services/brake-service" element={<BrakeServicePage />} />
              <Route path="services/battery-repair" element={<BatteryRepairPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsOfServicePage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
