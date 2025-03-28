import { Card } from "@/components/ui/card";
import { HeartCrack } from "lucide-react";

export const LoadingState = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <HeartCrack className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">Romance Scam Analysis</h3>
      </div>
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading analysis...</p>
      </div>
    </Card>
  );
};