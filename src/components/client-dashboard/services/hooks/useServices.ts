import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentProject } from "@/hooks/useCurrentProject";

export const useServices = () => {
  const { currentProject } = useCurrentProject();

  return useQuery({
    queryKey: ["client-services", currentProject?.id],
    queryFn: async () => {
      const { data: services, error } = await supabase
        .from('client_services')
        .select('*')
        .eq('project_id', currentProject?.id);

      if (error) throw error;
      return services;
    },
    enabled: !!currentProject?.id
  });
};