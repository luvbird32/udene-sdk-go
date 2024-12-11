import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Webhook, Server, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  description?: string;
  created_at: string;
}

export const WebhookList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WebhookData[];
    }
  });

  const deleteWebhook = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('webhooks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast({
        title: "Webhook deleted",
        description: "The webhook has been removed successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete webhook: " + error.message,
        variant: "destructive"
      });
    }
  });

  const toggleWebhook = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('webhooks')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update webhook status: " + error.message,
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading webhooks...</div>;
  }

  return (
    <div className="space-y-4">
      {webhooks?.map((webhook) => (
        <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span className="font-medium">{webhook.url}</span>
            </div>
            {webhook.description && (
              <p className="text-sm text-muted-foreground">{webhook.description}</p>
            )}
            <div className="flex gap-2 flex-wrap">
              {webhook.events.map((event) => (
                <span
                  key={event}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {event}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={webhook.is_active}
              onCheckedChange={(checked) => 
                toggleWebhook.mutate({ id: webhook.id, isActive: checked })
              }
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteWebhook.mutate(webhook.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {(!webhooks || webhooks.length === 0) && (
        <div className="text-center p-4 text-muted-foreground">
          No webhooks configured yet.
        </div>
      )}
    </div>
  );
};