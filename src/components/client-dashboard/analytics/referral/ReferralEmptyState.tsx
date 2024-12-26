import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { ReferralHeader } from "./ReferralHeader";

export const ReferralEmptyState = () => {
  return (
    <Card className="p-4">
      <ReferralHeader />
      <div className="h-[200px] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No referral data available</p>
        </div>
      </div>
    </Card>
  );
};