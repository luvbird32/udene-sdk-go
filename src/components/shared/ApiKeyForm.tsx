import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApiKeyFormProps {
  onSubmit: (name: string, description: string, keyType: 'testing' | 'production') => Promise<void>;
  isGenerating: boolean;
}

export const ApiKeyForm = ({ onSubmit, isGenerating }: ApiKeyFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [keyType, setKeyType] = useState<'testing' | 'production'>('testing');

  const handleSubmit = async () => {
    await onSubmit(projectName, projectDescription, keyType);
    setProjectName("");
    setProjectDescription("");
    setKeyType('testing');
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
          className="mb-2"
        />
        <Select
          value={keyType}
          onValueChange={(value: 'testing' | 'production') => setKeyType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select key type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="testing">Test Key</SelectItem>
            <SelectItem value="production">Production Key</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleSubmit} 
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
    </div>
  );
};