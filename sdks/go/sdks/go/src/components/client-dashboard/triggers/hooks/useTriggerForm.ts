import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTriggerForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createTrigger = useMutation({
    mutationFn: async () => {
      if (!name.trim() || selectedEventTypes.length === 0) {
        throw new Error("Name and at least one event type are required");
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Authentication required");

      const promises = selectedEventTypes.map(eventType => 
        supabase
          .from('event_triggers')
          .insert({
            name: name.trim(),
            description: description.trim() || null,
            event_type: eventType,
            conditions: {},
            actions: {},
            is_active: true,
            user_id: user.id
          })
          .select()
      );

      const results = await Promise.all(promises);
      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        throw new Error("Failed to create some triggers");
      }

      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['triggers'] });
      toast({
        title: "Triggers created",
        description: "Your new event triggers have been configured successfully."
      });
      setName("");
      setDescription("");
      setSelectedEventTypes([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create triggers: " + error.message,
        variant: "destructive"
      });
    }
  });

  return {
    name,
    setName,
    description,
    setDescription,
    selectedEventTypes,
    setSelectedEventTypes,
    createTrigger,
    isLoading: createTrigger.isPending
  };
};