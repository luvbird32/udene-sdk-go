import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientSettings } from "@/types/settings";

interface NotificationSectionProps {
  formData: ClientSettings;
  onChange: (data: ClientSettings) => void;
}

export const NotificationSection = ({ formData, onChange }: NotificationSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="contact_email">Contact Email</Label>
      <Input
        id="contact_email"
        type="email"
        value={formData.contact_email}
        onChange={(e) => onChange({ ...formData, contact_email: e.target.value })}
        placeholder="Enter contact email for notifications"
      />
    </div>
  );
};