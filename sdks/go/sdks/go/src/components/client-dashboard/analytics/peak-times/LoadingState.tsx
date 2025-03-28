import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="h-[300px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading peak times...</p>
    </div>
  </div>
);