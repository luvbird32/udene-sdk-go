import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useApiKeyMutations } from "@/utils/apiKeyManagerUtils";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyFormSection } from "./api-keys/ApiKeyFormSection";
import { ApiKeyListSection } from "./api-keys/ApiKeyListSection";
import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";

export const ClientApiKeyManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { currentProject } = useProject();
  const [isGenerating, setIsGenerating] = useState(false);
  const { createApiKey, deleteApiKey } = useApiKeyMutations(queryClient, 'client_api_keys');

  const { data: apiKeys, isLoading, error } = useQuery({
    queryKey: ['udene-api-keys', currentProject?.id],
    queryFn: async () => {
      let query = supabase
        .from('client_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (currentProject?.id) {
        query.eq('project_id', currentProject.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createKeyMutation = useMutation({
    mutationFn: async ({ name, description, keyType }: { name: string; description: string; keyType: 'testing' | 'production' }) => {
      return createApiKey(name, description, user?.id, currentProject?.id, keyType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['udene-api-keys', currentProject?.id] });
      toast({
        title: "Success",
        description: "New API key has been generated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to generate API key: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const deleteKeyMutation = useMutation({
    mutationFn: deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['udene-api-keys', currentProject?.id] });
      toast({
        title: "Success",
        description: "API key has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete API key: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleGenerateKey = async (name: string, description: string, keyType: 'testing' | 'production') => {
    setIsGenerating(true);
    try {
      await createKeyMutation.mutateAsync({ name, description, keyType });
    } finally {
      setIsGenerating(false);
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>Error loading API keys. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApiKeyFormSection 
        onGenerateKey={handleGenerateKey}
        isGenerating={isGenerating}
      />
      <ApiKeyListSection 
        apiKeys={apiKeys}
        isLoading={isLoading}
        onDelete={(keyId) => deleteKeyMutation.mutate(keyId)}
      />
    </div>
  );
};