import { TriggerForm } from "./TriggerForm";
import { TriggerList } from "./TriggerList";

/**
 * TriggerManager Component
 * 
 * Manages event triggers for automated responses to security and fraud events.
 * Allows creation, configuration, and monitoring of event triggers.
 * 
 * Features:
 * - Create new triggers
 * - Configure trigger conditions
 * - Set trigger actions
 * - Monitor trigger status
 * - View trigger history
 * 
 * @component
 * @example
 * ```tsx
 * <TriggerManager />
 * ```
 */
export const TriggerManager = () => {
  return (
    <div className="space-y-6">
      <TriggerForm />
      <TriggerList />
    </div>
  );
};
