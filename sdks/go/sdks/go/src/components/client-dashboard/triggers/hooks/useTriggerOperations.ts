import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTriggerOperations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteTrigger = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('event_triggers')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['triggers'] });
      toast({
        title: "Trigger deleted",
        description: "The trigger has been removed successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete trigger: " + error.message,
        variant: "destructive"
      });
    }
  });

  const toggleTrigger = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('event_triggers')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['triggers'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update trigger status: " + error.message,
        variant: "destructive"
      });
    }
  });

  return {
    deleteTrigger: deleteTrigger.mutate,
    toggleTrigger: toggleTrigger.mutate,
  };
};