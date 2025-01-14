import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocalStorage } from "./useLocalStorage";

export const useCurrentProject = () => {
  const [currentProjectId, setCurrentProjectId] = useLocalStorage<string | null>("currentProjectId", null);

  const { data: currentProject } = useQuery({
    queryKey: ["project", currentProjectId],
    queryFn: async () => {
      if (!currentProjectId) return null;

      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', currentProjectId)
        .single();

      if (error) throw error;
      return project;
    },
    enabled: !!currentProjectId
  });

  return {
    currentProject,
    currentProjectId,
    setCurrentProjectId
  };
};