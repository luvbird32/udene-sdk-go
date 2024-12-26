import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyItemProps {
  id: string;
  keyValue: string;
  name: string;
  description?: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export const ApiKeyItem = ({ 
  id, 
  keyValue, 
  name, 
  description, 
  createdAt, 
  onDelete 
}: ApiKeyItemProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(keyValue);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "API key copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy API key",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5">
      <div className="space-y-1">
        <p className="font-medium">{name}</p>
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
          onClick={handleCopyKey}
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
  );
};