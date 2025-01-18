import { Badge } from "@/components/ui/badge";
import type { BiometricVerification } from "@/types/verification";

interface BiometricVerificationItemProps {
  verification: BiometricVerification;
}

export const BiometricVerificationItem = ({ verification }: BiometricVerificationItemProps) => {
  return (
    <div className="p-3 border rounded-lg">
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
        <Badge 
          variant={verification.success ? "default" : "destructive"} 
          className={verification.success ? "bg-green-500" : ""}
        >
          {verification.success ? "Success" : "Failed"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Confidence Score</p>
          <p>{(verification.confidence_score * 100).toFixed(1)}%</p>
        </div>
        {verification.liveness_score !== null && (
          <div>
            <p className="text-muted-foreground">Liveness Score</p>
            <p>{verification.liveness_score.toFixed(1)}%</p>
          </div>
        )}
        {verification.deepfake_detection_score !== null && (
          <div>
            <p className="text-muted-foreground">Deepfake Detection Score</p>
            <p>{verification.deepfake_detection_score.toFixed(1)}%</p>
          </div>
        )}
        {verification.device_fingerprints?.risk_score && (
          <div>
            <p className="text-muted-foreground">Device Risk Score</p>
            <p>{verification.device_fingerprints.risk_score}</p>
          </div>
        )}
      </div>

      {verification.liveness_checks && verification.liveness_checks.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Liveness Checks:</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {verification.liveness_checks.map((check: string, index: number) => (
              <Badge key={index} variant="outline" className="text-primary">
                {check}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {verification.risk_indicators && verification.risk_indicators.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-destructive">Risk Indicators:</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {verification.risk_indicators.map((risk: string, index: number) => (
              <Badge key={index} variant="destructive">
                {risk}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {verification.facial_movements && verification.facial_movements.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Facial Movements Detected:</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {verification.facial_movements.map((movement: string, index: number) => (
              <Badge key={index} variant="outline" className="text-primary">
                {movement}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};