import { Progress } from "@/components/ui/progress";

interface SeverityProgressProps {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}

export const SeverityProgress = ({ label, count, total, colorClass }: SeverityProgressProps) => {
  return (
    <>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className={colorClass}>{count}</span>
      </div>
      <Progress 
        value={(count / total) * 100} 
        className={`h-2 ${colorClass.replace('text-', 'bg-')}-100`}
      >
        <div className={`h-full ${colorClass.replace('text-', 'bg-')}-500 transition-all`} />
      </Progress>
    </>
  );
};