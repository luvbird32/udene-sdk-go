import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { AlertCircle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ApiCreditsDisplay = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize credits mutation
  const initializeCredits = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('api_credits')
        .insert([{ 
          user_id: userId,
          total_credits: 1000, // Default value
          used_credits: 0,
          is_trial: true,
          trial_start_date: new Date().toISOString(),
          trial_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        }]);

      if (error) throw error;

      // Fetch the newly created record
      const { data: newData, error: fetchError } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;
      return newData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-credits"] });
    },
  });

  const { data: credits, isError } = useQuery({
    queryKey: ["api-credits"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Try to get existing credits
      const { data, error } = await supabase
        .from('api_credits')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // If no record exists and no error, initialize credits
      if (!data && !error) {
        return await initializeCredits.mutateAsync(user.id);
      }

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Show error state
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

  // Calculate usage percentage
  const usagePercentage = credits ? 
    Math.round((credits.used_credits / credits.total_credits) * 100) : 0;

  // Calculate days remaining in trial
  const daysRemaining = credits?.trial_end_date ? 
    differenceInDays(new Date(credits.trial_end_date), new Date()) : 0;

  // Show low credits warning
  const isLowCredits = credits && 
    ((credits.total_credits - credits.used_credits) < (credits.total_credits * 0.1));

  // Show trial expiring warning
  const isTrialExpiring = credits?.is_trial && daysRemaining <= 5;

  // Show warnings as toasts
  if (isLowCredits) {
    toast({
      title: "Low API Credits",
      description: "You're running low on API credits. Consider upgrading your plan.",
      variant: "destructive",
    });
  }

  if (isTrialExpiring) {
    toast({
      title: "Trial Period Ending Soon",
      description: `Your trial period will end in ${daysRemaining} days.`,
      variant: "destructive",
    });
  }

  if (!credits) return null;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">API Credits</h3>
        {credits.is_trial && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Trial ends {formatDistanceToNow(new Date(credits.trial_end_date), { addSuffix: true })}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Used: {credits.used_credits}</span>
          <span>Total: {credits.total_credits}</span>
        </div>
        <Progress value={usagePercentage} className="h-2" />
      </div>

      {(isLowCredits || isTrialExpiring) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {isLowCredits ? "Low Credits Warning" : "Trial Ending Soon"}
          </AlertTitle>
          <AlertDescription>
            {isLowCredits 
              ? "You're running low on API credits. Consider upgrading your plan."
              : `Your trial period will end in ${daysRemaining} days.`}
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};