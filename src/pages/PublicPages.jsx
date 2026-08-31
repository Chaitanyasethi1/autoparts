import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Wrench, Settings, ArrowLeft, Shield, Clock, Tag, Car, Star } from 'lucide-react'
import { ReviewsSection, WhyChooseSection } from '../App'

// Generic Page Header Component
const PageHeader = ({ title, subtitle }) => (
  <div className="bg-zinc-950 pt-32 pb-20 border-b border-white/5">
    <div className="container mx-auto px-4 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-black mb-4 uppercase text-white"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  </div>
)

// Dummy Content Wrapper
const ContentWrapper = ({ children }) => (
  <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[50vh]">
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-primary">
      {children}
    </div>
  </div>
)

export const AboutPage = () => (
  <>
    <Helmet><title>About Us | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="About Us" subtitle="Stoney Creek's most trusted automotive repair and tire shop." />
    <ContentWrapper>
      <h2>Our Story</h2>
      <p>Primetech Auto & Tires has been proudly serving the Stoney Creek and Hamilton area with expert, fully licensed automotive services. We built our reputation on honesty, fast service, and unmatched technical expertise.</p>
      <h2>Our Mission</h2>
      <p>To provide high-quality repairs at fair prices, ensuring our community drives safe and reliable vehicles every day. Our certified mechanics use state-of-the-art diagnostic equipment to get the job done right the first time.</p>
    </ContentWrapper>
  </>
)

export const ServicesPage = () => (
  <>
    <Helmet><title>Our Services | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Our Services" subtitle="Comprehensive auto repair and maintenance solutions." />
    <ContentWrapper>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {[
          { id: 'vehicle-inspections', name: 'Vehicle Inspections & Safety' },
          { id: 'engine-diagnostics', name: 'Engine Diagnostics & Repair' },
          { id: 'ac-repair', name: 'AC Servicing & Repairs' },
          { id: 'tire-services', name: 'Tire Repairs & Installations' },
          { id: 'brake-service', name: 'Brake Service & Replacement' },
          { id: 'battery-repair', name: 'Battery & Alternator Repairs' }
        ].map(service => (
          <Link key={service.id} to={`/services/${service.id}`} className="block p-6 bg-zinc-900 border border-white/10 rounded-xl hover:border-primary transition-colors no-underline group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold m-0 group-hover:text-primary transition-colors">{service.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </ContentWrapper>
  </>
)

export const ReviewsPage = () => (
  <>
    <Helmet><title>Customer Reviews | Primetech Auto & Tires</title></Helmet>
    <div className="pt-24 min-h-screen">
      <ReviewsSection />
    </div>
  </>
)

import { BookingSection } from '../components/BookingSection'

export const ContactPage = () => (
  <>
    <Helmet><title>Contact Us | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Contact Us" subtitle="Get in touch for an appointment, diagnostics, or quote." />
    <ContentWrapper>
      <h2>Visit Our Shop</h2>
      <p><strong>Address:</strong> 336 Hilton Drive, Stoney Creek, ON L8E 2N3</p>
      <p><strong>Phone:</strong> <a href="tel:+12898342838" className="text-primary font-bold">+1 (289) 834-2838</a></p>
      <p><strong>Email:</strong> <a href="mailto:info@primetechauto.ca" className="text-primary">info@primetechauto.ca</a></p>
      <h2>Hours of Operation</h2>
      <ul>
        <li>Monday to Friday: 9:00 AM - 8:00 PM</li>
        <li>Saturday: 10:00 AM - 8:00 PM</li>
        <li>Sunday: 11:00 AM - 5:00 PM</li>
      </ul>
    </ContentWrapper>
    <div className="border-t border-white/10">
      <BookingSection />
    </div>
  </>
)

export const PrivacyPolicyPage = () => (
  <>
    <Helmet><title>Privacy Policy | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Privacy Policy" />
    <ContentWrapper>
      <p>Last updated: August 2026</p>
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us when booking appointments or contacting our shop. This may include your name, phone number, email address, and vehicle details.</p>
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages.</p>
    </ContentWrapper>
  </>
)

export const TermsOfServicePage = () => (
  <>
    <Helmet><title>Terms of Service | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Terms of Service" />
    <ContentWrapper>
      <p>Last updated: August 2026</p>
      <h2>1. Agreement to Terms</h2>
      <p>By accessing our website and utilizing our auto repair services, you agree to be bound by these Terms of Service.</p>
      <h2>2. Service Estimates</h2>
      <p>All repair estimates provided online are subject to physical inspection of the vehicle at our Stoney Creek facility. Final costs may vary based on actual diagnostic results.</p>
    </ContentWrapper>
  </>
)

export const VehicleInspectionsPage = () => (
  <>
    <Helmet><title>Vehicle Inspections & Safety | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Vehicle Inspections & Safety" subtitle="Ensure your vehicle meets all Ontario safety standards." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>We provide comprehensive pre-purchase inspections, visual safety checks, and official safety standards certifications. Whether you're buying a used car or need a mandatory inspection, our licensed mechanics will ensure your vehicle is road-ready and legally compliant.</p>
      <ul>
        <li>Ontario Safety Standards Certificates (SSC)</li>
        <li>Pre-purchase vehicle inspections</li>
        <li>Comprehensive digital inspection reports</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">Book an Inspection</h3>
        <p className="mb-6">Call us to schedule your vehicle inspection today.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const EngineDiagnosticsPage = () => (
  <>
    <Helmet><title>Engine Diagnostics & Repair | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Engine Diagnostics" subtitle="Advanced computer diagnostics to find and fix the root problem." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>Is your check engine light on? Our advanced diagnostic equipment connects directly to your vehicle's onboard computer to pinpoint the exact issue. From minor sensor replacements to major engine overhauls, we have the expertise to fix it.</p>
      <ul>
        <li>Check Engine Light (CEL) scanning and diagnostics</li>
        <li>Timing belt and chain replacement</li>
        <li>ECU and BCM programming</li>
        <li>Major engine repairs and tune-ups</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">Check Engine Light On?</h3>
        <p className="mb-6">Don't ignore it. Bring it in for a diagnostic scan.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const ACRepairPage = () => (
  <>
    <Helmet><title>AC Servicing & Repairs | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="AC Servicing & Repairs" subtitle="Stay cool in the summer and warm in the winter." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>A properly functioning heating and cooling system is vital for your comfort and safety. We offer comprehensive AC system checks, gas recharges, and leak detection services for all makes and models.</p>
      <ul>
        <li>AC compressor testing and replacement</li>
        <li>Freon / AC gas recharge services</li>
        <li>System leak detection and sealing</li>
        <li>Heater core and blower motor repairs</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">AC Blowing Warm Air?</h3>
        <p className="mb-6">Stop by for a quick AC inspection.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const TireServicesPage = () => (
  <>
    <Helmet><title>Tire Repairs & Installations | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Tire Services" subtitle="Sales, repairs, and professional installations." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>Your tires are the only thing connecting your car to the road. We offer everything from flat tire repairs to brand new tire sales. We carry all major industry brands for passenger cars, SUVs, and light trucks.</p>
      <ul>
        <li>Professional tire mounting and computer balancing</li>
        <li>Seasonal tire changeovers (on or off rims)</li>
        <li>Flat tire patching and repairs</li>
        <li>New tire sales at highly competitive prices</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">Need New Tires?</h3>
        <p className="mb-6">Call us for a quote on the best tires for your vehicle.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const BrakeServicePage = () => (
  <>
    <Helmet><title>Brake Service & Replacement | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Brake Services" subtitle="Reliable stopping power when you need it most." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>Never compromise on brakes. If you hear squeaking, grinding, or feel vibrations when braking, it's time for a service. We use premium ceramic or semi-metallic pads and high-quality rotors to ensure safe stopping power.</p>
      <ul>
        <li>Brake pad and rotor replacement</li>
        <li>Brake caliper repair and replacement</li>
        <li>Brake fluid flushes and bleeding</li>
        <li>ABS system diagnostics</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">Hearing Brake Noises?</h3>
        <p className="mb-6">Come in for a comprehensive brake inspection.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const BatteryRepairPage = () => (
  <>
    <Helmet><title>Battery & Alternator Repairs | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Battery & Alternator" subtitle="Keep your vehicle's electrical system fully charged." />
    <ContentWrapper>
      <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to All Services
      </Link>
      <p>Having trouble starting your car? The issue could be a dead battery, a failing alternator, or a broken starter motor. We test your entire charging system to find exactly what's wrong before replacing parts.</p>
      <ul>
        <li>Battery health testing and replacement</li>
        <li>Alternator testing and rebuilds</li>
        <li>Starter motor diagnostics</li>
        <li>Wiring and electrical system troubleshooting</li>
      </ul>
      <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
        <h3 className="mt-0">Car Won't Start?</h3>
        <p className="mb-6">Call us for fast and reliable electrical repairs.</p>
        <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
          Call +1 (289) 834-2838
        </a>
      </div>
    </ContentWrapper>
  </>
)

export const WhyUsPage = () => (
  <>
    <Helmet><title>Why Choose Us | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Why Choose Primetech" subtitle="The leading choice for auto repair and maintenance in Stoney Creek." />
    <WhyChooseSection />
  </>
)
