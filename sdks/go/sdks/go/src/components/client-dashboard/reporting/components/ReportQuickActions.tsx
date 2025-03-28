import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "./action-buttons/ActionButton";
import { reportActions } from "./action-buttons/actionConfigs";

export const ReportQuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} action has been triggered.`,
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="font-medium">Report Actions</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {reportActions.map(({ id, label, icon, action, variant }) => (
            <ActionButton
              key={id}
              icon={icon}
              label={label}
              onClick={() => handleAction(action)}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};