/**
 * CreditWarnings Component
 * 
 * Displays warning alerts for low API credits or expiring trial periods.
 * Shows relevant warning messages based on credit status and trial status.
 * 
 * Features:
 * - Low credits warning
 * - Trial expiration warning
 * - Conditional rendering
 * - Visual alert styling
 * 
 * @component
 * @example
 * ```tsx
 * <CreditWarnings
 *   isLowCredits={true}
 *   isTrialExpiring={false}
 *   daysRemaining={7}
 * />
 * ```
 */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CreditWarningsProps {
  /** Indicates if credits are running low */
  isLowCredits: boolean;
  /** Indicates if trial period is about to expire */
  isTrialExpiring: boolean;
  /** Number of days remaining in trial period */
  daysRemaining: number;
}

export const CreditWarnings = ({ isLowCredits, isTrialExpiring, daysRemaining }: CreditWarningsProps) => {
  if (!isLowCredits && !isTrialExpiring) return null;

  return (
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
  );
};