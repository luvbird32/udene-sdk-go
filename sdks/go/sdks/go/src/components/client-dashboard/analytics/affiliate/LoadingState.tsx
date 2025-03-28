import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Affiliate Activity Monitoring</h3>
      <div className="h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading affiliate data...</p>
        </div>
      </div>
    </Card>
  );
};