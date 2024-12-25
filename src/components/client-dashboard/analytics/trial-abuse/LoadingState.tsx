import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrialAbuseHeader } from "./TrialAbuseHeader";

export const LoadingState = () => {
  return (
    <Card className="p-4 space-y-4">
      <TrialAbuseHeader />
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
};