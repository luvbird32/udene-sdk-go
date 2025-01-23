import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log('LoginForm: Attempting login with email:', email);
    
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('LoginForm: Login error:', error.message);
        // Set a user-friendly error message
        setError('The email or password you entered is incorrect. Please try again.');
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
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
      </div>

      {error && (
        <Alert variant="destructive" className="border-red-500 bg-red-50">
          <AlertDescription className="text-sm font-medium text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

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