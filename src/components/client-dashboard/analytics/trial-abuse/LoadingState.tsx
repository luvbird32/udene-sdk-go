import { Card } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Trial Usage Analysis</h3>
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading trial data...</p>
      </div>
    </Card>
  );
};