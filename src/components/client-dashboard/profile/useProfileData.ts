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
        .single();

      if (error) throw error;

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
      
      // Set form data with decrypted values
      setFormData({
        username: data.username || "",
        organization_name: data.organization_name || "",
        organization_role: decryptedOrgRole || "",
        phone_number: decryptedPhoneNumber || "",
        timezone: data.timezone || "UTC",
        preferences
      });
      
      // Return profile with decrypted values
      return {
        ...data,
        phone_number: decryptedPhoneNumber,
        organization_role: decryptedOrgRole,
        preferences
      };
    },
  });
};