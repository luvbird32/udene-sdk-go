import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingState = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </Card>
  );
};