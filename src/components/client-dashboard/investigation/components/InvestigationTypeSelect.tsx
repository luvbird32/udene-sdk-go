import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvestigationTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const InvestigationTypeSelect = ({ value, onValueChange }: InvestigationTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Investigation Type</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="security">Security Investigation</SelectItem>
          <SelectItem value="fraud">Fraud Investigation</SelectItem>
          <SelectItem value="compliance">Compliance Review</SelectItem>
          <SelectItem value="performance">Performance Analysis</SelectItem>
          <SelectItem value="incident">Incident Response</SelectItem>
          <SelectItem value="audit">Security Audit</SelectItem>
          <SelectItem value="threat">Threat Assessment</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};