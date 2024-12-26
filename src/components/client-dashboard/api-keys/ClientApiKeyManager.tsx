import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyList } from "./ApiKeyList";
import { useApiKeyMutations } from "@/utils/apiKeyManagerUtils";
import { supabase } from "@/integrations/supabase/client";

export const ClientApiKeyManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { createApiKey, deleteApiKey } = useApiKeyMutations(queryClient, 'client_api_keys');

  const { data: apiKeys, isLoading, error } = useQuery({
    queryKey: ['client-api-keys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createKeyMutation = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      return createApiKey(name, description, user?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-api-keys'] });
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
      queryClient.invalidateQueries({ queryKey: ['client-api-keys'] });
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

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>Error loading API keys. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New API Key</h3>
        <ApiKeyForm 
          onSubmit={async (name, description) => {
            await createKeyMutation.mutateAsync({ name, description });
          }}
          isGenerating={createKeyMutation.isPending}
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