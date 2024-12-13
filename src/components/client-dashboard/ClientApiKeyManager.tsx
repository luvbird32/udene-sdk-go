import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ApiKeyForm } from "@/components/shared/ApiKeyForm";
import { ApiKeyList } from "@/components/shared/ApiKeyList";
import { useApiKeyMutations } from "@/utils/apiKeyManagerUtils";
import { supabase } from "@/integrations/supabase/client";

export const ClientApiKeyManager = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { createApiKey, deleteApiKey } = useApiKeyMutations(queryClient, 'client_api_keys');

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['udene-api-keys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createKeyMutation = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      return createApiKey(name, description, user?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['udene-api-keys'] });
      toast({
        title: "API Key Generated",
        description: "Your new Udene API key has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate API key: " + error.message,
        variant: "destructive",
      });
    }
  });

  const deleteKeyMutation = useMutation({
    mutationFn: deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['udene-api-keys'] });
      toast({
        title: "API Key Deleted",
        description: "The Udene API key has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete API key: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleGenerateKey = async (name: string, description: string) => {
    setIsGenerating(true);
    try {
      await createKeyMutation.mutateAsync({ name, description });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New Udene API Key</h3>
        <ApiKeyForm 
          onSubmit={handleGenerateKey}
          isGenerating={isGenerating}
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Udene API Keys</h3>
        <ApiKeyList 
          apiKeys={apiKeys}
          isLoading={isLoading}
          onDelete={(keyId) => deleteKeyMutation.mutate(keyId)}
        />
      </Card>
    </div>
  );
};