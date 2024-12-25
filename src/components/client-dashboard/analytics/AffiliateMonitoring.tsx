/**
 * AffiliateMonitoring Component
 * 
 * Monitors and analyzes affiliate activity for potential fraud patterns.
 * This component visualizes two key metrics:
 * 1. Risk Score: Calculated based on multiple factors including:
 *    - Velocity of referrals
 *    - Geographic distribution of referred users
 *    - Time patterns of referral activities
 *    - Historical fraud indicators
 * 
 * 2. Transaction Amount: Tracks the monetary value of affiliate-driven transactions
 *    to identify unusual patterns such as:
 *    - Sudden spikes in transaction values
 *    - Consistent small transactions that might indicate automated fraud
 *    - Unusual time-based patterns
 * 
 * The data is refreshed every 30 seconds to provide near real-time monitoring
 * of affiliate activities and early fraud detection.
 */
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";

export const AffiliateMonitoring = () => {
  const { toast } = useToast();

  const { data: affiliateStats, isLoading, error } = useQuery({
    queryKey: ["affiliate-fraud-stats"],
    queryFn: async () => {
      console.log("Fetching affiliate monitoring data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('affiliate_activities')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error fetching affiliate data:", error);
        throw error;
      }

      console.log("Affiliate data fetched:", data);
      return data?.map(activity => ({
        date: new Date(activity.created_at).toLocaleDateString(),
        riskScore: activity.risk_score || 0,
        amount: activity.transaction_amount || 0
      }));
    },
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load affiliate monitoring data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Affiliate Activity Monitoring</h3>
          <Badge variant="outline">Risk Trends</Badge>
        </div>

        {isLoading && (
          <div className="h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading affiliate data...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load affiliate monitoring data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (!affiliateStats || affiliateStats.length === 0) && (
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No affiliate activity data available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Activity data will appear here once affiliates start generating traffic.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && affiliateStats && affiliateStats.length > 0 && (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={affiliateStats}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="riskScore" 
                  stroke="#8884d8" 
                  name="Risk Score" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#82ca9d" 
                  name="Transaction Amount" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </ErrorBoundary>
  );
};