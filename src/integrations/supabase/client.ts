import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic logging for initialization
console.log("Initializing Supabase client...");

// Create and export the Supabase client with simplified configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Simple connection test that won't cause stream reading issues
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      console.error("Connection test failed:", error.message);
      return false;
    }
    
    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Connection test error:", error);
    return false;
  }
};

// Run a single connection test
testConnection();