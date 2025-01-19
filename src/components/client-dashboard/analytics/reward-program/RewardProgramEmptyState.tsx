import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

export const RewardProgramEmptyState = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-white" />
          <h3 className="font-semibold text-white">Reward Program Protection</h3>
        </div>
        <Badge variant="outline">No Data Available</Badge>
      </div>
      <div className="h-[200px] flex items-center justify-center text-white/60">
        No reward program data available
      </div>
    </Card>
  );
};