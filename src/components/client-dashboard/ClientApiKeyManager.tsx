import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Copy, Check, Trash } from "lucide-react";
import { generateSecureApiKey } from "@/utils/apiKeyUtils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface ClientApiKey {
  id: string;
  key_value: string;
  name: string;
  description?: string;
  created_at: string;
  status: 'active' | 'revoked';
}

export const ClientApiKeyManager = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
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
      return data as ClientApiKey[];
    }
  });

  // Create new API key
  const createApiKey = useMutation({
    mutationFn: async () => {
      if (!projectName.trim()) {
        throw new Error("Project name is required");
      }

      const newApiKey = generateSecureApiKey(32);
      const { data, error } = await supabase
        .from('client_api_keys')
        .insert([
          {
            user_id: user?.id,
            key_value: newApiKey,
            name: projectName.trim(),
            description: projectDescription.trim() || null,
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
      setProjectName("");
      setProjectDescription("");
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

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      await createApiKey.mutateAsync();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New API Key</h3>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Project Description (optional)"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleGenerateKey} 
            disabled={!projectName.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate API Key'
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys?.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{key.name}</p>
                  {key.description && (
                    <p className="text-sm text-muted-foreground">{key.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(key.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopyKey(key.key_value, key.id)}
                  >
                    {copiedKeyId === key.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteApiKey.mutate(key.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {(!apiKeys || apiKeys.length === 0) && (
              <p className="text-center text-muted-foreground">
                No API keys generated yet.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};