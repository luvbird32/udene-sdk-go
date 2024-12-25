import { Badge } from "@/components/ui/badge";

export const TrialAbuseHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Trial Usage Analysis</h3>
      <Badge variant="outline">Active Trials</Badge>
    </div>
  );
};