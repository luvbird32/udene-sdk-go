import { Card } from "@/components/ui/card";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";

export const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Client Analytics</h2>
        <ClientAnalytics />
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Usage Analytics</h2>
        <UsageAnalytics />
      </Card>
    </div>
  );
};