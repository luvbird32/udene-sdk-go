/**
 * EmptyProgramState Component
 * 
 * Displays a fallback message when no security programs are found.
 * This component provides visual feedback to users when the security program list is empty,
 * helping maintain a good user experience even in zero-state scenarios.
 * 
 * @component
 * @example
 * ```tsx
 * // Inside SecurityProgramList.tsx
 * {(!programs || programs.length === 0) && <EmptyProgramState />}
 * ```
 */
import { Card } from "@/components/ui/card";

export const EmptyProgramState = () => {
  return (
    <Card className="p-6 text-center text-white/60">
      No security programs found.
    </Card>
  );
};