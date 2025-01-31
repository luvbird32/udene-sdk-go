import { Shield } from "lucide-react";
import { MetricCard } from "./MetricCard";

export const LoadingMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[...Array(5)].map((_, i) => (
        <MetricCard
          key={i}
          title=""
          value=""
          icon={Shield}
          description=""
          isLoading={true}
        />
      ))}
    </div>
  );
};