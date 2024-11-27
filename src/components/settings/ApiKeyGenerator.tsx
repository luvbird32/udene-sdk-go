import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiKey, deleteApiKey, getApiKeys } from "@/services/api";

interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  name: string;
}

export const ApiKeyGenerator = () => {
  const [newKeyName, setNewKeyName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: apiKeys = [], isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: getApiKeys,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error Loading API Keys",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  });

  const createKeyMutation = useMutation({
    mutationFn: createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      setNewKeyName("");
      toast({
        title: "API Key Generated",
        description: "Your new API key has been generated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Generating API Key",
        description: error.message,
        variant: "destructive",
      });
    },
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
    onError: (error: Error) => {
      toast({
        title: "Error Deleting API Key",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your API key",
        variant: "destructive",
      });
      return;
    }
    createKeyMutation.mutate({ name: newKeyName });
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
  };

  const handleDeleteKey = (id: string) => {
    deleteKeyMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading API keys...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">API Key Management</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="API Key Name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
            <Button 
              onClick={generateApiKey}
              disabled={createKeyMutation.isPending}
            >
              Generate New API Key
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Your API Keys</h4>
          {apiKeys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No API keys generated yet.</p>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((apiKey: ApiKey) => (
                <div key={apiKey.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{apiKey.name}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey.key)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteKey(apiKey.id)}
                        disabled={deleteKeyMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    value={apiKey.key.slice(0, 12) + "..." + apiKey.key.slice(-8)}
                    readOnly
                    className="font-mono bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Created on {new Date(apiKey.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};