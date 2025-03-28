import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyFormProps {
  onGenerateKey: (name: string) => Promise<void>;
  isLoading: boolean;
}

export const ApiKeyForm = ({ onGenerateKey, isLoading }: ApiKeyFormProps) => {
  const [newKeyName, setNewKeyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerateKey(newKeyName);
    setNewKeyName("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Generate New API Key</h3>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder="API Key Name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !newKeyName.trim()}>
          Generate Key
        </Button>
      </form>
    </div>
  );
};