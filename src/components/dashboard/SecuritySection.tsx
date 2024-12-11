import { Card } from "@/components/ui/card";

export const SecuritySection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Security Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border border-green-500/20">
          <p>Active Security Protocols</p>
        </Card>
        <Card className="p-4 border border-green-500/20">
          <p>Threat Detection</p>
        </Card>
      </div>
    </div>
  );
};