import { UserCheck, UserX } from "lucide-react";

interface FaceMatchingMetricsProps {
  avgFaceMatchScore: number;
  faceMatchAlerts: number;
}

export const FaceMatchingMetrics = ({ avgFaceMatchScore, faceMatchAlerts }: FaceMatchingMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm font-medium">Face Match Score</p>
          <p className="text-2xl font-bold">
            {avgFaceMatchScore.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <UserX className="h-5 w-5 text-red-500" />
        <div>
          <p className="text-sm font-medium">Face Match Alerts</p>
          <p className="text-2xl font-bold">{faceMatchAlerts}</p>
        </div>
      </div>
    </div>
  );
};