/**
 * DeviceHeader Component
 * 
 * Displays the header section of the device fingerprint analysis dashboard,
 * including a title and the total count of tracked devices.
 *
 * @component
 * @example
 * ```tsx
 * <DeviceHeader deviceCount={42} />
 * ```
 */
import { Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceHeaderProps {
  /** The total number of unique devices being tracked */
  deviceCount: number;
}

export const DeviceHeader = ({ deviceCount }: DeviceHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-white/60" />
        <h3 className="font-semibold text-white">Device Fingerprint Analysis</h3>
      </div>
      <Badge variant="outline">
        {deviceCount} Devices Tracked
      </Badge>
    </div>
  );
};