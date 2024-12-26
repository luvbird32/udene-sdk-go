import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyFormProps {
  onSubmit: (name: string, description: string) => Promise<void>;
  isGenerating: boolean;
}

export const ApiKeyForm = ({ onSubmit, isGenerating }: ApiKeyFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(projectName, projectDescription);
      setProjectName("");
      setProjectDescription("");
    } catch (error) {
      console.error('Error generating API key:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mb-2"
          disabled={isGenerating}
          required
          aria-label="Project Name"
        />
        <Input
          placeholder="Project Description (optional)"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          disabled={isGenerating}
          aria-label="Project Description"
        />
      </div>
      <Button 
        type="submit"
        disabled={!projectName.trim() || isGenerating}
        className="w-full"
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
    </form>
  );
};