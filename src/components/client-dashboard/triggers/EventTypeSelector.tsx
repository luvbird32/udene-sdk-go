import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EVENT_TYPES, TriggerEventType } from "./types";

interface EventTypeSelectorProps {
  selectedEventTypes: string[];
  onEventTypesChange: (eventTypes: string[]) => void;
}

export const EventTypeSelector = ({
  selectedEventTypes,
  onEventTypesChange,
}: EventTypeSelectorProps) => {
  const categories = Array.from(new Set(EVENT_TYPES.map(type => type.category)));

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h4 className="text-lg font-semibold capitalize text-white/60">{category} Events</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {EVENT_TYPES.filter(type => type.category === category).map((type) => (
              <div key={type.id} className="flex items-start space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedEventTypes.includes(type.id)}
                  onCheckedChange={(checked) => {
                    onEventTypesChange(
                      checked
                        ? [...selectedEventTypes, type.id]
                        : selectedEventTypes.filter(t => t !== type.id)
                    );
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-medium leading-none text-white/60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </Label>
                  <p className="text-xs text-white/60">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};