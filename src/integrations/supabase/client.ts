import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Health check function
export const checkSupabaseHealth = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Supabase connection healthy')
    return true
  } catch (error) {
    console.error('Supabase health check failed:', error)
    return false
  }
}