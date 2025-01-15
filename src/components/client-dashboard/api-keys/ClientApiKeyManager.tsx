import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyList } from "./ApiKeyList";
import { useApiKeyMutations } from "@/utils/apiKeyManagerUtils";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClientApiKeyManager = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { createApiKey, deleteApiKey } = useApiKeyMutations(queryClient, 'client_api_keys');

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['client-api-keys', selectedProject],
    queryFn: async () => {
      const query = supabase
        .from('client_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedProject) {
        query.eq('project_id', selectedProject);
      } else {
        query.is('project_id', null);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createKeyMutation = useMutation({
    mutationFn: async ({ name, description, keyType }: { name: string; description: string; keyType: 'testing' | 'production' }) => {
      return createApiKey(name, description, user?.id, keyType, selectedProject);
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

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">
          Select Project (optional)
        </label>
        <Select
          value={selectedProject || ""}
          onValueChange={(value) => setSelectedProject(value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Project (Global Keys)</SelectItem>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New API Key</h3>
        <ApiKeyForm 
          onSubmit={async (name, description, keyType) => {
            await createKeyMutation.mutateAsync({ name, description, keyType });
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