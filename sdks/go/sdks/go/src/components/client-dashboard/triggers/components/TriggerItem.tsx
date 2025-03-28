import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Trash } from "lucide-react";

interface TriggerData {
  id: string;
  name: string;
  description?: string;
  event_type: string;
  is_active: boolean;
}

interface TriggerItemProps {
  trigger: TriggerData;
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

export const TriggerItem = ({ trigger, onDelete, onToggle }: TriggerItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="font-medium">{trigger.name}</span>
        </div>
        {trigger.description && (
          <p className="text-sm text-muted-foreground">{trigger.description}</p>
        )}
        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
          {trigger.event_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Switch
          checked={trigger.is_active}
          onCheckedChange={(checked) => onToggle(trigger.id, checked)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(trigger.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};