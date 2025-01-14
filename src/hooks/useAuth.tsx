import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthResponse {
  isLoading: boolean;
  user: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
}

export const useAuth = (): AuthResponse => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Initialize user state and subscribe to auth changes
  useState(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // Log auth state changes for debugging
      console.log('Auth state changed:', event, session?.user?.id);
    });

    return () => subscription.unsubscribe();
  });

  const validateCredentials = (email: string, password: string): boolean => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please provide both email and password",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address",
        variant: "destructive"
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (email: string, password: string) => {
    if (!validateCredentials(email, password)) {
      return;
    }

    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    console.log("Starting login attempt with email:", cleanEmail);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) {
        console.error("Login error:", error);
        
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Login Failed",
            description: "Email or password is incorrect. Please try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Error",
            description: "An unexpected error occurred. Please try again later.",
            variant: "destructive"
          });
        }
        return;
      }

      if (data.user) {
        console.log("Login successful, user:", data.user.id);
        setUser(data.user);
        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    if (!validateCredentials(email, password)) {
      return;
    }

    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    console.log("Attempting signup with email:", cleanEmail);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) {
        console.error("Signup error:", signUpError);
        
        if (signUpError.message?.includes("User already registered")) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please try logging in instead.",
            variant: "destructive"
          });
          return;
        }
        
        toast({
          title: "Signup Error",
          description: signUpError.message || "Failed to create account",
          variant: "destructive"
        });
        return;
      }

      if (data?.user) {
        console.log("User created successfully:", data.user.id);
        setUser(data.user);
        toast({
          title: "Success",
          description: "Account created successfully! You can now log in.",
        });
        
        // Since email verification is disabled, we can automatically log them in
        await handleLogin(cleanEmail, password);
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    user,
    handleLogin,
    handleSignUp,
  };
};