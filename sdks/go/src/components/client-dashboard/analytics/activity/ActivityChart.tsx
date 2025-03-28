import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";

interface ActivityChartProps {
  activityData: Array<{
    date: string;
    activityCount: number;
    securityEvents: number;
  }>;
  totalSecurityEvents: number;
}

export const ActivityChart = ({ activityData, totalSecurityEvents }: ActivityChartProps) => {
  return (
    <>
      <div className="flex gap-2">
        <Badge variant="outline">Last 100 Activities</Badge>
        {totalSecurityEvents > 0 && (
          <Badge variant="destructive">
            {totalSecurityEvents} Security Events
          </Badge>
        )}
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="activityCount" 
              name="Activities"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="securityEvents" 
              name="Security Events"
              stroke="#ff4d4f"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};