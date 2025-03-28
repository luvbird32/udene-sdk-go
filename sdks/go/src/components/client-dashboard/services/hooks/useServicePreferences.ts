import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const useServicePreferences = (serviceType: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);

  const handlePreferencesChange = async (newPreferences: any) => {
    setIsUpdatingPreferences(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { error } = await supabase
        .from('client_services')
        .update({ action_preferences: newPreferences })
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["service-status", serviceType] });
      toast({
        title: "Preferences Updated",
        description: "Service action preferences have been updated successfully.",
      });
    } catch (error) {
      console.error("Preferences update error:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPreferences(false);
    }
  };

  return {
    isUpdatingPreferences,
    handlePreferencesChange
  };
};