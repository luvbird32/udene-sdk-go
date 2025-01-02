import { User } from "@supabase/supabase-js";

export interface AuthResponse {
  isLoading: boolean;
  user: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
}

export interface UserProfile {
  id: string;
  created_at?: string;
  updated_at?: string;
}