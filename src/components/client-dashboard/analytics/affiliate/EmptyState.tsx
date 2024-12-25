import { Card } from "@/components/ui/card";

export const EmptyState = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Affiliate Activity Monitoring</h3>
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">No affiliate activity data available.</p>
      </div>
    </Card>
  );
};