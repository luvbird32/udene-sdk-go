import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
}

export const LoadingState = ({ title = "Loading data..." }: LoadingStateProps) => {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};