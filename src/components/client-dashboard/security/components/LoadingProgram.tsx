import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingProgram = () => {
  return (
    <Card className="p-6 flex justify-center items-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </Card>
  );
};