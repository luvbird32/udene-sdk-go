import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateSecureApiKey } from '@/utils/apiKeyUtils';

export const useApiKeyActions = (fetchApiKeys: () => Promise<void>) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generateApiKey = async (keyName: string) => {
    try {
      setIsLoading(true);
      const keyValue = `frd_${generateSecureApiKey(40)}`;
      
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

  return {
    isLoading,
    generateApiKey,
    revokeApiKey
  };
};