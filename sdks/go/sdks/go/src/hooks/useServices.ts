import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useServices = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  return useQuery({
    queryKey: ["client-services", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Fetching services for user:", user.id);
      
      // Remove .single() since we expect multiple services
      const { data: services, error } = await supabase
        .from('client_services')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error loading services",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log("Fetched services:", services);
      return services || []; // Return empty array if no services found
    },
    enabled: !!user,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};