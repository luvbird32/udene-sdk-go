import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventTypeSelector } from "../EventTypeSelector";

interface TriggerFormInputsProps {
  name: string;
  description: string;
  selectedEventTypes: string[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onEventTypesChange: (types: string[]) => void;
  isLoading: boolean;
}

export const TriggerFormInputs = ({
  name,
  description,
  selectedEventTypes,
  onNameChange,
  onDescriptionChange,
  onEventTypesChange,
  isLoading
}: TriggerFormInputsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Trigger Name</Label>
        <Input
          id="name"
          placeholder="E.g., High Risk Transaction Alert"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="E.g., Alert me when high-risk transactions are detected"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        <Label>Event Types</Label>
        <EventTypeSelector
          selectedEventTypes={selectedEventTypes}
          onEventTypesChange={onEventTypesChange}
        />
      </div>
    </div>
  );
};