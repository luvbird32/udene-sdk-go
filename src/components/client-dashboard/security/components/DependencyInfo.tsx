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