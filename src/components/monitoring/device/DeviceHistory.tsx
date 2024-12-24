import type { DeviceFingerprint } from "../types";

interface DeviceHistoryProps {
  device: DeviceFingerprint;
}

export const DeviceHistory = ({ device }: DeviceHistoryProps) => {
  return (
    <div className="text-sm text-muted-foreground">
      <p>Last seen: {new Date(device.last_seen || '').toLocaleString()}</p>
      {device.device_fingerprint_history?.length > 0 && (
        <p>Changes detected: {device.device_fingerprint_history.length}</p>
      )}
    </div>
  );
};