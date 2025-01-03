import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({ 
  title = "No data available", 
  message = "There is no data to display at this time."
}: EmptyStateProps) => {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground font-medium">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {message}
        </p>
      </div>
    </div>
  );
};