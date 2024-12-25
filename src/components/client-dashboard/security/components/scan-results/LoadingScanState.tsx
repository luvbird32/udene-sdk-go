import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

export const LoadingScanState = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Open Source Security</h3>
      </div>
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading scan results...</p>
      </div>
    </Card>
  );
};