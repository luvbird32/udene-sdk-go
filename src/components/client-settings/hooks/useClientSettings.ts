import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings } from "@/types/settings";

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
        },
        risk_threshold: 75,
        contact_email: '',
      };

      // Cast the data to unknown first, then to ClientSettings
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