import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ReferralHeader } from "./ReferralHeader";

export const ReferralErrorState = () => {
  return (
    <Card className="p-4">
      <ReferralHeader />
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load referral fraud data. Please try again later.
        </AlertDescription>
      </Alert>
    </Card>
  );
};