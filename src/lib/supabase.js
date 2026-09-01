import { createClient } from '@supabase/supabase-js'

const SUPABASE_PROJECT_URL = 'https://btfwztodwawihweorpwp.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_NpdYoLNpEzsitnAuX6gt0Q_XH8qO1R4'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_PROJECT_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    !supabaseUrl.includes('YOUR_PROJECT_ID') &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes('YOUR_ANON_KEY')
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

