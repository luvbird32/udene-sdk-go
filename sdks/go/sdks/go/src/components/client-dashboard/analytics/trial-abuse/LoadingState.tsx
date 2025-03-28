import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrialAbuseHeader } from "./TrialAbuseHeader";

export const LoadingState = () => {
  return (
    <Card className="p-4 space-y-4">
      <TrialAbuseHeader />
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full bg-white/10" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-4 w-24 bg-white/10" />
        </div>
      </div>
    </Card>
  );
};