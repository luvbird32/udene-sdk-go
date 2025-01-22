import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AVAILABLE_EVENTS = [
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

interface WebhookEventsProps {
  selectedEvents: string[];
  onEventsChange: (events: string[]) => void;
}

export const WebhookEvents = ({ selectedEvents, onEventsChange }: WebhookEventsProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-primary font-medium">Events to Subscribe</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 border rounded-lg">
        {AVAILABLE_EVENTS.map((event) => (
          <div key={event} className="flex items-center space-x-2">
            <Checkbox
              id={event}
              checked={selectedEvents.includes(event)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onEventsChange([...selectedEvents, event]);
                } else {
                  onEventsChange(selectedEvents.filter(e => e !== event));
                }
              }}
            />
            <Label 
              htmlFor={event} 
              className="text-sm cursor-pointer text-primary"
            >
              {event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};