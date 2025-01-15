import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading: isLoading } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Signup error:', error.message);
      return;
    }

    if (session) {
      console.log('Signup successful');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-green-400/80">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
          placeholder="Enter your email"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-green-400/80">
          Password
        </label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Choose a password"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full glass-button text-green-400 hover:text-green-300" 
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};