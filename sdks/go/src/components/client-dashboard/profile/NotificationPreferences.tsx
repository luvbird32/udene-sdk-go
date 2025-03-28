import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Phone } from "lucide-react";
import { ProfileFormData } from "@/types/profile";

interface NotificationPreferencesProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const NotificationPreferences = ({ formData, setFormData }: NotificationPreferencesProps) => {
  return (
    <div className="space-y-4">
      <Label>Notification Preferences</Label>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Email Notifications
          </Label>
          <Switch
            id="email-notifications"
            checked={formData.preferences.notifications.email}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              preferences: {
                ...formData.preferences,
                notifications: {
                  ...formData.preferences.notifications,
                  email: checked
                }
              }
            })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            SMS Notifications
          </Label>
          <Switch
            id="sms-notifications"
            checked={formData.preferences.notifications.sms}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              preferences: {
                ...formData.preferences,
                notifications: {
                  ...formData.preferences.notifications,
                  sms: checked
                }
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};