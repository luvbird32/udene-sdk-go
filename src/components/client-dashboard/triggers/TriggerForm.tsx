import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Settings, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const EVENT_TYPES = [
  {
    id: 'fraud_detected',
    label: 'Fraud Detected',
    description: 'Triggered when high-confidence fraud is detected',
  },
  {
    id: 'suspicious_activity',
    label: 'Suspicious Activity',
    description: 'Triggered when potentially suspicious behavior is identified',
  },
  {
    id: 'risk_score_change',
    label: 'Risk Score Change',
    description: 'Triggered when a significant change in risk score occurs',
  },
  {
    id: 'transaction_blocked',
    label: 'Transaction Blocked',
    description: 'Triggered when a transaction is prevented due to risk',
  },
  {
    id: 'user_blacklisted',
    label: 'User Blacklisted',
    description: 'Triggered when a user is added to the blacklist',
  },
  {
    id: 'device_flagged',
    label: 'Device Flagged',
    description: 'Triggered when a device is marked as suspicious',
  },
  {
    id: 'ip_blocked',
    label: 'IP Blocked',
    description: 'Triggered when an IP address is blocked',
  },
  {
    id: 'location_alert',
    label: 'Location Alert',
    description: 'Triggered when unusual location activity is detected',
  },
  {
    id: 'velocity_check_failed',
    label: 'Velocity Check Failed',
    description: 'Triggered when transaction velocity limits are exceeded',
  },
  {
    id: 'pattern_detected',
    label: 'Pattern Detected',
    description: 'Triggered when a suspicious pattern is identified',
  },
];

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

        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">Example Use Cases:</span>
          </div>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
            <li>Block transactions when suspicious patterns are detected</li>
            <li>Send notifications when risk scores change significantly</li>
            <li>Automatically blacklist devices involved in fraudulent activities</li>
            <li>Track and alert on unusual location-based activities</li>
          </ul>
        </div>

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
            <div className="grid gap-4 sm:grid-cols-2">
              {EVENT_TYPES.map((type) => (
                <div key={type.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedEventTypes.includes(type.id)}
                    onCheckedChange={(checked) => {
                      setSelectedEventTypes(prev => 
                        checked 
                          ? [...prev, type.id]
                          : prev.filter(t => t !== type.id)
                      );
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.label}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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