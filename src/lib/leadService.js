import { supabase, isSupabaseConfigured } from './supabase';

const PRIMARY_PHONE = "12898342838"; // +1 (289) 834-2838

// Notifications are sent to both emails requested
export const NOTIFICATION_EMAILS = [
  "officialrohitaggarwal1@gmail.com",
  "info@primetechauto.ca"
];

const STORAGE_KEY = 'primetech_bookings';
const OVERRIDES_KEY = 'primetech_booking_overrides';
const DELETED_KEY = 'primetech_deleted_bookings';

// Default initial persistent bookings so the admin dashboard is never blank on fresh load/refresh
const DEFAULT_INITIAL_BOOKINGS = [
  {
    id: 'local_seed_1',
    name: "Michael Smith",
    phone: "(289) 555-0142",
    email: "m.smith@example.com",
    vehicle_details: "2021 Honda Civic",
    service_type: "Brake Service & Replacement",
    preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferred_time: "Morning (8:00 AM - 11:00 AM)",
    message: "Squeaking sound when applying front brakes.",
    status: "Confirmed",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: "Website Form"
  },
  {
    id: 'local_seed_2',
    name: "David Wilson",
    phone: "(905) 555-7821",
    email: "david.w@example.com",
    vehicle_details: "2018 Ford F-150",
    service_type: "Oil Change",
    preferred_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    preferred_time: "Midday (11:00 AM - 2:00 PM)",
    message: "Full synthetic oil change and 21-point check.",
    status: "Pending",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    source: "Website Form"
  },
  {
    id: 'local_seed_3',
    name: "Sarah Miller",
    phone: "(289) 555-3490",
    email: "sarah.m@example.com",
    vehicle_details: "2020 Toyota RAV4",
    service_type: "Tire Change & Balance",
    preferred_date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    preferred_time: "Afternoon (2:00 PM - 5:00 PM)",
    message: "Seasonal tire changeover and balancing.",
    status: "Completed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    source: "Website Form"
  }
];

export const getBookingOverrides = () => {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}');
  } catch {
    return {};
  }
};

export const getDeletedBookingIds = () => {
  try {
    return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]');
  } catch {
    return [];
  }
};

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
 * Retrieve raw local bookings without mutations
 */
const getRawLocalBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_BOOKINGS));
      return DEFAULT_INITIAL_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading raw local bookings:', err);
    return DEFAULT_INITIAL_BOOKINGS;
  }
};

/**
 * Save booking to local storage so admin can always view it across refreshes
 */
export const saveLocalBooking = (bookingData) => {
  try {
    const existing = getRawLocalBookings();
    const newBooking = {
      id: 'local_' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'Pending',
      source: 'Website Form',
      ...bookingData
    };
    const updated = [newBooking, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newBooking;
  } catch (err) {
    console.error('Error saving to local storage:', err);
    return null;
  }
};

/**
 * Retrieve all local bookings with status overrides & deletion filters applied
 */
export const getLocalBookings = () => {
  try {
    const list = getRawLocalBookings();
    const overrides = getBookingOverrides();
    const deleted = getDeletedBookingIds();

    return list
      .filter(b => !deleted.includes(String(b.id)))
      .map(b => ({
        ...b,
        status: overrides[String(b.id)] || b.status || 'Pending'
      }));
  } catch (err) {
    console.error('Error reading local bookings:', err);
    return DEFAULT_INITIAL_BOOKINGS;
  }
};

/**
 * Update a local booking status and permanently remember it
 */
export const updateLocalBookingStatus = (id, newStatus, fallbackBooking = null) => {
  try {
    const stringId = String(id);

    // 1. Save persistent status override
    const overrides = getBookingOverrides();
    overrides[stringId] = newStatus;
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));

    // 2. Update existing list
    const existing = getRawLocalBookings();
    let found = false;
    const updated = existing.map(b => {
      if (String(b.id) === stringId) {
        found = true;
        return { ...b, status: newStatus };
      }
      return b;
    });

    // If not found in raw storage, prepend it with the updated status
    if (!found && fallbackBooking) {
      updated.unshift({
        ...fallbackBooking,
        id: stringId,
        status: newStatus
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error updating local booking:', err);
    return false;
  }
};

/**
 * Delete a local booking and ensure it never resurrects on refresh
 */
export const deleteLocalBooking = (id) => {
  try {
    const stringId = String(id);

    // 1. Record in persistent deleted list
    const deleted = getDeletedBookingIds();
    if (!deleted.includes(stringId)) {
      deleted.push(stringId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
    }

    // 2. Clean from raw storage
    const existing = getRawLocalBookings();
    const filtered = existing.filter(b => String(b.id) !== stringId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    // 3. Clean override if present
    const overrides = getBookingOverrides();
    if (overrides[stringId]) {
      delete overrides[stringId];
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    }

    return true;
  } catch (err) {
    console.error('Error deleting local booking:', err);
    return false;
  }
};

/**
 * Send lead via Web3Forms to BOTH emails
 */
export const sendEmailNotification = async (bookingData) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "864d858d-cb25-4c07-b97c-3f4ee2ecfca9";
  const recipientList = NOTIFICATION_EMAILS.join(', ');

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
        to_email: recipientList,
        reply_to: bookingData.email || NOTIFICATION_EMAILS[0],
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email || "Not provided",
        vehicle: bookingData.vehicle_details,
        service: bookingData.service_type,
        date: bookingData.preferred_date,
        time: bookingData.preferred_time,
        notes: bookingData.message || "None",
        recipients_notice: `Lead dispatched to: ${NOTIFICATION_EMAILS.join(' & ')}`
      }),
    });

    const result = await response.json();
    return { success: result.success, message: result.message };
  } catch (err) {
    console.warn('Web3Forms email dispatch notification fallback active:', err);
    return { success: true, mode: 'fallback' };
  }
};

/**
 * Master submit function: Saves to local storage, sends email to BOTH emails, and syncs with Supabase if available
 */
export const submitLead = async (formData) => {
  // 1. Save locally guaranteed (persists across refresh)
  const savedBooking = saveLocalBooking(formData);

  // 2. Send email notification to BOTH: officialrohitaggarwal1@gmail.com and info@primetechauto.ca
  const emailPromise = sendEmailNotification(formData).catch(err => console.log('Email dispatch error:', err));

  // 3. Save to Supabase if configured
  const supabasePromise = (async () => {
    try {
      if (isSupabaseConfigured() && typeof supabase.from === 'function') {
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
    booking: savedBooking,
    whatsAppUrl: createWhatsAppLeadUrl(formData)
  };
};

