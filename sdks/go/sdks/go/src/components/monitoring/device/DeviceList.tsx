import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DeviceFingerprint } from "../types";

interface DeviceListProps {
  devices: DeviceFingerprint[];
}

export const DeviceList = ({ devices }: DeviceListProps) => {
  return (
    <ScrollArea className="h-[400px] w-full">
      {devices?.map((device) => (
        <div 
          key={device.id} 
          className="p-4 border rounded-lg mb-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="font-medium">Device ID: {device.id.slice(-8)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                User ID: {device.user_id}
              </p>
              <p className="text-sm text-muted-foreground">
                Last seen: {new Date(device.last_seen).toLocaleString()}
              </p>
            </div>
            <Badge variant="destructive">
              Risk Score: {device.risk_score}
            </Badge>
          </div>
        </div>
      ))}

      {(!devices || devices.length === 0) && (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No flagged devices found</p>
        </div>
      )}
    </ScrollArea>
  );
};