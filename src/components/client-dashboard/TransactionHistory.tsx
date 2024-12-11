import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const TransactionHistory = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: async () => {
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
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading transactions...</p>
          ) : transactions?.length === 0 ? (
            <p className="text-center text-muted-foreground">No recent transactions</p>
          ) : (
            transactions?.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">${transaction.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(transaction.created_at), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
                <Badge 
                  variant={transaction.is_fraudulent ? "destructive" : "secondary"}
                >
                  {transaction.is_fraudulent ? "Flagged" : "Clear"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};