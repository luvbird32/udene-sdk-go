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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EVENT_TYPES = [
  'fraud_detected',
  'suspicious_activity',
  'risk_score_change',
  'transaction_blocked',
  'user_blacklisted',
  'device_flagged',
  'ip_blocked',
  'location_alert',
  'velocity_check_failed',
  'pattern_detected'
];

export const TriggerForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createTrigger = useMutation({
    mutationFn: async () => {
      if (!name.trim() || !eventType) {
        throw new Error("Name and event type are required");
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Authentication required");

      const { data, error } = await supabase
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
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['triggers'] });
      toast({
        title: "Trigger created",
        description: "Your new event trigger has been configured successfully."
      });
      setName("");
      setDescription("");
      setEventType("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create trigger: " + error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Add New Trigger</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Trigger Name</Label>
            <Input
              id="name"
              placeholder="Enter trigger name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this trigger does"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={() => createTrigger.mutate()}
            disabled={!name.trim() || !eventType}
            className="w-full"
          >
            Create Trigger
          </Button>
        </div>
      </div>
    </Card>
  );
};