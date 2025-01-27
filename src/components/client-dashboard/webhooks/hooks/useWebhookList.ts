import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

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
  const { user } = useAuth();

  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      console.log("Fetching webhooks for user:", user?.id);
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching webhooks:", error);
        throw error;
      }
      
      console.log("Fetched webhooks:", data);
      return data as WebhookData[];
    },
    enabled: !!user // Only run query when user is authenticated
  });

  const deleteWebhook = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting webhook:", id);
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
      console.error("Error deleting webhook:", error);
      toast({
        title: "Error",
        description: "Failed to delete webhook: " + error.message,
        variant: "destructive"
      });
    }
  });

  const toggleWebhook = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      console.log("Toggling webhook:", id, "to:", isActive);
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
      console.error("Error toggling webhook:", error);
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