import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VerificationStats } from "./identity-verification/VerificationStats";
import { FaceMatchingMetrics } from "./identity-verification/FaceMatchingMetrics";
import { VerificationChart } from "./identity-verification/VerificationChart";
import { useVerificationStats } from "./identity-verification/useVerificationStats";

export const IdentityVerificationMonitoring = () => {
  const { data: verificationStats, isLoading, error } = useVerificationStats();

  const totalVerifications = verificationStats?.stats?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
            <h3 className="font-semibold text-white">Identity Verification Status</h3>
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <p className="text-sm text-white/60">Loading verification data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <VerificationStats totalVerifications={0} />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Failed to load verification data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!verificationStats?.stats || verificationStats.stats.length === 0) {
    return (
      <Card className="p-4">
        <VerificationStats totalVerifications={0} />
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-white/60 mx-auto mb-2" />
            <p className="text-white/60">No verification data available</p>
            <p className="text-sm text-white/60 mt-1">
              Verification statistics will appear here once users complete identity verification.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <VerificationStats totalVerifications={totalVerifications} />
      <FaceMatchingMetrics 
        avgFaceMatchScore={verificationStats.avgFaceMatchScore}
        faceMatchAlerts={verificationStats.faceMatchAlerts}
      />
      <VerificationChart stats={verificationStats.stats} />
    </Card>
  );
};