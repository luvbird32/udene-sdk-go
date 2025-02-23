
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProject } from "@/contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { ProjectDialog } from "./ProjectDialog";
import { ProjectSelect } from "./ProjectSelect";
import { SearchResult } from "./types";
import { WelcomeGuide } from "./WelcomeGuide";

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

  const searchResults: SearchResult[] = [];

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

  services?.forEach((service) => {
    const serviceType = service.service_type || "";
    if (
      searchQuery &&
      serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      searchResults.push({
        id: service.id,
        title: serviceType,
        type: "service",
        description: `Service: ${serviceType}`,
        path: `/services/${service.id}`,
      });
    }
  });

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
    console.log("Handling search result click:", result);
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
          console.log("Navigating to:", result.path);
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
    <div className="space-y-4 mb-6">
      <WelcomeGuide />
      <div className="flex items-center gap-4">
        <ProjectSelect
          isLoading={isLoading}
          currentProject={currentProject}
          projects={projects}
          handleProjectChange={handleProjectChange}
        />
        <ProjectDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          newProjectDescription={newProjectDescription}
          setNewProjectDescription={setNewProjectDescription}
          handleCreateProject={handleCreateProject}
        />
      </div>
      
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        searchResults={searchResults}
        handleSearchResultClick={handleSearchResultClick}
        searchRef={searchRef}
      />
    </div>
  );
};

