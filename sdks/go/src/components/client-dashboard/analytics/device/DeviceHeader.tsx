import { Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceHeaderProps {
  deviceCount: number;
}

export const DeviceHeader = ({ deviceCount }: DeviceHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">Device Fingerprint Analysis</h3>
      </div>
      <Badge variant="outline">
        {deviceCount} Devices Tracked
      </Badge>
    </div>
  );
};