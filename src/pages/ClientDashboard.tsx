import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import { TransactionHistory } from "@/components/client-dashboard/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";
import { useToast } from "@/components/ui/use-toast";
import { Settings, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      const { data: recentTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(100);

      if (transactionsError) throw transactionsError;

      // Calculate average risk score
      const validTransactions = recentTransactions?.filter(t => t?.risk_score != null) ?? [];
      const avgRiskScore = validTransactions.length > 0
        ? validTransactions.reduce((acc, t) => acc + (t.risk_score ?? 0), 0) / validTransactions.length
        : 0;

      return {
        riskScore: Math.round(avgRiskScore),
        totalTransactions: validTransactions.length,
        flaggedTransactions: validTransactions.filter(t => t.is_fraudulent).length
      };
    },
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              to="/dashboard" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Admin</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
        </div>
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="space-y-6">
        <ClientMetrics 
          metrics={metrics}
          isLoading={metricsLoading}
          error={metricsError}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionHistory />
          <RiskOverview />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;