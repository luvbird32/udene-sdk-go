import { memo } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DatabaseTransaction } from "@/types/transactions";

interface TransactionItemProps {
  transaction: DatabaseTransaction;
}

export const TransactionItem = memo(function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
    >
      <div>
        <p className="font-medium">${transaction.amount}</p>
        <p className="text-sm text-muted-foreground">
          {transaction.created_at 
            ? format(new Date(transaction.created_at), 'MMM d, yyyy HH:mm') 
            : 'Unknown date'}
        </p>
      </div>
      <Badge 
        variant={transaction.is_fraudulent ? "destructive" : "secondary"}
      >
        {transaction.is_fraudulent ? "Flagged" : "Clear"}
      </Badge>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.transaction.id === nextProps.transaction.id &&
    prevProps.transaction.amount === nextProps.transaction.amount &&
    prevProps.transaction.is_fraudulent === nextProps.transaction.is_fraudulent
  );
});