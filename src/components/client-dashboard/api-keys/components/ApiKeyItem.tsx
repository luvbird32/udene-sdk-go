import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Trash, Shield, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyItemProps {
  id: string;
  keyValue: string;
  name: string;
  description?: string;
  createdAt: string;
  keyType: 'testing' | 'production';
  onDelete: (id: string) => void;
}

export const ApiKeyItem = ({
  id,
  keyValue,
  name,
  description,
  createdAt,
  keyType,
  onDelete,
}: ApiKeyItemProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(keyValue);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">{name}</p>
            <Badge 
              variant={keyType === 'production' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              {keyType === 'production' ? (
                <ShieldCheck className="h-3 w-3" />
              ) : (
                <Shield className="h-3 w-3" />
              )}
              {keyType}
            </Badge>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="Copy API key"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(id)}
            title="Delete API key"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="font-mono text-sm p-2 bg-muted rounded border border-border">
        {keyValue}
      </div>
    </div>
  );
};