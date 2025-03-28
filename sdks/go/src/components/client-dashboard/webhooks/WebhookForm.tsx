import { Button } from "@/components/ui/button";
import { WebhookUrlInput } from "./components/WebhookUrlInput";
import { WebhookDescription } from "./components/WebhookDescription";
import { WebhookEvents } from "./components/WebhookEvents";
import { useWebhookForm } from "./hooks/useWebhookForm";

export const WebhookForm = () => {
  const {
    url,
    setUrl,
    description,
    setDescription,
    selectedEvents,
    setSelectedEvents,
    createWebhook
  } = useWebhookForm();

  return (
    <div className="space-y-4">
      <WebhookUrlInput url={url} onChange={setUrl} />
      <WebhookDescription description={description} onChange={setDescription} />
      <WebhookEvents selectedEvents={selectedEvents} onEventsChange={setSelectedEvents} />
      
      <Button 
        onClick={() => createWebhook.mutate()}
        disabled={!url.trim() || selectedEvents.length === 0}
        className="w-full"
      >
        Create Webhook
      </Button>
    </div>
  );
};