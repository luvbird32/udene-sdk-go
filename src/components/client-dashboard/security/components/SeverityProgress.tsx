/**
 * SeverityProgress Component
 * 
 * Displays a progress bar for visualizing security severity levels.
 * Shows the proportion of vulnerabilities at each severity level.
 * 
 * Features:
 * - Color-coded severity levels
 * - Percentage-based progress visualization
 * - Numerical count display
 * - Label for severity level
 * 
 * @param {Object} props
 * @param {string} props.label - The severity level label (e.g., "Critical", "High")
 * @param {number} props.count - Number of vulnerabilities at this severity level
 * @param {number} props.total - Total number of vulnerabilities
 * @param {string} props.colorClass - Tailwind CSS color class for the severity level
 * 
 * @example
 * ```tsx
 * <SeverityProgress
 *   label="Critical"
 *   count={5}
 *   total={20}
 *   colorClass="text-red-500"
 * />
 * ```
 */
import { Progress } from "@/components/ui/progress";

interface SeverityProgressProps {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}

export const SeverityProgress = ({ label, count, total, colorClass }: SeverityProgressProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <div className="flex-1">
        <Progress value={percentage} className={`h-2 ${colorClass}`} />
      </div>
      <span className="ml-2">{count}</span>
    </div>
  );
};