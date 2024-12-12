import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Server, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex items-center gap-2 mb-4">
        <Server className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-medium">Configured Webhooks</h4>
      </div>

      <div className="space-y-4">
        {webhooks?.map((webhook) => (
          <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
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
                  <Badge
                    key={event}
                    variant="secondary"
                    className="text-xs"
                  >
                    {event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
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
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <Server className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground font-medium">No webhooks configured</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first webhook endpoint above to start receiving event notifications.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
