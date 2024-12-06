import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ApiKeySettings = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simple function to fetch API keys
  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error fetching API keys",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Simple function to generate a new API key
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
      const keyValue = `key_${Math.random().toString(36).substring(2)}`;
      
      const { error } = await supabase
        .from('api_keys')
        .insert({
          key_value: keyValue,
          name: newKeyName,
          status: 'active'
        });

      if (error) throw error;

      setNewKeyName("");
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

  // Simple function to revoke an API key
  const revokeApiKey = async (id) => {
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
        {apiKeys.map((key) => (
          <div key={key.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{key.name}</p>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(key.created_at).toLocaleDateString()}
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
              <Input
                value={key.key_value}
                readOnly
                className="mt-2 font-mono text-sm"
              />
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Status: {key.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};