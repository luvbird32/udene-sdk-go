/**
 * @component EmptyProgramState
 * @description A component that displays a message when no security programs are found.
 * This is shown as a fallback state in the SecurityProgramList when there are no
 * active security programs to display.
 *
 * @example
 * ```tsx
 * // Inside SecurityProgramList.tsx
 * {(!programs || programs.length === 0) && <EmptyProgramState />}
 * ```
 */
import { Card } from "@/components/ui/card";

export const EmptyProgramState = () => {
  return (
    <Card className="p-6 text-center text-muted-foreground">
      No security programs found.
    </Card>
  );
};