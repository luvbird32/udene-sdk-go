import { Server } from "lucide-react";

export const EmptyWebhookState = () => {
  return (
    <div className="text-center p-8 border-2 border-dashed rounded-lg">
      <Server className="h-8 w-8 text-white/60 mx-auto mb-2" />
      <p className="text-white/60 font-medium">No webhooks configured</p>
      <p className="text-sm text-white/60 mt-1">
        Add your first webhook endpoint above to start receiving event notifications.
      </p>
    </div>
  );
};