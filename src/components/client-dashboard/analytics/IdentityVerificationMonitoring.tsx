import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface VerificationStat {
  name: string;
  value: number;
}

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export const IdentityVerificationMonitoring = () => {
  const { toast } = useToast();
  const { data: verificationStats, isLoading, error } = useQuery({
    queryKey: ["identity-verification-stats"],
    queryFn: async () => {
      console.log("Fetching identity verification stats...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('identity_verifications')
        .select('status')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching verification stats:", error);
        throw error;
      }

      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({
        name,
        value
      }));
    },
    meta: {
      errorHandler: (error: Error) => {
        console.error("Identity verification error:", error);
        toast({
          title: "Error",
          description: "Failed to load verification statistics",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000,
  });

  const totalVerifications = verificationStats?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Identity Verification Status</h3>
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading verification data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Identity Verification Status</h3>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load verification data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!verificationStats || verificationStats.length === 0) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Identity Verification Status</h3>
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No verification data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Verification statistics will appear here once users complete identity verification.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Identity Verification Status</h3>
        </div>
        <Badge variant="outline">
          {totalVerifications} Total
        </Badge>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={verificationStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {verificationStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};