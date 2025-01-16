import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { ClientService } from "@/integrations/supabase/types/client-services";

export const useServices = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ["client-services", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Fetching services for user:", user.id);
      
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
      return services as ClientService[];
    },
    enabled: !!user,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ serviceType, isActive }: { serviceType: string; isActive: boolean }) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('client_services')
        .update({ is_active: isActive })
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    await toggleMutation.mutateAsync({ serviceType, isActive });
  };

  return {
    services,
    isLoading,
    error,
    handleToggle
  };
};