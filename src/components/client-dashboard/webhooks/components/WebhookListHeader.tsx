import { Server } from "lucide-react";

export const WebhookListHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Server className="h-4 w-4 text-white/60" />
      <h4 className="font-medium text-white/60">Configured Webhooks</h4>
    </div>
  );
};