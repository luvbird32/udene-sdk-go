import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKey {
  id: string;
  key_value: string;
  name: string;
  status: string;
  created_at: string;
}

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
  onRevokeKey: (id: string) => Promise<void>;
}

export const ApiKeyList = ({ apiKeys, isLoading, onRevokeKey }: ApiKeyListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Active API Keys</h3>
      {apiKeys.length === 0 ? (
        <p className="text-muted-foreground">No API keys found</p>
      ) : (
        apiKeys.map((key) => (
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
                  onClick={() => onRevokeKey(key.id)}
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
        ))
      )}
    </div>
  );
};