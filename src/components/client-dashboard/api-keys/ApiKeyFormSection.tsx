import { Card } from "@/components/ui/card";
import { ApiKeyForm } from "@/components/shared/ApiKeyForm";

interface ApiKeyFormSectionProps {
  onGenerateKey: (name: string, description: string, keyType: 'testing' | 'production') => Promise<void>;
  isGenerating: boolean;
}

export const ApiKeyFormSection = ({ onGenerateKey, isGenerating }: ApiKeyFormSectionProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-white/60">Generate New API Key</h3>
      <ApiKeyForm 
        onSubmit={onGenerateKey}
        isGenerating={isGenerating}
      />
    </Card>
  );
};