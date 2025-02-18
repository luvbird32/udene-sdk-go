
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProject } from "@/contexts/ProjectContext";

export const ProjectSelector = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: currentUser } = useCurrentUser();
  const { currentProject, setCurrentProject, projects, isLoading } = useProject();

  // Filter projects based on search query
  const filteredProjects = projects?.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

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

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);
    setCurrentProject(selectedProject || null);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search products and services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      {/* Project Selector */}
      <Select 
        disabled={isLoading} 
        value={currentProject?.id} 
        onValueChange={handleProjectChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {filteredProjects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Add Project Button/Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Input
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Enter project description"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
            >
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
