import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/components/ui/use-toast";
import { useBotDetection } from "@/hooks/useBotDetection";
import type { Json } from "@/integrations/supabase/types";

interface ToggleServiceParams {
  serviceType: string;
  isActive: boolean;
  project_id: string;
  action_preferences?: {
    action_type: string;
    automatic_actions: {
      block_ip: boolean;
      block_device: boolean;
      block_user: boolean;
    };
    notification_settings: {
      email: boolean;
      dashboard: boolean;
    };
  };
}

export const useServiceToggle = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { toast } = useToast();
  const { isBotDetected } = useBotDetection();

  const toggleService = useMutation({
    mutationFn: async ({ serviceType, isActive, project_id, action_preferences }: ToggleServiceParams) => {
      if (!currentUser?.id) throw new Error("No user found");
      
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
          .update({ 
            is_active: isActive,
            project_id,
            action_preferences: action_preferences as Json
          })
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
            project_id,
            action_preferences: action_preferences as Json,
            settings: {}
          });

        if (error) throw error;
      }

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

  return toggleService;
};