import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { TransactionList } from "./transactions/TransactionList";

export const TransactionHistory = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading transactions...</p>
      ) : (
        <TransactionList transactions={transactions || []} />
      )}
    </Card>
  );
};