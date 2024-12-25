import { AlertCircle } from "lucide-react";

export const EmptyState = () => (
  <div className="h-[300px] flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
      <p className="text-muted-foreground">No transaction data available</p>
    </div>
  </div>
);