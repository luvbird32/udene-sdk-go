import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceHistory } from "./DeviceHistory";
import type { DeviceFingerprint } from "../types";

interface DeviceCardProps {
  device: DeviceFingerprint;
}

export const DeviceCard = ({ device }: DeviceCardProps) => {
  return (
    <Card key={device.id} className="p-4 border-destructive/20">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Device ID: {device.id.slice(-8)}</span>
          <Badge variant="destructive">
            Risk Score: {device.risk_score}
          </Badge>
        </div>
        
        <DeviceInfo device={device} />
        <DeviceHistory device={device} />
      </div>
    </Card>
  );
};