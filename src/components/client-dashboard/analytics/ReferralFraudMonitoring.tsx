/**
 * ReferralFraudMonitoring Component
 * 
 * Analyzes and visualizes referral patterns to detect potential fraud.
 * This component monitors:
 * - Referral chain patterns
 * - Risk levels of referral activities
 * - Suspicious referral behaviors
 * 
 * Key Features:
 * - Real-time monitoring of referral activities
 * - Risk level distribution visualization
 * - Pattern analysis for fraud detection
 * - Automatic risk scoring of referral chains
 * 
 * Data is refreshed every 30 seconds to maintain current insights
 * into referral fraud patterns.
 */
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReferralChart } from "./referral/ReferralChart";
import { ReferralHeader } from "./referral/ReferralHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralStat {
  name: string;
  value: number;
}

export const ReferralFraudMonitoring = () => {
  const { toast } = useToast();
  const { data: referralStats, isLoading, error } = useQuery({
    queryKey: ["referral-fraud-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referral_tracking')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce<Record<string, number>>((acc, curr) => {
        const riskLevel = curr.risk_score >= 70 ? 'High' : curr.risk_score >= 40 ? 'Medium' : 'Low';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]): ReferralStat => ({ 
        name, 
        value 
      }));
    },
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load referral fraud data",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <ReferralHeader />
        <div className="h-[200px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading referral data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load referral fraud data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!referralStats || referralStats.length === 0) {
    return (
      <Card className="p-4">
        <ReferralHeader />
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No referral data available</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ReferralHeader />
      <ReferralChart data={referralStats || []} />
    </Card>
  );
};