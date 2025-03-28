import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { TrialAbuseHeader } from "./TrialAbuseHeader";

export const EmptyState = () => {
  return (
    <Card className="p-4">
      <TrialAbuseHeader />
      <div className="h-[200px] flex flex-col items-center justify-center text-center space-y-3">
        <Shield className="h-12 w-12 text-white/60" />
        <p className="text-white/60">No trial usage data available</p>
      </div>
    </Card>
  );
};