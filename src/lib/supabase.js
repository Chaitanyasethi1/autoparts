import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace these with your actual Supabase URL and anon key.
// These are currently set up to pull from environment variables on Vercel.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
