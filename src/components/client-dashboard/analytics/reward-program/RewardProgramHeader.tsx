import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

export const RewardProgramHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Reward Program Protection</h3>
      </div>
      <Badge variant="outline">Last 100 Transactions</Badge>
    </div>
  );
};