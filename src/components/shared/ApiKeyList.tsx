import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Check, Trash } from "lucide-react";

interface ApiKey {
  id: string;
  key_value: string;
  name: string;
  description?: string;
  created_at: string;
}

interface ApiKeyListProps {
  apiKeys?: ApiKey[];
  isLoading: boolean;
  onDelete: (keyId: string) => void;
}

export const ApiKeyList = ({ apiKeys, isLoading, onDelete }: ApiKeyListProps) => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
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
              onClick={() => onDelete(key.id)}
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
  );
};