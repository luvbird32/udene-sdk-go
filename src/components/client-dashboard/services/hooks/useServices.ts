import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types/database";

type ClientService = Database['public']['Tables']['client_services']['Row'];

export const useServices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-services"],
    queryFn: async () => {
      try {
        const { data: services, error } = await supabase
          .from('client_services')
          .select('*');

        if (error) {
          toast({
            title: "Error loading services",
            description: error.message,
            variant: "destructive"
          });
          throw error;
        }
        return services as ClientService[];
      } catch (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Connection Error",
          description: "Failed to load services. Please check your connection and try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};