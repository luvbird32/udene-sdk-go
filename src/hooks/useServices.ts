import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProject } from "@/contexts/ProjectContext";
import type { ClientService } from "@/types/services";

export const useServices = () => {
  const { toast } = useToast();
  const { currentProject } = useProject();

  return useQuery({
    queryKey: ["client-services", currentProject?.id],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No authenticated user");

        const query = supabase
          .from('client_services')
          .select('*')
          .eq('user_id', user.id);

        // Add project filter if a project is selected
        if (currentProject?.id) {
          query.eq('project_id', currentProject.id);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching services:', error);
          toast({
            title: "Error",
            description: "Failed to load services. Please try again.",
            variant: "destructive",
          });
          throw error;
        }

        console.log('Fetched services:', data);
        return data as ClientService[];
      } catch (error) {
        console.error('Error in useServices:', error);
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: true,
  });
};