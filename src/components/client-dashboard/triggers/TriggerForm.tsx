import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EventTypeSelector } from "./EventTypeSelector";
import { ExampleUseCases } from "./ExampleUseCases";

export const TriggerForm = () => {
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

      // Create a trigger for each selected event type
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

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Add New Trigger</h3>
        </div>

        <ExampleUseCases />

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Trigger Name</Label>
            <Input
              id="name"
              placeholder="E.g., High Risk Transaction Alert"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="E.g., Alert me when high-risk transactions are detected"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Event Types</Label>
            <EventTypeSelector
              selectedEventTypes={selectedEventTypes}
              onEventTypesChange={setSelectedEventTypes}
            />
          </div>

          <Button 
            onClick={() => createTrigger.mutate()}
            disabled={!name.trim() || selectedEventTypes.length === 0}
            className="w-full"
          >
            Create Trigger{selectedEventTypes.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </Card>
  );
};