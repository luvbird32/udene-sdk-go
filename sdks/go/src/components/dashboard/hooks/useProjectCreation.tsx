
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProject } from "@/contexts/ProjectContext";
import { supabase } from "@/integrations/supabase/client";

export const useProjectCreation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const { toast } = useToast();
  const { data: currentUser } = useCurrentUser();
  const { setCurrentProject } = useProject();

  const handleCreateProject = async () => {
    try {
      if (!currentUser?.id) {
        console.error("No authenticated user found");
        toast({
          title: "Error",
          description: "You must be logged in to create a project",
          variant: "destructive",
        });
        return;
      }

      console.log("Creating project with user_id:", currentUser.id);
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            name: newProjectName,
            description: newProjectDescription || null,
            user_id: currentUser.id,
          },
        ])
        .select();

      if (error) {
        console.error("Error creating project:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Project created successfully:", data);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setIsOpen(false);
      setNewProjectName("");
      setNewProjectDescription("");
      
      if (data?.[0]) {
        setCurrentProject(data[0]);
      }
    } catch (error) {
      console.error("Error in handleCreateProject:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  return {
    isOpen,
    setIsOpen,
    newProjectName,
    setNewProjectName,
    newProjectDescription,
    setNewProjectDescription,
    handleCreateProject,
  };
};

