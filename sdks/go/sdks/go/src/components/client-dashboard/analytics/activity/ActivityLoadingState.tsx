import { Loader2 } from "lucide-react";

export const ActivityLoadingState = () => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading activity data...</p>
      </div>
    </div>
  );
};