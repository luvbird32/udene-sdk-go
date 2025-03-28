import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useApiCredits = () => {
  const queryClient = useQueryClient();

  const { data: credits } = useQuery({
    queryKey: ["api-credits"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateCredits = useMutation({
    mutationFn: async (creditsToAdd: number) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('api_credits')
        .update({ 
          used_credits: (credits?.used_credits || 0) + creditsToAdd 
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-credits"] });
    },
  });

  return {
    credits,
    updateCredits: updateCredits.mutate,
    isUpdating: updateCredits.isPending,
  };
};