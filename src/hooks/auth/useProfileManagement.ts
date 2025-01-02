import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { UserProfile } from "./types";

export const useProfileManagement = () => {
  const { toast } = useToast();

  const createUserProfile = async (userId: string, role: string): Promise<boolean> => {
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast({
          title: "Profile Error",
          description: "Account created but profile setup failed. Please contact support.",
          variant: "destructive"
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in createUserProfile:", error);
      return false;
    }
  };

  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return profile;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return null;
    }
  };

  return {
    createUserProfile,
    getUserProfile
  };
};