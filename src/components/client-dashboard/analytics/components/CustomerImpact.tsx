import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CustomerImpactProps {
  affectedCustomers: number;
  customerImpactRate: number;
}

export const CustomerImpact = ({ affectedCustomers, customerImpactRate }: CustomerImpactProps) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4">Customer Impact</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Affected Customers</p>
          <p className="text-2xl font-bold">{affectedCustomers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Impact Rate</p>
          <p className="text-2xl font-bold">{customerImpactRate.toFixed(1)}%</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span>Customer Impact Rate</span>
          <span>{customerImpactRate.toFixed(1)}%</span>
        </div>
        <Progress value={customerImpactRate} className="h-2" />
      </div>
    </div>
  </Card>
);