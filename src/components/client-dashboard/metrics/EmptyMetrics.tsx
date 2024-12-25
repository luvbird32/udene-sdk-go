import { Alert, AlertDescription } from "@/components/ui/alert";

export const EmptyMetrics = () => (
  <Alert>
    <AlertDescription>
      No metrics data available. Start processing transactions to see your metrics.
    </AlertDescription>
  </Alert>
);