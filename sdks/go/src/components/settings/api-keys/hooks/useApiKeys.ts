import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

export const useApiKeys = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserSession = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchApiKeys = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error fetching API keys",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []);

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

  return {
    apiKeys,
    isLoading,
    user,
    fetchApiKeys
  };
};