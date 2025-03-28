
import { useState, useRef, useEffect } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchResult } from "../types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { currentProject, setCurrentProject, projects } = useProject();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  return {
    searchQuery,
    setSearchQuery,
    showSearchResults,
    setShowSearchResults,
    searchResults,
    handleSearchResultClick,
    searchRef,
  };
};

