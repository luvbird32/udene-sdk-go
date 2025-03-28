/**
 * SeverityProgress Component
 * 
 * Displays a progress bar for a specific severity level of vulnerabilities,
 * showing both the count and percentage of total vulnerabilities.
 * 
 * Features:
 * - Visual progress indicator
 * - Color-coded severity levels
 * - Percentage calculation
 * - Responsive design
 * 
 * @param {Object} props
 * @param {string} props.label - The severity level label (e.g., "Critical", "High")
 * @param {number} props.count - Number of vulnerabilities at this severity level
 * @param {number} props.total - Total number of vulnerabilities across all severities
 * @param {string} props.colorClass - Tailwind CSS color class for the severity level
 */
import { Progress } from "@/components/ui/progress";

interface SeverityProgressProps {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}

export const SeverityProgress = ({ 
  label, 
  count, 
  total, 
  colorClass 
}: SeverityProgressProps) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={colorClass}>{label}</span>
        <span className="text-muted-foreground">
          {count} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className={`h-2 ${colorClass}`} />
    </div>
  );
};