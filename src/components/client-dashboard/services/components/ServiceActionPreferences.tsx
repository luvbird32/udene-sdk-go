import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceActionPreferencesProps {
  preferences: {
    action_type: 'manual' | 'automatic';
    automatic_actions: {
      block_ip: boolean;
      block_device: boolean;
      block_user: boolean;
      block_email: boolean;
      restrict_access: boolean;
      notify_admin: boolean;
    };
    notification_settings: {
      email: boolean;
      dashboard: boolean;
    };
  };
  onPreferencesChange: (newPreferences: any) => void;
  isUpdating: boolean;
}

export const ServiceActionPreferences = ({
  preferences,
  onPreferencesChange,
  isUpdating
}: ServiceActionPreferencesProps) => {
  const handleActionTypeChange = (checked: boolean) => {
    const newActionType = checked ? 'automatic' : 'manual';
    onPreferencesChange({
      ...preferences,
      action_type: newActionType
    });
  };

  const handleAutomaticActionChange = (key: keyof typeof preferences.automatic_actions) => {
    onPreferencesChange({
      ...preferences,
      automatic_actions: {
        ...preferences.automatic_actions,
        [key]: !preferences.automatic_actions[key]
      }
    });
  };

  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="action-type">Automatic Actions</Label>
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enable automatic preventive measures when threats are detected</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch
          id="action-type"
          checked={preferences.action_type === 'automatic'}
          onCheckedChange={handleActionTypeChange}
          disabled={isUpdating}
        />
      </div>

      {preferences.action_type === 'automatic' && (
        <div className="space-y-2 pl-4 border-l-2 border-primary/20">
          <div className="flex items-center justify-between">
            <Label htmlFor="block-ip">Block Suspicious IPs</Label>
            <Switch
              id="block-ip"
              checked={preferences.automatic_actions.block_ip}
              onCheckedChange={() => handleAutomaticActionChange('block_ip')}
              disabled={isUpdating}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="block-device">Block Suspicious Devices</Label>
            <Switch
              id="block-device"
              checked={preferences.automatic_actions.block_device}
              onCheckedChange={() => handleAutomaticActionChange('block_device')}
              disabled={isUpdating}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="block-user">Block Suspicious Users</Label>
            <Switch
              id="block-user"
              checked={preferences.automatic_actions.block_user}
              onCheckedChange={() => handleAutomaticActionChange('block_user')}
              disabled={isUpdating}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="block-email">Block Suspicious Emails</Label>
            <Switch
              id="block-email"
              checked={preferences.automatic_actions.block_email}
              onCheckedChange={() => handleAutomaticActionChange('block_email')}
              disabled={isUpdating}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="restrict-access">Restrict Account Access</Label>
            <Switch
              id="restrict-access"
              checked={preferences.automatic_actions.restrict_access}
              onCheckedChange={() => handleAutomaticActionChange('restrict_access')}
              disabled={isUpdating}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notify-admin">Notify Administrator</Label>
            <Switch
              id="notify-admin"
              checked={preferences.automatic_actions.notify_admin}
              onCheckedChange={() => handleAutomaticActionChange('notify_admin')}
              disabled={isUpdating}
            />
          </div>
        </div>
      )}
    </Card>
  );
};