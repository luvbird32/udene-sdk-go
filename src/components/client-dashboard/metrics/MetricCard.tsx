
/**
 * MetricCard Component
 * 
 * A reusable card component that displays metric information with optional loading states.
 * Supports displaying icons, values, and descriptions in a consistent layout.
 * 
 * Features:
 * - Responsive design that adapts to container width
 * - Loading state with skeleton placeholder animation
 * - Icon integration using Lucide icons
 * - Consistent styling with white text on card background
 * 
 * @example
 * ```tsx
 * <MetricCard
 *   title="Risk Score"
 *   value="85%"
 *   icon={Shield}
 *   description="Current risk assessment"
 *   isLoading={false}
 * />
 * ```
 */

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Props interface for the MetricCard component
 * @property {string} title - The title/label of the metric
 * @property {string | number} value - The actual value to display
 * @property {LucideIcon} icon - Lucide icon component to display
 * @property {string} description - Additional context about the metric
 * @property {boolean} isLoading - Optional flag to show loading state
 */
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  isLoading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  description,
  isLoading = false
}: MetricCardProps) => {
  // Display skeleton loading state when data is being fetched
  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24 mt-2" />
        <Skeleton className="h-8 w-16 mt-1" />
        <Skeleton className="h-4 w-32 mt-1" />
      </Card>
    );
  }

  // Render metric card with actual data
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        {/* Icon container with consistent sizing */}
        <Icon className="h-8 w-8 text-white" />
        <div>
          {/* Metric information layout */}
          <h3 className="font-medium text-sm text-white">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
    </Card>
  );
};
