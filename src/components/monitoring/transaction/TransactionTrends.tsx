import { Card } from "@/components/ui/card";
import { TransactionTrendsChart } from "./TransactionTrendsChart";

export const TransactionTrends = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Hourly Transaction Trends</h3>
      <TransactionTrendsChart />
    </Card>
  );
};