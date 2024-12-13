import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  transactions: Array<{
    id: string;
    amount: number;
    created_at: string;
    is_fraudulent: boolean;
  }>;
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No recent transactions</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </ScrollArea>
  );
};