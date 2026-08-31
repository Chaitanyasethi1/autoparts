import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Car, Phone, Mail, User, CheckCircle2, AlertCircle, MessageSquare, PhoneCall } from 'lucide-react'
import { toast } from 'sonner'
import { submitLead } from '../lib/leadService'

const SERVICE_TYPES = [
  "Oil Change",
  "Brake Repair",
  "Tire Change & Balance",
  "Engine Diagnostics",
  "Battery / Alternator",
  "Vehicle Safety Inspection",
  "Other / Not Sure"
]

const TIME_SLOTS = [
  "Morning (8:00 AM - 11:00 AM)",
  "Midday (11:00 AM - 2:00 PM)",
  "Afternoon (2:00 PM - 5:00 PM)",
  "Late (5:00 PM - 7:00 PM)"
]

export const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [whatsAppUrl, setWhatsAppUrl] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle_details: '',
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Basic validation
      if (!formData.name.trim() || !formData.phone.trim() || !formData.vehicle_details.trim() || !formData.service_type || !formData.preferred_date || !formData.preferred_time) {
        toast.error("Please fill in all required fields.")
        setIsSubmitting(false)
        return
      }

      // Regex validation
      const phoneRegex = /^[0-9\-\+\s\(\)]{10,20}$/
      if (!phoneRegex.test(formData.phone)) {
        toast.error("Please enter a valid phone number.")
        setIsSubmitting(false)
        return
      }

      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          toast.error("Please enter a valid email address.")
          setIsSubmitting(false)
          return
        }
      }

      // Process lead submission (local backup + email + supabase)
      const result = await submitLead(formData)
      
      setWhatsAppUrl(result.whatsAppUrl)
      setSubmitted(true)
      toast.success("Appointment request received! We will contact you shortly.")
      
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error("An error occurred. Please call us directly at +1 (289) 834-2838.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="book" className="py-20 bg-card border-y border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-display text-secondary uppercase tracking-[0.3em] text-sm mb-3">Schedule Now</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Book an <span className="text-gradient">Appointment</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Fill out the form below to request a service appointment. We'll get back to you quickly to confirm your time.
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-xl border border-border p-8 md:p-12 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display text-3xl font-bold mb-3 text-foreground">Appointment Request Received!</h3>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mx-auto mb-8">
              Thank you, <strong className="text-foreground">{formData.name}</strong>. Our team at Primetech Auto has received your request for <strong className="text-foreground">{formData.service_type}</strong> and will contact you at <strong className="text-foreground">{formData.phone}</strong> to confirm your slot.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {whatsAppUrl && (
                <a 
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold rounded-lg transition-all shadow-lg shadow-emerald-950/40"
                >
                  <MessageSquare className="w-5 h-5" />
                  Instant WhatsApp Confirmation
                </a>
              )}
              <a 
                href="tel:+12898342838"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-display font-bold rounded-lg border border-white/10 transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-primary" />
                Call Shop Now
              </a>
            </div>

            <button 
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '', phone: '', email: '', vehicle_details: '', 
                  service_type: '', preferred_date: '', preferred_time: '', message: ''
                })
              }}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Submit Another Appointment Request
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl border border-border overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Full Name *
                  </label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" /> Phone Number *
                  </label>
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body"
                    placeholder="(289) 834-2838"
                  />
                </div>
              </div>

              {/* Email & Vehicle */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email Address (Optional)
                  </label>
                  <input 
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" /> Vehicle Details *
                  </label>
                  <input 
                    type="text" name="vehicle_details" required
                    value={formData.vehicle_details} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body"
                    placeholder="e.g. 2019 Honda Civic / Ford F-150"
                  />
                </div>
              </div>

              {/* Service & Date/Time */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground font-display">Service Required *</label>
                <select 
                  name="service_type" required
                  value={formData.service_type} onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service...</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Preferred Date *
                  </label>
                  <input 
                    type="date" name="preferred_date" required
                    value={formData.preferred_date} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Preferred Time *
                  </label>
                  <select 
                    name="preferred_time" required
                    value={formData.preferred_time} onChange={handleChange}
                    className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select time slot...</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground font-display">Additional Details / Symptoms (Optional)</label>
                <textarea 
                  name="message" rows="3"
                  value={formData.message} onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg p-3.5 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body resize-none"
                  placeholder="Describe any warning lights, noises, or special requests..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-4 rounded-lg transition-all disabled:opacity-50 text-base md:text-lg uppercase tracking-wider glow-red shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting Request...</span>
                  ) : (
                    <>Submit Appointment Request <CheckCircle2 className="w-5 h-5" /></>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4 font-body flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-secondary" /> Need urgent assistance? Call us directly at <a href="tel:+12898342838" className="text-primary font-bold hover:underline">+1 (289) 834-2838</a>
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  )
}
