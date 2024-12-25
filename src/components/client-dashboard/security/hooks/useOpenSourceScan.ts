/**
 * useOpenSourceScan Hook
 * 
 * Custom hook for fetching and managing open source security scan data.
 * Provides real-time updates and error handling for scan results.
 * 
 * Features:
 * - Automatic data refresh every 30 seconds
 * - Error handling with toast notifications
 * - Type-safe data handling
 * - Severity breakdown calculation
 * 
 * @returns {Object} Hook result object
 * @returns {OpenSourceScan | null} result.data - The latest scan data
 * @returns {boolean} result.isLoading - Loading state indicator
 * 
 * @example
 * ```tsx
 * const { data: latestScan, isLoading } = useOpenSourceScan();
 * if (isLoading) return <LoadingState />;
 * return <div>{latestScan?.vulnerabilities_found} vulnerabilities found</div>;
 * ```
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OpenSourceScan } from "@/integrations/supabase/types/security";

export const useOpenSourceScan = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["open-source-security"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('open_source_scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching open source scan:", error);
        toast({
          title: "Error",
          description: "Failed to fetch security scan results. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        return null;
      }

      let severityBreakdown = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      };

      if (data.severity_breakdown && typeof data.severity_breakdown === 'object') {
        const breakdown = data.severity_breakdown as Record<string, number>;
        severityBreakdown = {
          critical: breakdown.critical || 0,
          high: breakdown.high || 0,
          medium: breakdown.medium || 0,
          low: breakdown.low || 0
        };
      }

      return {
        ...data,
        severity_breakdown: severityBreakdown,
        remediation_steps: Array.isArray(data.remediation_steps) ? data.remediation_steps : []
      } as OpenSourceScan;
    },
    refetchInterval: 30000,
  });
};