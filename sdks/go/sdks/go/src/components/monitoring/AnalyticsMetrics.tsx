
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const AnalyticsMetrics = () => {
  const { data: sessionMetrics, isLoading: sessionsLoading } = useQuery({
    queryKey: ["session-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('session_metrics')
        .select('*')
        .order('session_start', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000
  });

  const { data: behaviorMetrics, isLoading: behaviorLoading } = useQuery({
    queryKey: ["behavior-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_behavior_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000
  });

  const getEngagementColor = (score: number) => {
    if (score > 8) return "text-green-500";
    if (score > 5) return "text-yellow-500";
    return "text-red-500";
  };

  if (sessionsLoading || behaviorLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Session Analytics</h3>
          <div className="h-[200px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionMetrics}>
                <XAxis 
                  dataKey="session_start" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()} 
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement_score" 
                  stroke="#22C55E" 
                  name="Engagement Score" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Start</TableHead>
                  <TableHead>Duration (min)</TableHead>
                  <TableHead>Pages Visited</TableHead>
                  <TableHead>Engagement Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionMetrics?.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      {new Date(session.session_start).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {Math.round(session.duration_seconds / 60)}
                    </TableCell>
                    <TableCell>{session.pages_visited}</TableCell>
                    <TableCell className={getEngagementColor(session.engagement_score)}>
                      {session.engagement_score.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">User Behavior</h3>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Interaction Time (s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {behaviorMetrics?.map((behavior) => (
                  <TableRow key={behavior.id}>
                    <TableCell>
                      {new Date(behavior.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{behavior.event_type}</TableCell>
                    <TableCell>{behavior.path}</TableCell>
                    <TableCell>{behavior.interaction_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};
