import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import type { EmailChange } from "./types";

interface EmailChangeListProps {
  changes: EmailChange[];
}

export const EmailChangeList = ({ changes }: EmailChangeListProps) => {
  const getRiskBadgeVariant = (score: number) => {
    if (score >= 80) return "destructive";
    if (score >= 50) return "warning";
    return "secondary";
  };

  const getRiskIcon = (score: number) => {
    if (score >= 80) return <AlertTriangle className="h-4 w-4" />;
    if (score >= 50) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <ScrollArea className="h-[300px] rounded-md border">
      <div className="space-y-4 p-4">
        {changes?.map((change) => (
          <div
            key={change.id}
            className="flex items-start justify-between p-4 rounded-lg bg-muted/50"
          >
            <div className="space-y-1">
              <p className="font-medium">Email Change Detected</p>
              <p className="text-sm text-muted-foreground">
                From: {change.previous_email}
              </p>
              <p className="text-sm text-muted-foreground">
                To: {change.new_email}
              </p>
              <p className="text-sm text-muted-foreground">
                IP: {change.ip_address}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(change.changed_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getRiskBadgeVariant(change.risk_score)}>
                {getRiskIcon(change.risk_score)}
                Risk Score: {change.risk_score}
              </Badge>
              {change.requires_review && (
                <Badge variant="destructive">
                  Requires Review
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};