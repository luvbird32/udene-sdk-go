import { Card } from "@/components/ui/card";
import { AutomaticActionToggle } from "./AutomaticActionToggle";
import type { ServiceActionPreferences } from "../../types";

interface AutomaticActionsSectionProps {
  preferences: ServiceActionPreferences;
  onPreferencesChange: (newPreferences: ServiceActionPreferences) => void;
  isUpdating: boolean;
}

export const AutomaticActionsSection = ({
  preferences,
  onPreferencesChange,
  isUpdating
}: AutomaticActionsSectionProps) => {
  const handleActionTypeChange = (checked: boolean) => {
    onPreferencesChange({
      ...preferences,
      action_type: checked ? 'automatic' : 'manual'
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
      <AutomaticActionToggle
        label="Automatic Actions"
        checked={preferences.action_type === 'automatic'}
        onCheckedChange={handleActionTypeChange}
        disabled={isUpdating}
        tooltip="Enable automatic preventive measures when threats are detected"
      />

      {preferences.action_type === 'automatic' && (
        <div className="space-y-2 pl-4 border-l-2 border-primary/20">
          <AutomaticActionToggle
            label="Block Suspicious IPs"
            checked={preferences.automatic_actions.block_ip}
            onCheckedChange={() => handleAutomaticActionChange('block_ip')}
            disabled={isUpdating}
          />
          <AutomaticActionToggle
            label="Block Suspicious Devices"
            checked={preferences.automatic_actions.block_device}
            onCheckedChange={() => handleAutomaticActionChange('block_device')}
            disabled={isUpdating}
          />
          <AutomaticActionToggle
            label="Block Suspicious Users"
            checked={preferences.automatic_actions.block_user}
            onCheckedChange={() => handleAutomaticActionChange('block_user')}
            disabled={isUpdating}
          />
          <AutomaticActionToggle
            label="Block Suspicious Emails"
            checked={preferences.automatic_actions.block_email}
            onCheckedChange={() => handleAutomaticActionChange('block_email')}
            disabled={isUpdating}
          />
          <AutomaticActionToggle
            label="Restrict Account Access"
            checked={preferences.automatic_actions.restrict_access}
            onCheckedChange={() => handleAutomaticActionChange('restrict_access')}
            disabled={isUpdating}
          />
          <AutomaticActionToggle
            label="Notify Administrator"
            checked={preferences.automatic_actions.notify_admin}
            onCheckedChange={() => handleAutomaticActionChange('notify_admin')}
            disabled={isUpdating}
          />
        </div>
      )}
    </Card>
  );
};