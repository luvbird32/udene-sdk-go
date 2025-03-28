import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AffiliateStats } from "./useAffiliateData";

interface AffiliateChartProps {
  data: AffiliateStats[];
}

export const AffiliateChart = ({ data }: AffiliateChartProps) => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="riskScore" 
            stroke="#8884d8" 
            name="Risk Score" 
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="amount" 
            stroke="#82ca9d" 
            name="Transaction Amount" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};