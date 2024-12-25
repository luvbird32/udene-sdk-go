import { Card } from "@/components/ui/card";
import { WebhookListHeader } from "./components/WebhookListHeader";
import { WebhookListItem } from "./components/WebhookListItem";
import { EmptyWebhookState } from "./components/EmptyWebhookState";
import { useWebhookList } from "./hooks/useWebhookList";

export const WebhookList = () => {
  const { webhooks, isLoading, deleteWebhook, toggleWebhook } = useWebhookList();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="animate-pulse h-12 bg-muted rounded-lg" />
          <div className="animate-pulse h-12 bg-muted rounded-lg" />
          <div className="animate-pulse h-12 bg-muted rounded-lg" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <WebhookListHeader />

      <div className="space-y-4">
        {webhooks?.map((webhook) => (
          <WebhookListItem
            key={webhook.id}
            webhook={webhook}
            onDelete={(id) => deleteWebhook.mutate(id)}
            onToggle={(id, isActive) => toggleWebhook.mutate({ id, isActive })}
          />
        ))}
        
        {(!webhooks || webhooks.length === 0) && <EmptyWebhookState />}
      </div>
    </Card>
  );
};
