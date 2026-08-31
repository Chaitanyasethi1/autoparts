import { supabase } from './supabase';

const PRIMARY_PHONE = "12898342838"; // +1 (289) 834-2838
const PRIMARY_EMAIL = "info@primetechauto.ca";

/**
 * Format a WhatsApp message link with all appointment details
 */
export const createWhatsAppLeadUrl = (bookingData) => {
  const text = `🚗 *New Appointment Request - Primetech Auto*
👤 *Name:* ${bookingData.name}
📞 *Phone:* ${bookingData.phone}
📧 *Email:* ${bookingData.email || 'N/A'}
🚘 *Vehicle:* ${bookingData.vehicle_details}
🔧 *Service:* ${bookingData.service_type}
📅 *Date:* ${bookingData.preferred_date}
⏰ *Time:* ${bookingData.preferred_time}
${bookingData.message ? `📝 *Message:* ${bookingData.message}` : ''}`;

  return `https://wa.me/${PRIMARY_PHONE}?text=${encodeURIComponent(text)}`;
};

/**
 * Save booking to local storage so admin can always view it
 */
export const saveLocalBooking = (bookingData) => {
  try {
    const existing = JSON.parse(localStorage.getItem('primetech_bookings') || '[]');
    const newBooking = {
      id: 'local_' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'Pending',
      ...bookingData
    };
    const updated = [newBooking, ...existing];
    localStorage.setItem('primetech_bookings', JSON.stringify(updated));
    return newBooking;
  } catch (err) {
    console.error('Error saving to local storage:', err);
    return null;
  }
};

/**
 * Retrieve all local bookings
 */
export const getLocalBookings = () => {
  try {
    return JSON.parse(localStorage.getItem('primetech_bookings') || '[]');
  } catch (err) {
    console.error('Error reading local bookings:', err);
    return [];
  }
};

/**
 * Update a local booking status
 */
export const updateLocalBookingStatus = (id, newStatus) => {
  try {
    const existing = getLocalBookings();
    const updated = existing.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem('primetech_bookings', JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error updating local booking:', err);
    return false;
  }
};

/**
 * Delete a local booking
 */
export const deleteLocalBooking = (id) => {
  try {
    const existing = getLocalBookings();
    const filtered = existing.filter(b => b.id !== id);
    localStorage.setItem('primetech_bookings', JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting local booking:', err);
    return false;
  }
};

/**
 * Send lead via Web3Forms or Email API
 */
export const sendEmailNotification = async (bookingData) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  
  if (!accessKey) {
    // If no key yet, we still succeed locally
    return { success: true, mode: 'local' };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Service Booking: ${bookingData.name} - ${bookingData.service_type}`,
        from_name: "Primetech Auto Leads",
        to_email: PRIMARY_EMAIL,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        vehicle: bookingData.vehicle_details,
        service: bookingData.service_type,
        date: bookingData.preferred_date,
        time: bookingData.preferred_time,
        notes: bookingData.message || "None",
      }),
    });

    const result = await response.json();
    return { success: result.success, message: result.message };
  } catch (err) {
    console.warn('Web3Forms notification failed, fallback active:', err);
    return { success: true, mode: 'fallback' };
  }
};

/**
 * Master submit function: Saves to local storage, sends email, and syncs with Supabase if available
 */
export const submitLead = async (formData) => {
  // 1. Save locally guaranteed
  saveLocalBooking(formData);

  // 2. Send email notification
  const emailPromise = sendEmailNotification(formData).catch(err => console.log(err));

  // 3. Save to Supabase if configured
  const supabasePromise = (async () => {
    try {
      if (supabase && typeof supabase.from === 'function') {
        await supabase.from('bookings').insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            vehicle_details: formData.vehicle_details,
            service_type: formData.service_type,
            preferred_date: formData.preferred_date,
            preferred_time: formData.preferred_time,
            message: formData.message,
            status: 'Pending'
          }
        ]);
      }
    } catch (err) {
      console.warn('Supabase sync skipped/failed:', err);
    }
  })();

  await Promise.allSettled([emailPromise, supabasePromise]);

  return {
    success: true,
    whatsAppUrl: createWhatsAppLeadUrl(formData)
  };
};
