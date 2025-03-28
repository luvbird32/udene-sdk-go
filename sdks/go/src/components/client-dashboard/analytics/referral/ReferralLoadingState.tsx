import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ReferralHeader } from "./ReferralHeader";

export const ReferralLoadingState = () => {
  return (
    <Card className="p-4">
      <ReferralHeader />
      <div className="h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading referral data...</p>
        </div>
      </div>
    </Card>
  );
};