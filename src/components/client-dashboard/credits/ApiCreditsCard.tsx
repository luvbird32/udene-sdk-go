
import { Card } from "@/components/ui/card";
import { CreditUsageProgress } from "./CreditUsageProgress";
import { TrialStatus } from "./TrialStatus";
import { CreditWarnings } from "./CreditWarnings";
import { TrialTimeProgress } from "./TrialTimeProgress";
import { differenceInDays } from "date-fns";
import { useApiCredits } from "./useApiCredits";
import { useDeviceBlock } from "@/hooks/useDeviceBlock";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const ApiCreditsCard = () => {
  const { credits, isLoading, error } = useApiCredits();
  const { data: isDeviceBlocked } = useDeviceBlock();

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

  if (error || !credits || isDeviceBlocked) {
    return null;
  }

  const daysRemaining = credits.trial_end_date ? 
    differenceInDays(new Date(credits.trial_end_date), new Date()) : 0;

  const isLowCredits = (credits.total_credits - credits.used_credits) < (credits.total_credits * 0.1);
  const isTrialExpiring = credits.is_trial && daysRemaining <= 2;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">API Credits</h3>
        {credits.is_trial && <TrialStatus trialEndDate={credits.trial_end_date} />}
      </div>

      <CreditUsageProgress 
        usedCredits={credits.used_credits} 
        totalCredits={credits.total_credits} 
      />

      {credits.is_trial && credits.trial_start_date && credits.trial_end_date && (
        <TrialTimeProgress 
          trialStartDate={credits.trial_start_date}
          trialEndDate={credits.trial_end_date}
        />
      )}

      <CreditWarnings 
        isLowCredits={isLowCredits}
        isTrialExpiring={isTrialExpiring}
        daysRemaining={daysRemaining}
      />

      {(isLowCredits || isTrialExpiring) && (
        <div className="pt-2">
          <Button className="w-full" variant="secondary">
            <ExternalLink className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
        </div>
      )}
    </Card>
  );
};
