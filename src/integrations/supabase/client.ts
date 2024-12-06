import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

// Enhanced logging for debugging
console.log("Initializing Supabase client...");
console.log("Supabase URL:", supabaseUrl);
console.log("API Key Length:", supabaseKey.length);
console.log("API Key Prefix:", supabaseKey.substring(0, 10));

// Create and export the Supabase client with enhanced error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'microwatchdog-analytics/1.0.0'
    }
  }
});

// Comprehensive connection and permission testing
const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");
    
    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error("Authentication Error:", authError);
      return false;
    }
    
    // Test metrics table access
    const { data: metricsData, error: metricsError } = await supabase
      .from('metrics')
      .select('*')
      .limit(1);
    
    if (metricsError) {
      console.error("Metrics Table Access Error:", metricsError);
      return false;
    }
    
    console.log("Supabase connection successful!");
    return true;
  } catch (error) {
    console.error("Comprehensive Connection Test Failed:", error);
    return false;
  }
};

// Run connection test on initialization
testSupabaseConnection();