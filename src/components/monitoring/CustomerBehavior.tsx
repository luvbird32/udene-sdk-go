import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { DatabaseTransaction, InteractionPatterns, RiskFactors } from "@/types/risk";

export const CustomerBehavior = () => {
  const { data: behaviorMetrics } = useQuery({
    queryKey: ["customer-behavior"],
    queryFn: async () => {
      console.log("Analyzing customer behavior...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('customer_id', user.id)
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Process transactions for behavior analysis
      const patterns = transactions?.reduce((acc: any, transaction: DatabaseTransaction) => {
        const timestamp = transaction.timestamp;
        if (!acc.transactions) {
          acc.transactions = [];
          acc.devices = new Set();
          acc.locations = new Set();
          acc.totalAmount = 0;
        }

        acc.transactions.push({
          amount: transaction.amount,
          timestamp: transaction.timestamp,
          deviceId: transaction.device_id,
          location: transaction.location
        });

        acc.devices.add(transaction.device_id);
        acc.locations.add(transaction.location);
        acc.totalAmount += Number(transaction.amount);

        return acc;
      }, {});

      if (!patterns) return null;

      // Calculate velocity and pattern changes
      const timeRange = patterns.transactions.length > 1 
        ? (new Date(patterns.transactions[patterns.transactions.length - 1].timestamp).getTime() - 
           new Date(patterns.transactions[0].timestamp).getTime()) / (1000 * 60 * 60)
        : 1;
      
      const velocity = patterns.transactions.length / timeRange;
      const avgAmount = patterns.totalAmount / patterns.transactions.length;
      const unusualActivity = patterns.devices.size > 3 || patterns.locations.size > 3 || velocity > 5;

      return {
        velocity: Number(velocity.toFixed(2)),
        deviceCount: patterns.devices.size,
        locationCount: patterns.locations.size,
        avgAmount: Number(avgAmount.toFixed(2)),
        unusualActivity,
        recentTransactions: patterns.transactions.slice(-5)
      };
    },
    refetchInterval: 30000,
  });

  if (!behaviorMetrics) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Account Activity Analysis</h3>
        <p className="text-sm text-muted-foreground text-center py-4">
          No activity data available
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Account Activity Analysis</h3>
        {behaviorMetrics.unusualActivity && (
          <Badge variant="destructive">Unusual Activity Detected</Badge>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <p className="text-muted-foreground">Transaction Rate</p>
          <p>{behaviorMetrics.velocity} tx/hour</p>
        </div>
        <div>
          <p className="text-muted-foreground">Devices Used</p>
          <p>{behaviorMetrics.deviceCount}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Locations</p>
          <p>{behaviorMetrics.locationCount}</p>
        </div>
      </div>

      <div className="h-[100px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={behaviorMetrics.recentTransactions}>
            <XAxis 
              dataKey="timestamp" 
              tick={false}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8884d8" 
              name="Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};