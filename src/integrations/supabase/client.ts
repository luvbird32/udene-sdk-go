import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

// Add console log to help debug connection issues
console.log("Initializing Supabase client with URL:", supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Test the connection and log the result
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Supabase connection error:", error);
  } else {
    console.log("Supabase connection successful");
  }
});