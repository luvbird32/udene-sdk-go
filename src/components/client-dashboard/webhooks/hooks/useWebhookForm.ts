import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useWebhookForm = () => {
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

  return {
    url,
    setUrl,
    description,
    setDescription,
    selectedEvents,
    setSelectedEvents,
    createWebhook
  };
};