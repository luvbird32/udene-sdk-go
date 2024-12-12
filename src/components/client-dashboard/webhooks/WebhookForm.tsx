import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Webhook } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AVAILABLE_EVENTS = [
  'fraud_detected',
  'suspicious_activity',
  'risk_score_change',
  'transaction_blocked',
  'user_blacklisted',
  'device_flagged',
  'ip_blocked',
  'location_alert',
  'velocity_check_failed',
  'pattern_detected'
];

export const WebhookForm = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createWebhook = useMutation({
    mutationFn: async () => {
      if (!url.trim() || selectedEvents.length === 0) {
        throw new Error("URL and at least one event are required");
      }

      const { data, error } = await supabase
        .from('webhooks')
        .insert([
          {
            url: url.trim(),
            description: description.trim() || null,
            events: selectedEvents,
            is_active: true,
            secret_key: crypto.randomUUID()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast({
        title: "Webhook created",
        description: "Your new webhook has been configured successfully."
      });
      setUrl("");
      setDescription("");
      setSelectedEvents([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create webhook: " + error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="url">Webhook URL</Label>
        <Input
          id="url"
          placeholder="https://your-domain.com/webhook"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="font-mono"
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Describe the purpose of this webhook"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Events to Subscribe</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 border rounded-lg">
          {AVAILABLE_EVENTS.map((event) => (
            <div key={event} className="flex items-center space-x-2">
              <Checkbox
                id={event}
                checked={selectedEvents.includes(event)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedEvents([...selectedEvents, event]);
                  } else {
                    setSelectedEvents(selectedEvents.filter(e => e !== event));
                  }
                }}
              />
              <Label 
                htmlFor={event} 
                className="text-sm cursor-pointer"
              >
                {event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </div>

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
