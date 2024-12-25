/**
 * CreditUsageProgress Component
 * 
 * Displays a visual progress bar showing API credit usage with detailed statistics.
 * Shows both used and total credits along with a percentage-based progress bar.
 * 
 * Features:
 * - Visual progress indicator
 * - Credit usage statistics
 * - Responsive design
 * - Automatic percentage calculation
 * 
 * @component
 * @example
 * ```tsx
 * <CreditUsageProgress
 *   usedCredits={500}
 *   totalCredits={1000}
 * />
 * ```
 */
import { Progress } from "@/components/ui/progress";

interface CreditUsageProgressProps {
  /** Number of credits used */
  usedCredits: number;
  /** Total available credits */
  totalCredits: number;
}

export const CreditUsageProgress = ({ usedCredits, totalCredits }: CreditUsageProgressProps) => {
  const usagePercentage = Math.round((usedCredits / totalCredits) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Used: {usedCredits}</span>
        <span>Total: {totalCredits}</span>
      </div>
      <Progress value={usagePercentage} className="h-2" />
    </div>
  );
};