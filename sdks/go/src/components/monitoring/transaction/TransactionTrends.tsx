import { Card } from "@/components/ui/card";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
import { TransactionChart } from "./components/TransactionChart";
import { TransactionHeader } from "./components/TransactionHeader";
import { useTransactionTrends } from "./hooks/useTransactionTrends";

export const TransactionTrends = () => {
  const { data: trends, isLoading, error } = useTransactionTrends();

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoadingState message="Loading transaction trends..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <ErrorState error={error} />
      </Card>
    );
  }

  if (!trends?.length) {
    return (
      <Card className="p-6">
        <EmptyState 
          title="No transaction data"
          message="There are no transactions to display at this time."
        />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <TransactionHeader />
      <TransactionChart data={trends} />
    </Card>
  );
};