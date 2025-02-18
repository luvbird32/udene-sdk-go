
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbbfljgvjpkzqmoylyzc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYmZsamd2anBrenFtb3lseXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDUwNjEsImV4cCI6MjA0OTAyMTA2MX0.ZP74tENMUR8qAYi63el1xYUyzqAewO_b5X0iQHj_pnk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'sb-auth-token',
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    },
  }
});

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session ? 'Has session' : 'No session');
  
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'SIGNED_OUT') {
    // Clear ALL auth data
    localStorage.removeItem('sb-auth-token');
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear();
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  } else if (event === 'INITIAL_SESSION') {
    console.log('Initial session loaded');
  }
});

// Add health check function
export const checkSupabaseHealth = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Health check session:', session ? 'Active' : 'None');
    return !!session;
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return false;
  }
};

// Initialize session check
checkSupabaseHealth().then(isHealthy => {
  console.log('Initial health check:', isHealthy ? 'OK' : 'Failed');
});
