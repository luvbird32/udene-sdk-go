import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TriggerData {
  id: string;
  name: string;
  description?: string;
  event_type: string;
  is_active: boolean;
  created_at: string;
}

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
      return data as TriggerData[];
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
    return <div className="flex justify-center p-4">Loading triggers...</div>;
  }

  return (
    <div className="space-y-4">
      {triggers?.map((trigger) => (
        <div key={trigger.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium">{trigger.name}</span>
            </div>
            {trigger.description && (
              <p className="text-sm text-muted-foreground">{trigger.description}</p>
            )}
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {trigger.event_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={trigger.is_active}
              onCheckedChange={(checked) => 
                toggleTrigger.mutate({ id: trigger.id, isActive: checked })
              }
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteTrigger.mutate(trigger.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {(!triggers || triggers.length === 0) && (
        <div className="text-center p-4 text-muted-foreground">
          No triggers configured yet.
        </div>
      )}
    </div>
  );
};