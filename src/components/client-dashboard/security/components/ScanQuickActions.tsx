import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ScanQuickActionsProps {
  onStartScan: () => Promise<void>;
  isScanning: boolean;
}

export const ScanQuickActions = ({ onStartScan, isScanning }: ScanQuickActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button 
        onClick={onStartScan} 
        disabled={isScanning}
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Scanning...
          </>
        ) : (
          'Start New Scan'
        )}
      </Button>
    </div>
  );
};