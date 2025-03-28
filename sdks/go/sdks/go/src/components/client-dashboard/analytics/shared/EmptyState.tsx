import { AlertCircle } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No risk data available</p>
        <p className="text-sm text-muted-foreground mt-1">
          Risk data will appear here once transactions are processed.
        </p>
      </div>
    </div>
  );
};