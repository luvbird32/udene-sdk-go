import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { DatabaseTransaction, InteractionPatterns, RiskFactors } from "@/types/risk";
import { useToast } from "@/hooks/use-toast";

export const CustomerBehavior = () => {
  const { toast } = useToast();

  const { data: behaviorMetrics } = useQuery({
    queryKey: ["customer-behavior"],
    queryFn: async () => {
      console.log("Analyzing customer behavior...");
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Process transactions for behavior analysis
      const customerPatterns: Record<string, any> = {};
      
      // First pass: Initialize customer data
      for (const transaction of (transactions as DatabaseTransaction[])) {
        const customerId = transaction.customer_id;
        if (!customerPatterns[customerId]) {
          customerPatterns[customerId] = {
            transactions: [],
            devices: new Set(),
            locations: new Set(),
            totalAmount: 0
          };
        }
      }

      // Second pass: Process transactions with decryption
      for (const transaction of (transactions as DatabaseTransaction[])) {
        const customerId = transaction.customer_id;
        
        // Decrypt amount if available
        let decryptedAmount = 0;
        if (transaction.amount_encrypted && transaction.amount_iv) {
          try {
            const { data, error } = await supabase.rpc('decrypt_sensitive_data', {
              encrypted_data: transaction.amount_encrypted,
              iv: transaction.amount_iv
            });
            if (error) throw error;
            decryptedAmount = Number(data);
          } catch (error) {
            console.error("Error decrypting amount:", error);
            toast({
              title: "Error",
              description: "Could not decrypt transaction amount",
              variant: "destructive",
            });
          }
        }

        customerPatterns[customerId].transactions.push({
          amount: decryptedAmount,
          timestamp: transaction.timestamp,
          deviceId: transaction.device_id,
          location: transaction.location
        });

        customerPatterns[customerId].devices.add(transaction.device_id);
        customerPatterns[customerId].locations.add(transaction.location);
        customerPatterns[customerId].totalAmount += decryptedAmount;
      }

      // Calculate velocity and pattern changes
      const patterns = Object.entries(customerPatterns).map(([customerId, data]: [string, any]) => {
        const transactions = data.transactions;
        const deviceCount = data.devices.size;
        const locationCount = data.locations.size;
        
        // Calculate transaction velocity (transactions per hour)
        const timeRange = transactions.length > 1 
          ? (new Date(transactions[transactions.length - 1].timestamp).getTime() - 
             new Date(transactions[0].timestamp).getTime()) / (1000 * 60 * 60)
          : 1;
        
        const velocity = transactions.length / timeRange;

        // Detect unusual patterns
        const avgAmount = data.totalAmount / transactions.length;
        const unusualActivity = deviceCount > 3 || locationCount > 3 || velocity > 5;

        return {
          customerId,
          velocity: Number(velocity.toFixed(2)),
          deviceCount,
          locationCount,
          avgAmount: Number(avgAmount.toFixed(2)),
          unusualActivity,
          recentTransactions: transactions.slice(-5)
        };
      });

      return patterns.sort((a, b) => b.velocity - a.velocity);
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Customer Behavior Analysis</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-6">
          {behaviorMetrics?.map((customer) => (
            <div key={customer.customerId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Customer {customer.customerId.slice(-4)}</span>
                {customer.unusualActivity && (
                  <Badge variant="destructive">Unusual Activity</Badge>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Velocity</p>
                  <p>{customer.velocity} tx/hour</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Devices</p>
                  <p>{customer.deviceCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Locations</p>
                  <p>{customer.locationCount}</p>
                </div>
              </div>

              <div className="h-[100px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customer.recentTransactions}>
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
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};