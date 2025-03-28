
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings } from "@/types/settings";
import { Json } from "@/integrations/supabase/types/core";

export const useClientSettings = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["client-settings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('profiles')
        .select('settings')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      const defaultSettings: ClientSettings = {
        notification_preferences: {
          email: true,
          sms: false,
          push: false,
          categories: {
            security: true,
            fraud: true,
            system: true,
            account: true
          },
          severity_levels: {
            low: true,
            medium: true,
            high: true
          },
          quiet_hours: {
            enabled: false,
            start: "22:00",
            end: "07:00"
          }
        },
        risk_threshold: 75,
        contact_email: '',
      };

      return (data?.settings as unknown as ClientSettings) || defaultSettings;
    },
  });

  const updateSettings = async (newSettings: ClientSettings) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        settings: newSettings as unknown as Json,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) throw updateError;
    await queryClient.invalidateQueries({ queryKey: ["client-settings"] });
  };

  return {
    settings,
    isLoading,
    updateSettings,
  };
};
