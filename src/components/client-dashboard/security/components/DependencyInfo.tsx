/**
 * DependencyInfo Component
 * 
 * Displays information about scanned dependencies in the security dashboard.
 * Shows the total number of dependencies that have been analyzed for security
 * vulnerabilities. Uses the Shield icon to represent security scanning status.
 * 
 * Features:
 * - Total dependencies count
 * - Visual security indicator
 * - Clean and minimal design
 * 
 * @component
 * @example
 * ```tsx
 * <DependencyInfo dependenciesScanned={156} />
 * ```
 */
import { Shield } from "lucide-react";

interface DependencyInfoProps {
  /** The total number of dependencies that have been scanned */
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