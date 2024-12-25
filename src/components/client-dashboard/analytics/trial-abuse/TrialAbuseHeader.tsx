/**
 * TrialAbuseHeader Component
 * 
 * A header component for the trial usage analysis section that displays
 * the section title and current status of active trials monitoring.
 * 
 * Features:
 * - Section title display
 * - Active trials status badge
 * - Responsive layout
 * 
 * @example
 * ```tsx
 * <TrialAbuseHeader />
 * ```
 */
import { Badge } from "@/components/ui/badge";

export const TrialAbuseHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Trial Usage Analysis</h3>
      <Badge variant="outline">Active Trials</Badge>
    </div>
  );
};