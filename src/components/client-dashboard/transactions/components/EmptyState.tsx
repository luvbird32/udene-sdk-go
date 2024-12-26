import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card className="p-6">
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    </Card>
  );
};