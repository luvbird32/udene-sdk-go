
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useApiCredits = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const initializeCredits = useMutation({
    mutationFn: async (userId: string) => {
      try {
        console.log('Initializing credits for user:', userId);
        
        const { data: existingCredits, error: checkError } = await supabase
          .from('api_credits')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking existing credits:', checkError);
          throw checkError;
        }

        if (existingCredits) {
          console.log('Credits already exist for user:', userId);
          return existingCredits;
        }

        console.log('Creating new credits for user:', userId);
        const { error: insertError } = await supabase
          .from('api_credits')
          .insert([{ 
            user_id: userId,
            total_credits: 1000,
            used_credits: 0,
            is_trial: true,
            trial_start_date: new Date().toISOString(),
            trial_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }]);

        if (insertError) {
          console.error('Error inserting credits:', insertError);
          throw insertError;
        }

        const { data: newCredits, error: fetchError } = await supabase
          .from('api_credits')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (fetchError) {
          console.error('Error fetching new credits:', fetchError);
          throw fetchError;
        }

        console.log('Successfully created credits:', newCredits);
        return newCredits;
      } catch (error) {
        console.error('Error in initializeCredits:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-credits"] });
      toast({
        title: "Credits Initialized",
        description: "Your free trial credits have been initialized successfully.",
      });
    },
    onError: (error) => {
      console.error('Error in initializeCredits mutation:', error);
      toast({
        title: "Error",
        description: "Failed to initialize API credits. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { data: credits, isError, isLoading, error } = useQuery({
    queryKey: ["api-credits"],
    queryFn: async () => {
      try {
        console.log('Fetching user session...');
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting user:', userError);
          throw userError;
        }

        if (!user) {
          console.error('No user found');
          throw new Error("No user found");
        }

        console.log('Fetching credits for user:', user.id);
        const { data, error } = await supabase
          .from('api_credits')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching credits:', error);
          throw error;
        }

        if (!data) {
          console.log('No credits found, initializing...');
          return await initializeCredits.mutateAsync(user.id);
        }

        // Check if trial has expired
        if (data.is_trial && new Date(data.trial_end_date) <= new Date()) {
          console.log('Trial has expired, updating status...');
          const { error: updateError } = await supabase
            .from('api_credits')
            .update({ 
              is_trial: false,
              total_credits: 0,
              used_credits: 0
            })
            .eq('id', data.id);

          if (updateError) {
            console.error('Error updating expired trial:', updateError);
            throw updateError;
          }

          // Fetch the updated credits
          const { data: updatedCredits, error: fetchError } = await supabase
            .from('api_credits')
            .select('*')
            .eq('id', data.id)
            .single();

          if (fetchError) {
            console.error('Error fetching updated credits:', fetchError);
            throw fetchError;
          }

          toast({
            title: "Trial Expired",
            description: "Your trial period has ended. Please upgrade your plan to continue using our services.",
            variant: "destructive"
          });

          return updatedCredits;
        }

        console.log('Credits fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('Error in credits query:', error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: 30000,
  });

  return {
    credits,
    isLoading,
    error: isError ? error : null
  };
};
