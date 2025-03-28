import { Server, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  description?: string;
}

interface WebhookListItemProps {
  webhook: WebhookData;
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

export const WebhookListItem = ({ webhook, onDelete, onToggle }: WebhookListItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-white/60" />
          <span className="font-medium text-white/60">{webhook.url}</span>
        </div>
        {webhook.description && (
          <p className="text-sm text-white/60">{webhook.description}</p>
        )}
        <div className="flex gap-2 flex-wrap">
          {webhook.events.map((event) => (
            <Badge
              key={event}
              variant="secondary"
              className="text-xs text-white/60"
            >
              {event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Switch
          checked={webhook.is_active}
          onCheckedChange={(checked) => onToggle(webhook.id, checked)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(webhook.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};