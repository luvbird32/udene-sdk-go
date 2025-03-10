
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { CustomerPattern } from "./types";
import type { DatabaseTransaction } from "@/types/transactions";

/**
 * Custom hook to fetch and analyze customer behavior data
 * This hook processes transaction data to identify patterns in customer behavior
 * @returns Query result with customer behavior patterns
 */
export const useCustomerBehaviorData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["customer-behavior"],
    queryFn: async () => {
      console.log("Analyzing customer behavior...");
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Store patterns by customer ID
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

      // Calculate metrics for each customer
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

      // Sort by velocity (highest first) to prioritize high-activity customers
      return patterns.sort((a, b) => b.velocity - a.velocity);
    },
    refetchInterval: 30000, // Refresh data every 30 seconds
  });
};
