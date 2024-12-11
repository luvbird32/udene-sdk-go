import { Card } from "@/components/ui/card";

export const DatabaseSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Database Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border border-green-500/20">
          <p>Database Health</p>
        </Card>
        <Card className="p-4 border border-green-500/20">
          <p>Query Performance</p>
        </Card>
      </div>
    </div>
  );
};