import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "./ProfileContext";
import { Profile } from "@/types/supabase";
import { ProfilePreferences } from "@/types/profile";

export const useProfileData = () => {
  const { setFormData } = useProfile();

  return useQuery({
    queryKey: ["client-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      
      const rawPreferences = data.preferences as unknown;
      const preferences: ProfilePreferences = (rawPreferences as ProfilePreferences) || {
        notifications: { email: true, sms: false },
        theme: "light"
      };
      
      setFormData({
        username: data.username || "",
        organization_name: data.organization_name || "",
        organization_role: data.organization_role || "",
        phone_number: data.phone_number || "",
        timezone: data.timezone || "UTC",
        preferences
      });
      
      return { ...data, preferences };
    },
  });
};