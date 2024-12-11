import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, handleLogin } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-green-400/80">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-green-400/80">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full glass-button text-green-400 hover:text-green-300" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Sign In"}
      </Button>
    </form>
  );
};