import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthResponse {
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
}

export const useAuth = (): AuthResponse => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please provide both email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log("Starting login attempt with email:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("Login response:", { data, error });

      if (error) {
        let errorMessage = "Invalid email or password";
        
        if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please verify your email address before logging in";
        } else if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please try again";
        }

        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data?.session) {
        console.log("Login successful, redirecting to dashboard");
        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please provide both email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log("Attempting signup with email:", email);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
        }
      });

      console.log("Signup response:", { data, error });

      if (error) {
        let errorMessage = "Signup failed. ";
        if (error.message.includes("already registered")) {
          errorMessage = "This email is already registered. Please try logging in instead.";
        } else {
          errorMessage += error.message;
        }

        toast({
          title: "Signup Failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Signup Successful",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
    handleSignUp,
  };
};