import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Attempting signup with email:", email);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("Signup response:", { data, error });

      if (error) {
        let errorMessage = "Signup failed. ";
        
        if (error.message.includes("already registered")) {
          errorMessage += "This email is already registered.";
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
          description: "You have been successfully registered and logged in.",
        });
        navigate('/dashboard');
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

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-muted-foreground">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-muted-foreground">
          Password
        </label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Choose a password"
          className="mt-1"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};