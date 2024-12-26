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
  const { data: referralStats, isLoading, error } = useQuery<ReferralStat[]>({
    queryKey: ["referral-fraud-stats"],
    queryFn: async () => {
      try {
        console.log("Fetching referral fraud statistics...");
        const { data, error } = await supabase
          .from('referral_tracking')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error("Error fetching referral tracking data:", error);
          throw error;
        }

        console.log(`Processing ${data?.length || 0} referral records`);

        const stats = (data || []).reduce<Record<string, number>>((acc, curr) => {
          const riskLevel = curr.risk_score >= 70 ? 'High' : curr.risk_score >= 40 ? 'Medium' : 'Low';
          acc[riskLevel] = (acc[riskLevel] || 0) + 1;
          return acc;
        }, {});

        console.log("Referral fraud statistics calculated successfully");

        return Object.entries(stats).map(([name, value]): ReferralStat => ({ 
          name, 
          value 
        }));
      } catch (error) {
        console.error("Error in referral fraud statistics calculation:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch referral fraud statistics:", error);
        toast({
          title: "Error",
          description: "Failed to load referral fraud data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (error) {
    return (
      <Card className="p-4">
        <ReferralHeader />
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load referral fraud data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

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
      <ReferralChart data={referralStats} />
    </Card>
  );
};