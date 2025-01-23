import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jbbfljgvjpkzqmoylyzc.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
      'X-Client-Library': 'supabase-js',
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})