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

export const TransactionHistory = () => {
  const { toast } = useToast();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  
  const fetchTransactions = useCallback(async () => {
    if (!user) {
      throw new Error("Authentication required");
    }

    console.log("Fetching transactions for user:", user.id);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', user.id.toString()) // Cast user.id to string to match the customer_id format
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }

    console.log("Transactions fetched:", data);
    return data;
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
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        
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