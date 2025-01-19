import { Card } from "@/components/ui/card";
import { useBiometricVerification } from "@/hooks/useBiometricVerification";
import { LoadingSpinner } from "@/components/ui/states/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { BiometricHeader } from "./biometric/BiometricHeader";
import { BiometricVerificationList } from "./biometric/BiometricVerificationList";
import ErrorBoundary from "@/components/ErrorBoundary";

export const BiometricVerificationMonitoring = () => {
  const { verifications, isLoading } = useBiometricVerification();

  if (isLoading) {
    return (
      <Card className="p-4">
        <LoadingSpinner />
      </Card>
    );
  }

  if (!verifications || verifications.length === 0) {
    return (
      <Card className="p-4">
        <Alert>
          <AlertCircle className="h-4 w-4 text-white" />
          <AlertDescription className="text-white/60">
            No biometric verification data available
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ErrorBoundary>
        <BiometricHeader />
        <BiometricVerificationList verifications={verifications} />
      </ErrorBoundary>
    </Card>
  );
};