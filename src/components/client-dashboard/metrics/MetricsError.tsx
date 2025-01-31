import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MetricsErrorProps {
  error: Error;
}

export const MetricsError = ({ error }: MetricsErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "Failed to load metrics. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};