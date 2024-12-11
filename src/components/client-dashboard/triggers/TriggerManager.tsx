import { TriggerForm } from "./TriggerForm";
import { TriggerList } from "./TriggerList";

export const TriggerManager = () => {
  return (
    <div className="space-y-6">
      <TriggerForm />
      <TriggerList />
    </div>
  );
};