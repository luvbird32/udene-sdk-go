/**
 * TrialStatus Component
 * 
 * Displays the remaining time in the trial period with a visual indicator.
 * Uses date-fns for human-readable time formatting.
 * 
 * Features:
 * - Human-readable time display
 * - Visual clock icon
 * - Automatic time calculation
 * 
 * @component
 * @example
 * ```tsx
 * <TrialStatus trialEndDate="2024-04-01T00:00:00Z" />
 * ```
 */
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TrialStatusProps {
  /** ISO date string for when the trial period ends */
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