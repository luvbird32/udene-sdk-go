import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CreditWarningsProps {
  isLowCredits: boolean;
  isTrialExpiring: boolean;
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