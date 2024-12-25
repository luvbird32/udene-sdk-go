import { Progress } from "@/components/ui/progress";

interface SeverityProgressProps {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}

export const SeverityProgress = ({ label, count, total, colorClass }: SeverityProgressProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <div className="flex-1">
        <Progress value={percentage} className={`h-2 ${colorClass}`} />
      </div>
      <span className="ml-2">{count}</span>
    </div>
  );
};
