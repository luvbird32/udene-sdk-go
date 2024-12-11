import { WebhookForm } from "./WebhookForm";
import { WebhookList } from "./WebhookList";

export const WebhookManager = () => {
  return (
    <div className="space-y-6">
      <WebhookForm />
      <WebhookList />
    </div>
  );
};