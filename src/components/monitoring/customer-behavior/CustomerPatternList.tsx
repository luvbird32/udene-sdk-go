import { Badge } from "@/components/ui/badge";
import { CustomerMetrics } from "./CustomerMetrics";
import { CustomerTransactionChart } from "./CustomerTransactionChart";
import type { CustomerPattern } from "./types";

interface CustomerPatternListProps {
  customer: CustomerPattern;
}

export const CustomerPatternList = ({ customer }: CustomerPatternListProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">Customer {customer.customerId.slice(-4)}</span>
        {customer.unusualActivity && (
          <Badge variant="destructive">Unusual Activity</Badge>
        )}
      </div>
      
      <CustomerMetrics customer={customer} />
      <CustomerTransactionChart transactions={customer.recentTransactions} />
    </div>
  );
};