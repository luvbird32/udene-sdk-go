import { Server } from "lucide-react";

export const WebhookListHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Server className="h-4 w-4 text-muted-foreground" />
      <h4 className="font-medium">Configured Webhooks</h4>
    </div>
  );
};