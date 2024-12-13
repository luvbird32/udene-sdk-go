import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TrialStatusProps {
  trialEndDate: string;
}

export const TrialStatus = ({ trialEndDate }: TrialStatusProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      Trial ends {formatDistanceToNow(new Date(trialEndDate), { addSuffix: true })}
    </div>
  );
};