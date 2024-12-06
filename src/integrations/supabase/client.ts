import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

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