import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { generateSecureApiKey } from "@/utils/apiKeyUtils";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyList } from "./ApiKeyList";

export const ClientApiKeyManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  // Fetch existing API keys
  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['client-api-keys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Create new API key
  const createApiKey = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      if (!name.trim()) {
        throw new Error("Project name is required");
      }

      const newApiKey = generateSecureApiKey(32);
      const { data, error } = await supabase
        .from('client_api_keys')
        .insert([
          {
            user_id: user?.id,
            key_value: newApiKey,
            name: name.trim(),
            description: description.trim() || null,
            status: 'active'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-api-keys'] });
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

  // Delete API key
  const deleteApiKey = useMutation({
    mutationFn: async (keyId: string) => {
      const { error } = await supabase
        .from('client_api_keys')
        .delete()
        .eq('id', keyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-api-keys'] });
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

  const handleCreateKey = async (name: string, description: string) => {
    await createApiKey.mutateAsync({ name, description });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New API Key</h3>
        <ApiKeyForm onSubmit={handleCreateKey} />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        <ApiKeyList 
          apiKeys={apiKeys} 
          isLoading={isLoading}
          onDelete={(keyId) => deleteApiKey.mutate(keyId)}
        />
      </Card>
    </div>
  );
};