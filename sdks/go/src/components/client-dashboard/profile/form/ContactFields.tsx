import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileFormData } from "@/types/profile";

interface ContactFieldsProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const ContactFields = ({ formData, setFormData }: ContactFieldsProps) => {
  // Get user's current timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          placeholder="Enter your phone number"
          type="text" // Changed from tel to text for unrestricted input
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Input
          id="timezone"
          value={formData.timezone || userTimezone}
          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
          placeholder="Enter timezone"
          type="text"
        />
      </div>
    </>
  );
};