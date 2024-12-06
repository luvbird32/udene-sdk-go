import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);