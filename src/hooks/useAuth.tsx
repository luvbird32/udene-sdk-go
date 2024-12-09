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
    const cleanEmail = email.trim().toLowerCase();
    console.log("Starting login attempt with email:", cleanEmail);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Login Failed",
            description: "Please verify your email address before logging in",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again",
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: "Success",
        description: "Login successful! Redirecting...",
      });
      navigate('/dashboard');
    } catch (err) {
      console.error("Unexpected login error:", err);
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
    const cleanEmail = email.trim().toLowerCase();
    console.log("Attempting signup with email:", cleanEmail);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            email: cleanEmail,
          }
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
        // Create a profile entry immediately after signup
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id,
            email: cleanEmail
          }]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }

        toast({
          title: "Signup Successful",
          description: "Please check your email to verify your account before logging in.",
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