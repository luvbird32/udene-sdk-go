import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LoginErrorAlert } from './components/LoginErrorAlert';
import { LoginFormFields } from './components/LoginFormFields';

/**
 * Main login form component that handles user authentication
 * Manages form state and authentication logic
 */
export const LoginForm = () => {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Validates form inputs before submission
   */
  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  /**
   * Handles the login form submission
   * Attempts to authenticate the user with Supabase
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form inputs
    if (!validateForm()) {
      return;
    }

    console.log('LoginForm: Attempting login with email:', email);
    
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (supabaseError) {
        console.error('LoginForm: Login error:', supabaseError);
        
        // Handle specific error cases
        if (supabaseError.message.includes('Invalid login credentials')) {
          setError('The email or password you entered is incorrect. Please try again.');
        } else if (supabaseError.message.includes('Email not confirmed')) {
          setError('Please verify your email address before logging in.');
        } else {
          setError(supabaseError.message);
        }
        return;
      }

      console.log('LoginForm: Login successful, user:', data.user?.id);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('LoginForm: Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-sm">
      {/* Header section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
      </div>

      {/* Error alert */}
      <LoginErrorAlert error={error} />

      {/* Login form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <LoginFormFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {/* Sign up link */}
      <div className="text-center text-sm">
        <p className="text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};