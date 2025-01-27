import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: "connected" | "disconnected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={status === "connected" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
    >
      {status === "connected" ? (
        <CheckCircle className="h-4 w-4 mr-2" />
      ) : (
        <AlertTriangle className="h-4 w-4 mr-2" />
      )}
      {status === "connected" ? "Connected to Lovable" : "Connection Issues"}
    </Badge>
  );
};