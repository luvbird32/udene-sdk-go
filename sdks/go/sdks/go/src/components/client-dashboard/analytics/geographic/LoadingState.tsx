import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = () => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4">Geographic Distribution</h3>
    <div className="h-[300px] flex items-center justify-center">
      <p className="text-muted-foreground">Loading distribution...</p>
    </div>
  </Card>
);