import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value?: number | string;
  icon: React.ElementType;
  showProgress?: boolean;
  isLoading?: boolean;
  suffix?: string;
}

export const MetricCard = ({ title, value, icon: Icon, showProgress, suffix = "" }: MetricCardProps) => {
  const displayValue = value !== undefined ? `${value}${suffix}` : "N/A";
  
  return (
    <Card className="p-6" role="article" aria-label={title}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Icon className="text-secondary w-5 h-5" aria-hidden="true" />
      </div>
      {showProgress ? (
        <div className="space-y-2">
          <Progress 
            value={typeof value === 'number' ? value : 0} 
            className="h-2" 
            aria-label={`${title} Progress`} 
          />
          <p className="text-2xl font-bold" aria-live="polite">{displayValue}</p>
        </div>
      ) : (
        <p className="text-2xl font-bold" aria-live="polite">{displayValue}</p>
      )}
    </Card>
  );
};