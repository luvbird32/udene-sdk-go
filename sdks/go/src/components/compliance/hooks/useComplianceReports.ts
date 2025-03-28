import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useComplianceReports = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      setUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const { data: reports, isLoading } = useQuery({
    queryKey: ["compliance-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const generateReport = async (type: string) => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate reports",
        variant: "destructive"
      });
      return;
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const { error } = await supabase
      .from('compliance_reports')
      .insert({
        report_type: type,
        report_period: `[${startOfMonth.toISOString()},${endOfMonth.toISOString()}]`,
        status: 'pending',
        generated_by: userId
      });

    if (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Report generation started"
      });
    }
  };

  return {
    reports,
    isLoading,
    userId,
    generateReport
  };
};