import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TriggerItem } from "./components/TriggerItem";
import { TriggerLoading } from "./components/TriggerLoading";
import { EmptyTriggerState } from "./components/EmptyTriggerState";

export const TriggerList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: triggers, isLoading } = useQuery({
    queryKey: ['triggers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_triggers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

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

  if (isLoading) {
    return <TriggerLoading />;
  }

  if (!triggers || triggers.length === 0) {
    return <EmptyTriggerState />;
  }

  return (
    <div className="space-y-4">
      {triggers.map((trigger) => (
        <TriggerItem
          key={trigger.id}
          trigger={trigger}
          onDelete={deleteTrigger.mutate}
          onToggle={(id, isActive) => toggleTrigger.mutate({ id, isActive })}
        />
      ))}
    </div>
  );
};