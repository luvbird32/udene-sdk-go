import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ApiKeyItem } from "./components/ApiKeyItem";
import { DeleteKeyDialog } from "./components/DeleteKeyDialog";

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
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

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
        <ApiKeyItem
          key={key.id}
          id={key.id}
          keyValue={key.key_value}
          name={key.name}
          description={key.description}
          createdAt={key.created_at}
          onDelete={handleDelete}
        />
      ))}

      <DeleteKeyDialog
        isOpen={!!keyToDelete}
        onClose={() => setKeyToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};