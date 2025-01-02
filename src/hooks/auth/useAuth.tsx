import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "./useAuthState";
import { useAuthValidation } from "./useAuthValidation";
import { useProfileManagement } from "./useProfileManagement";
import type { AuthResponse } from "./types";

export const useAuth = (): AuthResponse => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, setIsLoading, user, setUser } = useAuthState();
  const { validateCredentials } = useAuthValidation();
  const { createUserProfile, getUserProfile } = useProfileManagement();

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

        const profile = await getUserProfile(data.user.id);

        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        });

        // Redirect based on role and current path
        const currentPath = window.location.pathname;
        if (currentPath.includes('client-auth')) {
          if (profile?.role === 'client') {
            navigate('/client-dashboard');
          } else {
            toast({
              title: "Access Denied",
              description: "You need client access to view this dashboard",
              variant: "destructive"
            });
            navigate('/login');
          }
        } else {
          if (profile?.role === 'admin') {
            navigate('/dashboard');
          } else {
            toast({
              title: "Access Denied",
              description: "You need admin access to view this dashboard",
              variant: "destructive"
            });
            navigate('/login');
          }
        }
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
      const { data: existingUser, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) {
        console.error("Signup error:", signUpError);
        
        if (signUpError.message?.includes("User already registered") || 
            signUpError.message?.includes("user_already_exists")) {
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

      if (existingUser?.user) {
        console.log("User created successfully:", existingUser.user.id);
        setUser(existingUser.user);
        toast({
          title: "Success",
          description: "Account created successfully! You can now log in.",
        });
        
        // Set the appropriate role based on the signup path
        const role = window.location.pathname.includes('client-auth') ? 'client' : 'user';
        
        const profileCreated = await createUserProfile(existingUser.user.id, role);
        if (!profileCreated) return;

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