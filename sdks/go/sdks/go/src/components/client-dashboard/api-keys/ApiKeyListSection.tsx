import { Card } from "@/components/ui/card";
import { ApiKeyList } from "@/components/shared/ApiKeyList";

interface ApiKeyListSectionProps {
  apiKeys?: any[];
  isLoading: boolean;
  onDelete: (keyId: string) => void;
}

export const ApiKeyListSection = ({ apiKeys, isLoading, onDelete }: ApiKeyListSectionProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
      <ApiKeyList 
        apiKeys={apiKeys}
        isLoading={isLoading}
        onDelete={onDelete}
      />
    </Card>
  );
};