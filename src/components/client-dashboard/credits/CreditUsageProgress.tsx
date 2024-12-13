import { Progress } from "@/components/ui/progress";

interface CreditUsageProgressProps {
  usedCredits: number;
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