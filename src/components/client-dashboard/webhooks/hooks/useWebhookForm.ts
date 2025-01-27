import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

export const useWebhookForm = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createWebhook = useMutation({
    mutationFn: async () => {
      console.log("Creating webhook with:", { url, description, selectedEvents });
      if (!user) throw new Error("User not authenticated");
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

      if (error) {
        console.error("Error creating webhook:", error);
        throw error;
      }
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
      console.error("Error in createWebhook:", error);
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