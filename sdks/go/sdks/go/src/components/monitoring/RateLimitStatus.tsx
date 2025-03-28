import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle } from "lucide-react";
import { MetricCard } from "@/components/client-dashboard/metrics/MetricCard";

export const RateLimitStatus = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["rate-limits"],
    queryFn: async () => {
      const { data: rateLimits, error } = await supabase
        .from("rate_limits")
        .select("*")
        .order("last_request_time", { ascending: false })
        .limit(1);

      if (error) throw error;
      return rateLimits?.[0];
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const usagePercentage = data ? (data.request_count / 100) * 100 : 0; // Assuming max limit is 100
  const isNearLimit = usagePercentage > 80;
  const isOverLimit = usagePercentage >= 100;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rate Limit Status</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard
          title="Current Usage"
          value={`${data?.request_count || 0} requests`}
          icon={isOverLimit ? AlertCircle : CheckCircle}
          description={`${Math.min(usagePercentage, 100).toFixed(1)}% of limit used`}
          isLoading={isLoading}
        />
        
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Usage</span>
              <span className="font-medium">{usagePercentage.toFixed(1)}%</span>
            </div>
            <Progress 
              value={usagePercentage} 
              className={`${
                isOverLimit 
                  ? "bg-red-200" 
                  : isNearLimit 
                    ? "bg-yellow-200" 
                    : "bg-green-200"
              }`}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Last request: {data?.last_request_time 
              ? new Date(data.last_request_time).toLocaleTimeString() 
              : 'N/A'}
          </p>
        </Card>
      </div>
    </div>
  );
};