/**
 * InvestigationTypeSelect Component
 * 
 * A select input component for choosing the type of security investigation
 * to perform. Provides a list of predefined investigation types with
 * proper styling and accessibility features.
 *
 * @component
 * @example
 * ```tsx
 * const [type, setType] = useState("");
 * 
 * <InvestigationTypeSelect 
 *   value={type}
 *   onValueChange={(newValue) => setType(newValue)}
 * />
 * ```
 */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvestigationTypeSelectProps {
  /** Currently selected investigation type */
  value: string;
  /** Callback function when selection changes */
  onValueChange: (value: string) => void;
  /** Error message to display */
  error?: string;
}

export const InvestigationTypeSelect = ({ value, onValueChange, error }: InvestigationTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Investigation Type</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-red-500" : undefined}>
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};