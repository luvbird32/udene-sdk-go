import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Transaction } from "./types";

interface CustomerTransactionChartProps {
  transactions: Transaction[];
}

export const CustomerTransactionChart = ({ transactions }: CustomerTransactionChartProps) => {
  return (
    <div className="h-[100px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transactions}>
          <XAxis 
            dataKey="timestamp" 
            tick={false}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleString()}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#8884d8" 
            name="Amount"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};