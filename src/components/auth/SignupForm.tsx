import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading: isLoading } = useAuth();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data: { session }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name.trim()
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("This email is already registered. Please try logging in instead.");
        } else {
          setError(signUpError.message);
        }
        return;
      }

      if (session) {
        toast({
          title: "Success!",
          description: "Your account has been created successfully.",
        });
      } else {
        toast({
          title: "Verification Required",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-green-400/80">
          Name
        </label>
        <Input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="name"
        />
      </div>

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
          autoComplete="email"
        />
      </div>

      <div className="relative">
        <label htmlFor="signup-password" className="block text-sm font-medium text-green-400/80">
          Password
        </label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Choose a password"
            className="mt-1 glass-input text-green-400 placeholder:text-green-500/50 pr-10"
            disabled={isLoading}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[60%] transform -translate-y-1/2 text-green-400/80 hover:text-green-400"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-green-400/80">
          Confirm Password
        </label>
        <Input
          id="signup-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="new-password"
        />
      </div>

      <div className="text-xs text-green-400/70 space-y-1">
        <p>Password must contain:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>At least 8 characters</li>
          <li>One uppercase letter</li>
          <li>One lowercase letter</li>
          <li>One number</li>
          <li>One special character (!@#$%^&*)</li>
        </ul>
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