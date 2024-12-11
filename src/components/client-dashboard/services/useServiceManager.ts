import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/components/ui/use-toast";
import { useBotDetection } from "@/hooks/useBotDetection";
import type { Database } from "@/integrations/supabase/types/database";

type ClientService = Database['public']['Tables']['client_services']['Row'];

export const useServiceManager = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { toast } = useToast();
  const { isBotDetected } = useBotDetection();

  const { data: activeServices, isLoading } = useQuery({
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

  const toggleService = useMutation({
    mutationFn: async ({ serviceType, isActive }: { serviceType: string; isActive: boolean }) => {
      if (!currentUser?.id) throw new Error("No user found");
      
      // Bot prevention check
      if (isBotDetected) {
        throw new Error("Suspicious activity detected. Please try again later.");
      }

      const { data: existingService, error: queryError } = await supabase
        .from('client_services')
        .select('*')
        .eq('service_type', serviceType)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (queryError) throw queryError;

      if (existingService) {
        const { error } = await supabase
          .from('client_services')
          .update({ is_active: isActive })
          .eq('service_type', serviceType)
          .eq('user_id', currentUser.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('client_services')
          .insert({
            service_type: serviceType,
            is_active: isActive,
            user_id: currentUser.id,
            settings: {}
          });

        if (error) throw error;
      }

      // Log the service toggle attempt
      await supabase.from('audit_logs').insert({
        event_type: isActive ? 'service_activated' : 'service_deactivated',
        entity_type: 'service',
        entity_id: serviceType,
        user_id: currentUser.id,
        changes: { service_type: serviceType, is_active: isActive }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-services"] });
    },
    onError: (error) => {
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    activeServices,
    isLoading,
    toggleService
  };
};