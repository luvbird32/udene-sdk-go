import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProject } from "@/contexts/ProjectContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ProjectSettings = () => {
  const { currentProject } = useProject();
  const [name, setName] = React.useState(currentProject?.name || '');
  const [description, setDescription] = React.useState(currentProject?.description || '');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProject = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      if (!currentProject) throw new Error("No project selected");
      
      const { error } = await supabase
        .from('projects')
        .update({ name, description })
        .eq('id', currentProject.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Success",
        description: "Project settings updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!currentProject) {
    return (
      <Alert>
        <AlertDescription>
          Please select a project to manage settings.
        </AlertDescription>
      </Alert>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject.mutateAsync({ name, description });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Project Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </div>

        <Button 
          type="submit" 
          disabled={updateProject.isPending}
          className="w-full"
        >
          {updateProject.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Project Settings'
          )}
        </Button>
      </form>
    </Card>
  );
};