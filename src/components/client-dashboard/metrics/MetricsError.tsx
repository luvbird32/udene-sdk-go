import { Alert, AlertDescription } from "@/components/ui/alert";

interface MetricsErrorProps {
  error: Error | null;
}

export const MetricsError = ({ error }: MetricsErrorProps) => (
  <Alert variant="destructive">
    <AlertDescription>
      Error loading metrics: {error?.message}
    </AlertDescription>
  </Alert>
);