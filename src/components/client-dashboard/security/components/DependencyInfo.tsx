/**
 * @component DependencyInfo
 * @description Displays information about scanned dependencies in the security dashboard.
 * Shows the total number of dependencies that have been analyzed for security vulnerabilities.
 * Uses the Shield icon to represent security scanning status.
 * 
 * @param {Object} props - Component props
 * @param {number} props.dependenciesScanned - The total number of dependencies that have been scanned
 * 
 * @example
 * ```tsx
 * <DependencyInfo dependenciesScanned={156} />
 * ```
 */
import { Shield } from "lucide-react";

interface DependencyInfoProps {
  dependenciesScanned: number;
}

export const DependencyInfo = ({ dependenciesScanned }: DependencyInfoProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Shield className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">Dependencies Scanned</span>
    </div>
    <span className="font-medium">{dependenciesScanned}</span>
  </div>
);