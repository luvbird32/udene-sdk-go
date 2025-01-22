/**
 * ScanQuickActions Component
 * 
 * Provides quick action buttons for vulnerability scanning operations.
 * Currently includes a button to initiate a new scan with loading state handling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onStartScan - Async callback function to initiate a new scan
 * @param {boolean} props.isScanning - Flag indicating if a scan is currently in progress
 */
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ScanQuickActionsProps {
  onStartScan: () => Promise<void>;
  isScanning: boolean;
}

export const ScanQuickActions = ({ onStartScan, isScanning }: ScanQuickActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Scan initiation button with loading state */}
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