import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MetricsErrorProps {
  error: Error | null;
}

export const MetricsError = ({ error }: MetricsErrorProps) => {
  return (
    <Card className="p-6">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || "Failed to load metrics data"}
        </AlertDescription>
      </Alert>
    </Card>
  );
};