import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export const ApiKeySettings = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<Tables<'api_keys'>[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast({
        title: "Error fetching API keys",
        description: "Failed to load API keys. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for the API key",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const { data: keyData, error: keyError } = await supabase.rpc('generate_api_key');
      if (keyError) throw keyError;

      const { error: insertError } = await supabase
        .from('api_keys')
        .insert({
          key_value: keyData,
          name: newKeyName,
          status: 'active'
        });

      if (insertError) throw insertError;

      setNewKeyName("");
      await fetchApiKeys();
      toast({
        title: "Success",
        description: "New API key generated successfully"
      });
    } catch (error) {
      console.error('Error generating API key:', error);
      toast({
        title: "Error",
        description: "Failed to generate API key",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const revokeApiKey = async (keyId: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('api_keys')
        .update({ status: 'revoked' })
        .eq('id', keyId);

      if (error) throw error;

      await fetchApiKeys();
      toast({
        title: "Success",
        description: "API key revoked successfully"
      });
    } catch (error) {
      console.error('Error revoking API key:', error);
      toast({
        title: "Error",
        description: "Failed to revoke API key",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generate New API Key</h3>
        <div className="flex gap-4">
          <Input
            placeholder="API Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={generateApiKey} disabled={isLoading}>
            Generate Key
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active API Keys</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(key.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                  {key.status === 'active' && (
                    <Button
                      variant="destructive"
                      onClick={() => revokeApiKey(key.id)}
                      disabled={isLoading}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
                {key.status === 'active' && (
                  <div className="mt-2">
                    <Input
                      value={key.key_value}
                      readOnly
                      className="font-mono text-sm"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Status: <span className={key.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                    {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};