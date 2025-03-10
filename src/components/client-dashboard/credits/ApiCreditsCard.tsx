
import { Card } from "@/components/ui/card";
import { CreditUsageProgress } from "./CreditUsageProgress";
import { TrialStatus } from "./TrialStatus";
import { CreditWarnings } from "./CreditWarnings";
import { TrialTimeProgress } from "./TrialTimeProgress";
import { useApiCredits } from "./useApiCredits";
import { useDeviceBlock } from "@/hooks/useDeviceBlock";
import { differenceInDays } from "date-fns";

/**
 * ApiCreditsCard Component
 * 
 * Displays the current API credit usage and trial status for the user.
 * Shows credit usage progress, trial time remaining (if applicable),
 * and warnings for low credits or expiring trials.
 * 
 * Features:
 * - Credit usage visualization with progress bar
 * - Trial status indicator (if user is on trial)
 * - Trial time remaining progress bar 
 * - Warning notifications for low credit balance
 * - Warning for soon-expiring trial periods
 * 
 * Data Dependencies:
 * - useApiCredits() - Fetches credit and trial information
 * - useDeviceBlock() - Checks if the current device is blocked
 */
export const ApiCreditsCard = () => {
  // Fetch credit information and device block status
  const { credits, isLoading, error } = useApiCredits();
  const { data: isDeviceBlocked } = useDeviceBlock();

  // Show loading state while fetching data
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

  // Show error state if data couldn't be loaded or device is blocked
  if (error || !credits || isDeviceBlocked) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Unable to load credit information
        </div>
      </Card>
    );
  }

  // Calculate days remaining in trial (if applicable)
  const daysRemaining = credits.trial_end_date ? 
    differenceInDays(new Date(credits.trial_end_date), new Date()) : 0;

  // Determine warning states
  // - Low credits: Less than 10% of total credits remaining
  // - Trial expiring: Trial period with 2 or fewer days remaining
  const isLowCredits = (credits.total_credits - credits.used_credits) < (credits.total_credits * 0.1);
  const isTrialExpiring = credits.is_trial && daysRemaining <= 2;

  return (
    <Card className="p-6 space-y-6">
      {/* Header section with title and trial status */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">API Credits</h3>
        {credits.is_trial && <TrialStatus trialEndDate={credits.trial_end_date} />}
      </div>

      {/* Credit usage visualization */}
      <CreditUsageProgress 
        usedCredits={credits.used_credits} 
        totalCredits={credits.total_credits} 
      />

      {/* Trial time progress (only shown for trial accounts) */}
      {credits.is_trial && credits.trial_start_date && credits.trial_end_date && (
        <TrialTimeProgress 
          trialStartDate={credits.trial_start_date}
          trialEndDate={credits.trial_end_date}
        />
      )}

      {/* Warning notifications for low credits or expiring trial */}
      <CreditWarnings 
        isLowCredits={isLowCredits}
        isTrialExpiring={isTrialExpiring}
        daysRemaining={daysRemaining}
      />
    </Card>
  );
};
