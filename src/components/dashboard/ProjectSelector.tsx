import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProject } from "@/contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

// Define search result types for better organization
interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'service' | 'product';
  description?: string;
  path?: string;
}

export const ProjectSelector = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: currentUser } = useCurrentUser();
  const { currentProject, setCurrentProject, projects, isLoading } = useProject();

  // Query for services and products
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_services")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  // Filter projects, services, and products based on search query
  const searchResults: SearchResult[] = [];

  // Add filtered projects
  projects?.forEach((project) => {
    if (
      searchQuery &&
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()))
    ) {
      searchResults.push({
        id: project.id,
        title: project.name,
        type: "project",
        description: project.description,
      });
    }
  });

  // Add filtered services
  services?.forEach((service) => {
    if (
      searchQuery &&
      (service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()))
    ) {
      searchResults.push({
        id: service.id,
        title: service.name,
        type: "service",
        description: service.description,
        path: `/dashboard/services/${service.id}`,
      });
    }
  });

  // Handle clicking outside of search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "project":
        const project = projects?.find(p => p.id === result.id);
        if (project) {
          setCurrentProject(project);
          toast({
            title: "Project Selected",
            description: `Switched to project: ${project.name}`,
          });
        }
        break;
      case "service":
        if (result.path) {
          navigate(result.path);
          toast({
            title: "Navigation",
            description: `Navigating to ${result.title}`,
          });
        }
        break;
    }
    setShowSearchResults(false);
    setSearchQuery("");
  };

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
      {/* Search Input with Results Dropdown */}
      <div className="relative flex-1" ref={searchRef}>
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search products and services..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchResults(true);
          }}
          onFocus={() => setShowSearchResults(true)}
          className="pl-10 w-full"
        />
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery && (
          <div className="absolute mt-2 w-full bg-popover text-popover-foreground shadow-md rounded-md border z-50">
            <Command>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {["project", "service", "product"].map((type) => {
                  const resultsOfType = searchResults.filter(r => r.type === type);
                  if (resultsOfType.length === 0) return null;

                  return (
                    <CommandGroup key={type} heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}>
                      {resultsOfType.map((result) => (
                        <CommandItem
                          key={`${result.type}-${result.id}`}
                          onSelect={() => handleSearchResultClick(result)}
                          className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent"
                        >
                          <div>
                            <div className="font-medium">{result.title}</div>
                            {result.description && (
                              <div className="text-sm text-muted-foreground">{result.description}</div>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </CommandList>
            </Command>
          </div>
        )}
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
          {projects?.map((project) => (
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
