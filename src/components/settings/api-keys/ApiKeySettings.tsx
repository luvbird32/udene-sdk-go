import React from 'react';
import { useApiKeys } from './hooks/useApiKeys';
import { useApiKeyActions } from './hooks/useApiKeyActions';
import { ApiKeyForm } from './components/ApiKeyForm';
import { ApiKeyList } from './components/ApiKeyList';

export const ApiKeySettings = () => {
  const { apiKeys, user, fetchApiKeys } = useApiKeys();
  const { isLoading, generateApiKey, revokeApiKey } = useApiKeyActions(fetchApiKeys);

  if (!user) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <p className="text-muted-foreground mb-4">
          Please log in to manage your API keys
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApiKeyForm 
        onGenerateKey={generateApiKey}
        isLoading={isLoading}
      />
      <ApiKeyList 
        apiKeys={apiKeys}
        isLoading={isLoading}
        onRevokeKey={revokeApiKey}
      />
    </div>
  );
};