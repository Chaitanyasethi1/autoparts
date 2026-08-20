import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Wrench, Settings, ArrowLeft } from 'lucide-react'

// Generic Page Header Component
const PageHeader = ({ title, subtitle }) => (
  <div className="bg-zinc-950 py-20 border-b border-white/5">
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
    <PageHeader title="Customer Reviews" subtitle="See what our customers have to say about our service." />
    <ContentWrapper>
      <p>Our customers love us! We maintain a 5-star rating across all platforms because we treat every vehicle like our own.</p>
      {/* Real reviews can be fetched or hardcoded here later */}
      <div className="p-8 bg-zinc-900 rounded-xl border border-white/5 mt-8 text-center italic">
        "Best mechanic in Stoney Creek. Honest, fast, and didn't overcharge me."
      </div>
    </ContentWrapper>
  </>
)

export const ContactPage = () => (
  <>
    <Helmet><title>Contact Us | Primetech Auto & Tires</title></Helmet>
    <PageHeader title="Contact Us" subtitle="Get in touch for an appointment or quote." />
    <ContentWrapper>
      <h2>Visit Our Shop</h2>
      <p><strong>Address:</strong> 336 Hilton Drive, Stoney Creek, ON L8E 2N3</p>
      <p><strong>Phone:</strong> +1 (289) 834-2838</p>
      <p><strong>Email:</strong> info@primetechauto.ca</p>
      <h2>Hours of Operation</h2>
      <ul>
        <li>Monday to Friday: 9:00 AM - 6:00 PM</li>
        <li>Saturday: 9:00 AM - 3:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </ContentWrapper>
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

// Dynamic Service Detail Page
export const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  
  // Format the ID to a readable title (e.g., 'brake-service' -> 'Brake Service')
  const title = serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <Helmet><title>{title} | Primetech Auto & Tires</title></Helmet>
      <PageHeader title={title} subtitle="Expert automotive service you can trust." />
      <ContentWrapper>
        <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 no-underline font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Settings className="w-8 h-8" />
          </div>
          <h2 className="m-0 border-none">{title} Details</h2>
        </div>
        <p>
          At Primetech Auto & Tires, we specialize in high-quality {title.toLowerCase()}. 
          Our licensed mechanics use the latest diagnostic equipment to ensure your vehicle is running at peak performance.
        </p>
        <ul>
          <li>Certified, licensed mechanics</li>
          <li>Transparent pricing and clear estimates</li>
          <li>Fast turnaround times</li>
          <li>Quality OEM or equivalent parts</li>
        </ul>
        <div className="mt-12 p-8 bg-zinc-900 border border-white/5 rounded-2xl text-center">
          <h3 className="mt-0">Need this service?</h3>
          <p className="mb-6">Walk-ins are welcome, or call us today to secure a spot.</p>
          <a href="tel:+12898342838" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors no-underline">
            Call +1 (289) 834-2838
          </a>
        </div>
      </ContentWrapper>
    </>
  )
}
