import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { TransactionList } from "./transactions/TransactionList";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCallback } from "react";

export const TransactionHistory = () => {
  const fetchTransactions = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  }, []);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: fetchTransactions,
    refetchInterval: 30000,
  });

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <TransactionList 
          transactions={transactions || []} 
          isLoading={isLoading}
        />
      </Card>
    </ErrorBoundary>
  );
};