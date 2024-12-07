import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

export const DetectionMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["detection-metrics"],
    queryFn: async () => {
      console.log("Fetching detection metrics...");
      
      // Get transactions with confirmed fraud status
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .not('is_fraudulent', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      const total = transactions?.length || 0;
      if (total === 0) return null;

      // Calculate metrics
      const truePositives = transactions?.filter(t => t.risk_score >= 70 && t.is_fraudulent).length || 0;
      const falsePositives = transactions?.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length || 0;
      const trueNegatives = transactions?.filter(t => t.risk_score < 70 && !t.is_fraudulent).length || 0;
      const falseNegatives = transactions?.filter(t => t.risk_score < 70 && t.is_fraudulent).length || 0;

      // Calculate rates
      const accuracy = ((truePositives + trueNegatives) / total) * 100;
      const precision = truePositives / (truePositives + falsePositives) * 100;
      const recall = truePositives / (truePositives + falseNegatives) * 100;
      const falsePositiveRate = (falsePositives / (falsePositives + trueNegatives)) * 100;

      return {
        accuracy,
        precision,
        recall,
        falsePositiveRate,
        total,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading || !metrics) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Detection Performance</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Accuracy</span>
            <span>{metrics.accuracy.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.accuracy} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Precision</span>
            <span>{metrics.precision.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.precision} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Recall</span>
            <span>{metrics.recall.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.recall} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-red-500">
            <span>False Positive Rate</span>
            <span>{metrics.falsePositiveRate.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.falsePositiveRate} className="h-2 bg-red-100">
            <div className="h-full bg-red-500 transition-all" style={{ width: `${metrics.falsePositiveRate}%` }} />
          </Progress>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Based on {metrics.total} verified transactions
        </div>
      </div>
    </Card>
  );
};