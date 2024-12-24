import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyList } from './ApiKeyList';
import { ApiKeyForm } from './ApiKeyForm';
import { generateSecureApiKey } from '@/utils/apiKeyUtils';

export const ApiKeySettings = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch current user session
  const fetchUserSession = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  // Simple function to fetch API keys
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

  const generateApiKey = async (keyName: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate API keys",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const keyValue = `frd_${generateSecureApiKey(40)}`; // 40 chars + prefix
      
      const { error } = await supabase
        .from('api_keys')
        .insert({
          key_value: keyValue,
          name: keyName,
          status: 'active'
        });

      if (error) throw error;

      await fetchApiKeys();
      toast({
        title: "Success",
        description: "New API key generated"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate API key",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const revokeApiKey = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to revoke API keys",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('api_keys')
        .update({ status: 'revoked' })
        .eq('id', id);

      if (error) throw error;

      await fetchApiKeys();
      toast({
        title: "Success",
        description: "API key revoked"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to revoke API key",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <p className="text-muted-foreground mb-4">
          Please log in to manage your API keys
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApiKeyForm 
        onGenerateKey={generateApiKey}
        isLoading={isLoading}
      />
      <ApiKeyList 
        apiKeys={apiKeys}
        isLoading={isLoading}
        onRevokeKey={revokeApiKey}
      />
    </div>
  );
};