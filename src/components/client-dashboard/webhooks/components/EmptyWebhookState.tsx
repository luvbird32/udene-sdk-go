import { Server } from "lucide-react";

export const EmptyWebhookState = () => {
  return (
    <div className="text-center p-8 border-2 border-dashed rounded-lg">
      <Server className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
      <p className="text-muted-foreground font-medium">No webhooks configured</p>
      <p className="text-sm text-muted-foreground mt-1">
        Add your first webhook endpoint above to start receiving event notifications.
      </p>
    </div>
  );
};