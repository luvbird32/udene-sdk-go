/**
 * LoadingProgram Component
 * 
 * A loading state component displayed while security program data is being fetched.
 * Shows a spinning loader animation within a card container to indicate ongoing data retrieval.
 * 
 * Features:
 * - Centered spinning loader animation
 * - Consistent card styling with main content
 * - Accessible loading indicator
 * 
 * @component
 * @example
 * ```tsx
 * // Show loading state while fetching security programs
 * if (isLoading) {
 *   return <LoadingProgram />;
 * }
 * ```
 */
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingProgram = () => {
  return (
    <Card className="p-6 flex justify-center items-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </Card>
  );
};