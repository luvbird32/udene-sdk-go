import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Trash, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyKey = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      toast({
        title: "Copied!",
        description: "API key copied to clipboard",
      });
      setTimeout(() => setCopiedKeyId(null), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy API key",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    setKeyToDelete(id);
  };

  const confirmDelete = () => {
    if (keyToDelete) {
      onDelete(keyToDelete);
      setKeyToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!apiKeys?.length) {
    return (
      <div className="text-center p-8 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">
          No API keys generated yet. Create your first key above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((key) => (
        <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5">
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
              onClick={() => handleDelete(key.id)}
              title="Delete API key"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <AlertDialog open={!!keyToDelete} onOpenChange={() => setKeyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this API key? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};