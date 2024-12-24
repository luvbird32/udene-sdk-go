import { Badge } from "@/components/ui/badge";

interface ComplianceRequirementsProps {
  requirements: string[];
}

export const ComplianceRequirements = ({ requirements }: ComplianceRequirementsProps) => {
  if (!Array.isArray(requirements) || requirements.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Compliance Requirements</h4>
      <div className="flex flex-wrap gap-2">
        {requirements.map((req: string, index: number) => (
          <Badge key={index} variant="outline">{req}</Badge>
        ))}
      </div>
    </div>
  );
};