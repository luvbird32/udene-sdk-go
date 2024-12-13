import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TransactionItemProps {
  transaction: {
    id: string;
    amount: number;
    created_at: string;
    is_fraudulent: boolean;
  };
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
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
  );
};