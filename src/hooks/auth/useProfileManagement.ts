import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useProfileManagement = () => {
  const { toast } = useToast();

  const createUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: userId,
            status: 'active',
            account_type: 'client'
          }
        ]);

      if (error) {
        console.error("Error creating profile:", error);
        toast({
          title: "Profile Creation Error",
          description: "Failed to create user profile. Please try again.",
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

  return {
    createUserProfile
  };
};