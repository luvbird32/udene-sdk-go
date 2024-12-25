import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { ExampleUseCases } from "./ExampleUseCases";
import { TriggerFormInputs } from "./components/TriggerFormInputs";
import { TriggerFormActions } from "./components/TriggerFormActions";
import { useTriggerForm } from "./hooks/useTriggerForm";

export const TriggerForm = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    selectedEventTypes,
    setSelectedEventTypes,
    createTrigger,
    isLoading
  } = useTriggerForm();

  const isValid = name.trim() && selectedEventTypes.length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Add New Trigger</h3>
        </div>

        <ExampleUseCases />

        <TriggerFormInputs
          name={name}
          description={description}
          selectedEventTypes={selectedEventTypes}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onEventTypesChange={setSelectedEventTypes}
          isLoading={isLoading}
        />

        <TriggerFormActions
          onSubmit={() => createTrigger.mutate()}
          isLoading={isLoading}
          isValid={isValid}
          selectedEventTypesCount={selectedEventTypes.length}
        />
      </div>
    </Card>
  );
};