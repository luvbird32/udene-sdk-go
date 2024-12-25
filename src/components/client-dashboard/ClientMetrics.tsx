import { Card } from "@/components/ui/card";
import { Shield, Activity, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description: string;
  isLoading?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, description, isLoading }: MetricCardProps) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-24 mt-2" />
        ) : (
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        )}
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  </Card>
);

export const ClientMetrics = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Get recent transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false });

      if (!transactions) return null;

      // Calculate metrics from real transaction data
      const totalTransactions = transactions.length;
      const flaggedTransactions = transactions.filter(t => t.is_fraudulent).length;
      const averageRiskScore = transactions.reduce((acc, t) => acc + (t.risk_score || 0), 0) / totalTransactions;

      return {
        riskScore: Math.round(averageRiskScore),
        totalTransactions,
        flaggedTransactions
      };
    },
    refetchInterval: 30000,
  });

  if (error) {
    return (
      <Card className="p-6 border-destructive">
        <p className="text-destructive">Error loading metrics: {error.message}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={metrics?.riskScore ?? 0}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Transactions"
        value={metrics?.totalTransactions ?? 0}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoading}
      />
      <MetricCard
        title="Flagged Transactions"
        value={metrics?.flaggedTransactions ?? 0}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoading}
      />
    </div>
  );
};