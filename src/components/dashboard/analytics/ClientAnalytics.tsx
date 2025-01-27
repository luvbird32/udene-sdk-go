import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ClientAnalytics = () => {
  const { data: clientStats, error } = useQuery({
    queryKey: ["admin-client-analytics"],
    queryFn: async () => {
      // First check if user has admin access
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      // Then fetch profiles data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('created_at, account_type, status')
        .order('created_at', { ascending: true });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Group by date for growth chart
      const dailySignups = (profiles || []).reduce((acc: any, profile) => {
        const date = new Date(profile.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Account type distribution
      const accountTypes = (profiles || []).reduce((acc: any, profile) => {
        acc[profile.account_type] = (acc[profile.account_type] || 0) + 1;
        return acc;
      }, {});

      return {
        growthData: Object.entries(dailySignups).map(([date, count]) => ({
          date,
          signups: count,
        })),
        accountTypes: Object.entries(accountTypes).map(([type, count]) => ({
          type,
          count,
        })),
        totalClients: profiles?.length || 0,
        activeClients: profiles?.filter(p => p.status === 'active').length || 0,
      };
    },
    refetchInterval: 30000,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load analytics data'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Client Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={clientStats?.growthData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="signups" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Account Types Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientStats?.accountTypes}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold">Total Clients</h3>
          <p className="text-3xl font-bold mt-2">{clientStats?.totalClients || 0}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Active Clients</h3>
          <p className="text-3xl font-bold mt-2">{clientStats?.activeClients || 0}</p>
        </Card>
      </div>
    </div>
  );
};