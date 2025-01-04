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

    console.log("Fetching client transactions...");
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', user.id)  // Filter by the current user's ID
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching client transactions:", error);
      throw error;
    }

    console.log("Client transactions fetched:", data);
    return data;
  }, [user]);

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["client-transactions", user?.id],
    queryFn: fetchTransactions,
    enabled: !!user,
    refetchInterval: 30000,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Client transaction fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load your transaction history. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (userLoading) {
    return <LoadingState message="Loading your data..." />;
  }

  if (!user) {
    return <ErrorState message="Please log in to view your transaction history." />;
  }

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Your Recent Transactions</h3>
        
        {isLoading && <LoadingState message="Loading your transactions..." />}
        {error && <ErrorState message="Failed to load your transactions. Please try again later." />}
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