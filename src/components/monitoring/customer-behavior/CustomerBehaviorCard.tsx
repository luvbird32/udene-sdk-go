import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomerPatternList } from "./CustomerPatternList";
import { useCustomerBehaviorData } from "./useCustomerBehaviorData";

export const CustomerBehaviorCard = () => {
  const { data: behaviorMetrics } = useCustomerBehaviorData();

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Customer Behavior Analysis</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-6">
          {behaviorMetrics?.map((customer) => (
            <CustomerPatternList key={customer.customerId} customer={customer} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};