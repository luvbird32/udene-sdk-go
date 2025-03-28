import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientSettings } from "@/types/settings";

interface RiskSectionProps {
  formData: ClientSettings;
  onChange: (data: ClientSettings) => void;
}

export const RiskSection = ({ formData, onChange }: RiskSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="risk_threshold">Risk Threshold</Label>
      <Input
        id="risk_threshold"
        type="number"
        min="0"
        max="100"
        value={formData.risk_threshold}
        onChange={(e) => onChange({ ...formData, risk_threshold: Number(e.target.value) })}
      />
      <p className="text-sm text-muted-foreground">
        Transactions above this risk score will trigger alerts
      </p>
    </div>
  );
};