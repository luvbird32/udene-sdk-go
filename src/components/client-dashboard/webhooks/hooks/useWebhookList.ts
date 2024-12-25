import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  description?: string;
}

export const useWebhookList = () => {
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

  return {
    webhooks,
    isLoading,
    deleteWebhook,
    toggleWebhook
  };
};