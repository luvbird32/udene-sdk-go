/**
 * ApiKeyForm Component
 * 
 * A form component for generating new API keys with a name and optional description.
 * Includes validation and loading state handling.
 * 
 * Features:
 * - Input validation
 * - Loading state during key generation
 * - Error handling
 * - Success feedback
 * 
 * @component
 * @example
 * ```tsx
 * <ApiKeyForm onSubmit={async (name, description) => {
 *   await generateApiKey(name, description);
 * }} />
 * ```
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ApiKeyFormProps {
  onSubmit: (name: string, description: string) => Promise<void>;
}

export const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      await onSubmit(projectName, projectDescription);
      setProjectName("");
      setProjectDescription("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Project Description (optional)"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
      <Button 
        onClick={handleGenerateKey} 
        disabled={!projectName.trim() || isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate API Key'
        )}
      </Button>
    </div>
  );
};
