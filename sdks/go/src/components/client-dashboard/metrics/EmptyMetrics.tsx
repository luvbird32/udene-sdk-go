import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const EmptyMetrics = () => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <AlertCircle className="h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold">No Metrics Available</h3>
        <p className="text-sm text-muted-foreground">
          No metrics data is currently available. Check back later.
        </p>
      </div>
    </Card>
  );
};