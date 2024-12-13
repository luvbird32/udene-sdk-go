import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormData } from "@/types/profile";
import { NotificationPreferences } from "./NotificationPreferences";

interface ProfileFormProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const ProfileForm = ({ formData, setFormData, onSubmit, isEditing, setIsEditing }: ProfileFormProps) => {
  const timezones = [
    "UTC", "America/New_York", "America/Los_Angeles", "Europe/London", 
    "Europe/Paris", "Asia/Tokyo", "Asia/Singapore", "Australia/Sydney"
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter your username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization_name">Organization Name</Label>
        <Input
          id="organization_name"
          value={formData.organization_name}
          onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
          placeholder="Enter your organization name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization_role">Role in Organization</Label>
        <Input
          id="organization_role"
          value={formData.organization_role}
          onChange={(e) => setFormData({ ...formData, organization_role: e.target.value })}
          placeholder="Enter your role"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          placeholder="Enter your phone number"
          type="tel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select
          value={formData.timezone}
          onValueChange={(value) => setFormData({ ...formData, timezone: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <NotificationPreferences 
        formData={formData} 
        setFormData={setFormData} 
      />

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Save Changes
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsEditing(false)}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};