
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ClientSettings } from "@/types/settings";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface NotificationSectionProps {
  formData: ClientSettings;
  onChange: (data: ClientSettings) => void;
}

export const NotificationSection = ({ formData, onChange }: NotificationSectionProps) => {
  const updatePreference = (path: string[], value: any) => {
    const newFormData = { ...formData };
    let current = newFormData.notification_preferences;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onChange(newFormData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Notifications</Label>
            <Switch
              id="email"
              checked={formData.notification_preferences.email}
              onCheckedChange={(checked) => updatePreference(['email'], checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms">SMS Notifications</Label>
            <Switch
              id="sms"
              checked={formData.notification_preferences.sms}
              onCheckedChange={(checked) => updatePreference(['sms'], checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push">Push Notifications</Label>
            <Switch
              id="push"
              checked={formData.notification_preferences.push}
              onCheckedChange={(checked) => updatePreference(['push'], checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>Select which types of notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(formData.notification_preferences.categories).map(([category, enabled]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
                {category === 'security' && (
                  <Badge variant="destructive">Important</Badge>
                )}
              </div>
              <Switch
                id={category}
                checked={enabled}
                onCheckedChange={(checked) => updatePreference(['categories', category], checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Severity Levels</CardTitle>
          <CardDescription>Choose which severity levels you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(formData.notification_preferences.severity_levels).map(([level, enabled]) => (
            <div key={level} className="flex items-center justify-between">
              <Label htmlFor={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Priority</Label>
              <Switch
                id={level}
                checked={enabled}
                onCheckedChange={(checked) => updatePreference(['severity_levels', level], checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>Set a time period when you don't want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
            <Switch
              id="quiet-hours"
              checked={formData.notification_preferences.quiet_hours.enabled}
              onCheckedChange={(checked) => updatePreference(['quiet_hours', 'enabled'], checked)}
            />
          </div>
          {formData.notification_preferences.quiet_hours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={formData.notification_preferences.quiet_hours.start}
                  onChange={(e) => updatePreference(['quiet_hours', 'start'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={formData.notification_preferences.quiet_hours.end}
                  onChange={(e) => updatePreference(['quiet_hours', 'end'], e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};
