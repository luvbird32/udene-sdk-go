import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "./action-buttons/ActionButton";
import { scanActions, reportActions } from "./action-buttons/actionConfigs";

interface ReportQuickActionsProps {
  onStartScan?: () => void;
  isScanning?: boolean;
}

export const ReportQuickActions = ({ 
  onStartScan, 
  isScanning = false 
}: ReportQuickActionsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (action === "Start New Scan" && onStartScan) {
      onStartScan();
      return;
    }

    toast({
      title: "Action Triggered",
      description: `${action} action has been triggered.`,
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="font-medium">Scan Actions</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {scanActions.map(({ id, label, icon, action, disabledWhen, enabledWhen }) => (
            <ActionButton
              key={id}
              icon={icon}
              label={label}
              onClick={() => handleAction(action)}
              disabled={
                disabledWhen === "isScanning" ? isScanning :
                enabledWhen === "isScanning" ? !isScanning :
                false
              }
            />
          ))}
          
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