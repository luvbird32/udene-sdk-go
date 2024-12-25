import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TrialAbuseHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">Trial Abuse Monitoring</h3>
      </div>
      <Badge variant="outline">Risk Analysis</Badge>
    </div>
  );
};