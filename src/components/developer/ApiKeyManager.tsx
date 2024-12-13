import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyForm } from "@/components/shared/ApiKeyForm";
import { ApiKeyList } from "@/components/shared/ApiKeyList";
import { useApiKeyMutations } from "@/utils/apiKeyManagerUtils";

export const ApiKeyManager = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { createApiKey, deleteApiKey } = useApiKeyMutations(queryClient, 'api_keys');

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createKeyMutation = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      return createApiKey(name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast({
        title: "API Key Generated",
        description: "Your new API key has been created successfully.",
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
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast({
        title: "API Key Deleted",
        description: "The API key has been deleted successfully.",
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
        <h3 className="text-lg font-semibold mb-4">Generate New API Key</h3>
        <ApiKeyForm 
          onSubmit={handleGenerateKey}
          isGenerating={isGenerating}
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        <ApiKeyList 
          apiKeys={apiKeys}
          isLoading={isLoading}
          onDelete={(keyId) => deleteKeyMutation.mutate(keyId)}
        />
      </Card>
    </div>
  );
};