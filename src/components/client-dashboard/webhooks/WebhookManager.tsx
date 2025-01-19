/**
 * WebhookManager Component
 * 
 * Manages webhook configurations for real-time event notifications.
 * Provides interface for creating, viewing, and managing webhooks.
 * 
 * Features:
 * - Webhook URL configuration
 * - Event type selection
 * - Real-time webhook status
 * - Webhook list management
 * - Beta feature indicator
 * 
 * @component
 * @example
 * ```tsx
 * <WebhookManager />
 * ```
 */
import { WebhookForm } from "./WebhookForm";
import { WebhookList } from "./WebhookList";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Webhook, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const WebhookManager = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Webhook className="h-5 w-5 text-primary" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white/60">Webhook Configuration</h3>
              <Badge variant="outline">Beta</Badge>
            </div>
            <p className="text-sm text-white/60">
              Receive real-time notifications for important events
            </p>
          </div>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-white/60">Getting Started with Webhooks</AlertTitle>
          <AlertDescription className="text-white/60">
            Add a webhook URL below to start receiving event notifications. You can configure multiple webhooks and select which events to subscribe to for each endpoint.
          </AlertDescription>
        </Alert>

        <WebhookForm />
      </Card>
      
      <WebhookList />
    </div>
  );
};