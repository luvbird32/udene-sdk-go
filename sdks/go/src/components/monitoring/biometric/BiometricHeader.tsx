import { Shield } from "lucide-react";

export const BiometricHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Shield className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold">Biometric Verification Monitoring</h3>
    </div>
  );
};