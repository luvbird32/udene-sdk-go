import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays } from "date-fns";
import { CreditUsageProgress } from "./credits/CreditUsageProgress";
import { TrialStatus } from "./credits/TrialStatus";
import { CreditWarnings } from "./credits/CreditWarnings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ApiCreditsDisplay = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const initializeCredits = useMutation({
    mutationFn: async (userId: string) => {
      // First check if credits already exist to prevent duplicate entries
      const { data: existingCredits } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingCredits) return existingCredits;

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
        console.error('Error initializing credits:', insertError);
        throw insertError;
      }

      const { data: newCredits, error: fetchError } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;
      return newCredits;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-credits"] });
      toast({
        title: "Credits Initialized",
        description: "Your free trial credits have been initialized successfully.",
      });
    },
    onError: (error) => {
      console.error('Error in initializeCredits:', error);
      toast({
        title: "Error",
        description: "Failed to initialize API credits. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { data: credits, isError, isLoading } = useQuery({
    queryKey: ["api-credits"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!data && !error) {
        return await initializeCredits.mutateAsync(user.id);
      }

      if (error) {
        console.error('Error fetching credits:', error);
        throw error;
      }

      return data;
    },
    retry: 1,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-8 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load API credits. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!credits) return null;

  const daysRemaining = credits.trial_end_date ? 
    differenceInDays(new Date(credits.trial_end_date), new Date()) : 0;

  const isLowCredits = (credits.total_credits - credits.used_credits) < (credits.total_credits * 0.1);
  const isTrialExpiring = credits.is_trial && daysRemaining <= 5;

  if (isLowCredits || isTrialExpiring) {
    toast({
      title: isLowCredits ? "Low API Credits" : "Trial Period Ending Soon",
      description: isLowCredits 
        ? "You're running low on API credits. Consider upgrading your plan."
        : `Your trial period will end in ${daysRemaining} days.`,
      variant: "destructive",
    });
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">API Credits</h3>
        {credits.is_trial && <TrialStatus trialEndDate={credits.trial_end_date} />}
      </div>

      <CreditUsageProgress 
        usedCredits={credits.used_credits} 
        totalCredits={credits.total_credits} 
      />

      <CreditWarnings 
        isLowCredits={isLowCredits}
        isTrialExpiring={isTrialExpiring}
        daysRemaining={daysRemaining}
      />
    </Card>
  );
};