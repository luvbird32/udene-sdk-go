import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Check, Trash, Shield, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  key_value: string;
  name: string;
  description?: string;
  created_at: string;
  key_type: 'testing' | 'production';
}

interface ApiKeyListProps {
  apiKeys?: ApiKey[];
  isLoading: boolean;
  onDelete: (keyId: string) => void;
}

export const ApiKeyList = ({ apiKeys, isLoading, onDelete }: ApiKeyListProps) => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
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
        <div key={key.id} className="flex flex-col space-y-3 p-4 border rounded-lg bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{key.name}</p>
                <Badge 
                  variant={key.key_type === 'production' ? 'default' : 'secondary'}
                  className="flex items-center gap-1 text-foreground"
                >
                  {key.key_type === 'production' ? (
                    <ShieldCheck className="h-3 w-3" />
                  ) : (
                    <Shield className="h-3 w-3" />
                  )}
                  {key.key_type}
                </Badge>
              </div>
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
                title="Copy API key"
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
                title="Delete API key"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="font-mono text-sm p-2 bg-muted rounded border border-border text-foreground">
            {key.key_value}
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