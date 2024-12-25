/**
 * TransactionItem Component
 * 
 * Renders an individual transaction item with amount, timestamp, and fraud status.
 * Uses memoization to optimize rendering performance.
 * 
 * Features:
 * - Formatted amount display
 * - Formatted timestamp
 * - Visual fraud status indicator
 * - Memoized rendering
 * 
 * @component
 * @example
 * ```tsx
 * const transaction = {
 *   id: '1',
 *   amount: 100,
 *   created_at: '2024-03-01T12:00:00Z',
 *   is_fraudulent: false
 * };
 * 
 * <TransactionItem transaction={transaction} />
 * ```
 */
import { memo } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TransactionItemProps {
  /** Transaction data to display */
  transaction: {
    id: string;
    amount: number;
    created_at: string;
    is_fraudulent: boolean;
  };
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
}, (prevProps, nextProps) => {
  return (
    prevProps.transaction.id === nextProps.transaction.id &&
    prevProps.transaction.amount === nextProps.transaction.amount &&
    prevProps.transaction.is_fraudulent === nextProps.transaction.is_fraudulent
  );
});