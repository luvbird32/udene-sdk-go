import { Database } from "./database";

export type Webhook = Database['public']['Tables']['webhooks']['Row'];
export type WebhookInsert = Database['public']['Tables']['webhooks']['Insert'];
export type WebhookUpdate = Database['public']['Tables']['webhooks']['Update'];

export type WebhookDelivery = Database['public']['Tables']['webhook_deliveries']['Row'];
export type WebhookDeliveryInsert = Database['public']['Tables']['webhook_deliveries']['Insert'];
export type WebhookDeliveryUpdate = Database['public']['Tables']['webhook_deliveries']['Update'];