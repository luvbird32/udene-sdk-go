import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { TransactionList } from "./TransactionList";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import { DatabaseTransaction } from "@/types/transactions";

export const TransactionHistory = () => {
  const { toast } = useToast();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  
  const fetchTransactions = useCallback(async () => {
    if (!user) {
      throw new Error("Authentication required");
    }

    console.log("Fetching recent transactions...");
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        id,
        customer_id,
        timestamp,
        location,
        device_id,
        ip_address,
        card_present,
        recurring,
        risk_score,
        is_fraudulent,
        created_at,
        updated_at,
        risk_factors,
        feature_importance,
        feedback_status,
        feedback_notes,
        appeal_timestamp,
        message_velocity,
        profile_changes,
        interaction_patterns,
        amount_encrypted,
        amount_iv,
        merchant_id_encrypted,
        merchant_id_iv,
        transaction_type_encrypted,
        transaction_type_iv
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }

    // Return the data directly since it matches our DatabaseTransaction type
    console.log("Transactions fetched:", data);
    return data as DatabaseTransaction[];
  }, [user]);

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["recent-transactions", user?.id],
    queryFn: fetchTransactions,
    enabled: !!user,
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Transaction fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load transaction history. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (userLoading) {
    return <LoadingState message="Loading user data..." />;
  }

  if (!user) {
    return <ErrorState message="Please log in to view transaction history." />;
  }

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4 text-white">Recent Transactions</h3>
        
        {isLoading && <LoadingState message="Loading transactions..." />}
        {error && <ErrorState message="Failed to load transactions. Please try again later." />}
        {!isLoading && !error && (!transactions || transactions.length === 0) && <EmptyState />}
        {!isLoading && !error && transactions && transactions.length > 0 && (
          <TransactionList 
            transactions={transactions} 
            isLoading={isLoading}
          />
        )}
      </Card>
    </ErrorBoundary>
  );
};