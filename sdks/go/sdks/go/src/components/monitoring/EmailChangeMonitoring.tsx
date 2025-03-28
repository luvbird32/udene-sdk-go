import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailChange {
  id: string;
  user_id: string;
  previous_email: string;
  new_email: string;
  changed_at: string;
  risk_score: number;
  requires_review: boolean;
  device_fingerprint: string;
  ip_address: string;
}

export const EmailChangeMonitoring = () => {
  const { data: emailChanges, isLoading } = useQuery({
    queryKey: ["email-changes"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('user_email_history')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as EmailChange[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

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

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  const chartData = emailChanges?.map(change => ({
    timestamp: new Date(change.changed_at).toLocaleDateString(),
    riskScore: change.risk_score
  })) || [];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Email Change Monitoring</h3>
        <Badge variant="outline">
          {emailChanges?.length || 0} Changes Tracked
        </Badge>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="riskScore"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ScrollArea className="h-[300px] rounded-md border">
        <div className="space-y-4 p-4">
          {emailChanges?.map((change) => (
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
    </Card>
  );
};