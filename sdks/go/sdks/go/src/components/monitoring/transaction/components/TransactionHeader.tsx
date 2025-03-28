import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TransactionHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Transaction Trends</h2>
      </div>
      <Badge variant="outline">Last 100 Transactions</Badge>
    </div>
  );
};