import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "./ProfileContext";
import { Profile } from "@/types/profile";
import { ProfilePreferences } from "@/types/profile";

export const useProfileData = () => {
  const { setFormData } = useProfile();

  return useQuery({
    queryKey: ["client-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch profile with encrypted fields
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          phone_number_encrypted,
          phone_number_iv,
          organization_role_encrypted,
          organization_role_iv
        `)
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("No profile found");

      // Decrypt sensitive data using RPC function if encrypted values exist
      let decryptedPhoneNumber = null;
      let decryptedOrgRole = null;

      if (data.phone_number_encrypted && data.phone_number_iv) {
        const { data: phone } = await supabase.rpc('decrypt_sensitive_data', {
          encrypted_data: data.phone_number_encrypted,
          iv: data.phone_number_iv
        });
        decryptedPhoneNumber = phone;
      }

      if (data.organization_role_encrypted && data.organization_role_iv) {
        const { data: role } = await supabase.rpc('decrypt_sensitive_data', {
          encrypted_data: data.organization_role_encrypted,
          iv: data.organization_role_iv
        });
        decryptedOrgRole = role;
      }
      
      const rawPreferences = data.preferences as unknown;
      const preferences: ProfilePreferences = (rawPreferences as ProfilePreferences) || {
        notifications: { email: true, sms: false },
        theme: "light"
      };

      // Auto-detect timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Set form data with user metadata and decrypted values
      setFormData({
        username: data.username || user.email?.split('@')[0] || "",
        organization_name: data.organization_name || "",
        organization_role: decryptedOrgRole || data.organization_role || "",
        phone_number: decryptedPhoneNumber || data.phone_number || "",
        timezone: data.timezone || userTimezone, // Use detected timezone as fallback
        preferences
      });
      
      // Return profile with decrypted values
      return {
        ...data,
        phone_number: decryptedPhoneNumber,
        organization_role: decryptedOrgRole,
        preferences,
        full_name: data.full_name || user.user_metadata?.full_name
      };
    },
  });
};