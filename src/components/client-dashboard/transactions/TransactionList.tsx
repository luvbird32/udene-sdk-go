import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionItem } from "./TransactionItem";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionListProps {
  transactions: Array<{
    id: string;
    amount: number;
    created_at: string;
    is_fraudulent: boolean;
  }>;
  isLoading?: boolean;
}

export const TransactionList = ({ transactions, isLoading }: TransactionListProps) => {
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[68px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {sortedTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No recent transactions</p>
        ) : (
          sortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </ScrollArea>
  );
};