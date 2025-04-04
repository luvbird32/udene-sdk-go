import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StyledCard } from "@/components/ui/custom/StyledCard";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const UsageAnalytics = () => {
  const { data: usageStats } = useQuery({
    queryKey: ["admin-usage-analytics"],
    queryFn: async () => {
      // Get API usage
      const { data: apiCredits } = await supabase
        .from('api_credits')
        .select('used_credits, total_credits, created_at');

      // Get service usage
      const { data: services } = await supabase
        .from('client_services')
        .select('service_type, is_active');

      // Calculate service distribution
      const serviceUsage = (services || []).reduce((acc: any, service) => {
        if (service.is_active) {
          acc[service.service_type] = (acc[service.service_type] || 0) + 1;
        }
        return acc;
      }, {});

      // Calculate total API usage
      const totalApiUsage = (apiCredits || []).reduce((sum, credit) => sum + (credit.used_credits || 0), 0);
      const totalCredits = (apiCredits || []).reduce((sum, credit) => sum + (credit.total_credits || 0), 0);

      return {
        serviceDistribution: Object.entries(serviceUsage).map(([name, value]) => ({
          name,
          value,
        })),
        apiUsage: totalApiUsage,
        totalCredits,
        activeServices: services?.filter(s => s.is_active).length || 0,
      };
    },
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StyledCard>
          <h3 className="font-semibold mb-6 text-lg">Service Usage Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageStats?.serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {usageStats?.serviceDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </StyledCard>

        <StyledCard>
          <h3 className="font-semibold text-lg">API Usage Overview</h3>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total API Calls</p>
              <p className="text-3xl font-bold">{usageStats?.apiUsage.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Credits Allocated</p>
              <p className="text-3xl font-bold">{usageStats?.totalCredits.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Active Services</p>
              <p className="text-3xl font-bold">{usageStats?.activeServices}</p>
            </div>
          </div>
        </StyledCard>
      </div>
    </div>
  );
};