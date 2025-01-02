import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useProfileManagement = () => {
  const { toast } = useToast();

  const createUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
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

  return {
    createUserProfile
  };
};