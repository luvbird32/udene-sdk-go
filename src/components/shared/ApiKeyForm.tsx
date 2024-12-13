import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ApiKeyFormProps {
  onSubmit: (name: string, description: string) => Promise<void>;
  isGenerating: boolean;
}

export const ApiKeyForm = ({ onSubmit, isGenerating }: ApiKeyFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async () => {
    await onSubmit(projectName, projectDescription);
    setProjectName("");
    setProjectDescription("");
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
        onClick={handleSubmit} 
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