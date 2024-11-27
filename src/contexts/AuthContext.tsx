import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { api } from '@/services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In production, this would make a real API call
      const response = await api.post('/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        login, 
        logout,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};