import { Card } from "@/components/ui/card";
import { useBiometricVerification } from "@/hooks/useBiometricVerification";
import { LoadingSpinner } from "@/components/ui/states/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

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
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No biometric verification data available
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Biometric Verification Monitoring</h3>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {verifications.map((verification) => (
            <div
              key={verification.id}
              className="p-3 border rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">
                    {verification.verification_type.charAt(0).toUpperCase() + 
                     verification.verification_type.slice(1)} Verification
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(verification.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge variant={verification.success ? "success" : "destructive"}>
                  {verification.success ? "Success" : "Failed"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Confidence Score</p>
                  <p>{(verification.confidence_score * 100).toFixed(1)}%</p>
                </div>
                {verification.device_fingerprints?.risk_score && (
                  <div>
                    <p className="text-muted-foreground">Device Risk Score</p>
                    <p>{verification.device_fingerprints.risk_score}</p>
                  </div>
                )}
              </div>

              {verification.risk_indicators && verification.risk_indicators.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-destructive">Risk Indicators:</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {verification.risk_indicators.map((risk: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-destructive">
                        {risk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};