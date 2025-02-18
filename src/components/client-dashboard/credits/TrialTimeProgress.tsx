
import { AlertCircle } from "lucide-react";
import { differenceInDays, formatDistance } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TrialTimeProgressProps {
  trialStartDate: string;
  trialEndDate: string;
}

export const TrialTimeProgress = ({ trialStartDate, trialEndDate }: TrialTimeProgressProps) => {
  const startDate = new Date(trialStartDate);
  const endDate = new Date(trialEndDate);
  const currentDate = new Date();
  
  // Calculate total trial duration and days elapsed
  const totalTrialDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(currentDate, startDate);
  
  // Calculate progress percentage
  const progress = Math.min(Math.round((daysElapsed / totalTrialDays) * 100), 100);
  
  // Calculate days remaining
  const daysRemaining = differenceInDays(endDate, currentDate);
  
  // Determine if trial is nearing end (less than 3 days)
  const isNearingEnd = daysRemaining <= 3 && daysRemaining > 0;
  
  if (daysRemaining <= 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your trial period has ended. Please upgrade your plan to continue using our services.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Trial Progress</span>
        <span>{formatDistance(currentDate, endDate, { addSuffix: true })}</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      {isNearingEnd && (
        <Alert variant="warning" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your trial will end in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}. 
            Consider upgrading your plan to maintain uninterrupted service.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
