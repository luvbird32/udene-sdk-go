import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  isLoading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  description,
  isLoading = false
}: MetricCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24 mt-2" />
        <Skeleton className="h-8 w-16 mt-1" />
        <Skeleton className="h-4 w-32 mt-1" />
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        <Icon className="h-8 w-8 text-white/60" />
        <div>
          <h3 className="font-medium text-sm text-white/60">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
    </Card>
  );
};