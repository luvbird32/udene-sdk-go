import { TriggerItem } from "./components/TriggerItem";
import { TriggerLoading } from "./components/TriggerLoading";
import { EmptyTriggerState } from "./components/EmptyTriggerState";
import { TriggerListHeader } from "./components/TriggerListHeader";
import { useTriggerData } from "./hooks/useTriggerData";
import { useTriggerOperations } from "./hooks/useTriggerOperations";
import { Card } from "@/components/ui/card";

export const TriggerList = () => {
  const { data: triggers, isLoading } = useTriggerData();
  const { deleteTrigger, toggleTrigger } = useTriggerOperations();

  if (isLoading) {
    return <TriggerLoading />;
  }

  if (!triggers || triggers.length === 0) {
    return <EmptyTriggerState />;
  }

  return (
    <Card className="p-6">
      <TriggerListHeader />
      <div className="space-y-4">
        {triggers.map((trigger) => (
          <TriggerItem
            key={trigger.id}
            trigger={trigger}
            onDelete={deleteTrigger}
            onToggle={(id, isActive) => toggleTrigger({ id, isActive })}
          />
        ))}
      </div>
    </Card>
  );
};