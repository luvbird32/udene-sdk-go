import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Custom hook for fetching and managing user activity data
 * 
 * Retrieves user activity statistics and security investigation logs,
 * processes them into a grouped format by date, and handles error states.
 * 
 * @returns {Object} Query result containing activity data, loading state, and error state
 */
export const useActivityData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["user-activity-stats"],
    queryFn: async () => {
      // Get current user session
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch both activity and security logs in parallel
      const [activitiesResponse, securityResponse] = await Promise.all([
        // Fetch user activities with type and timestamp
        supabase
          .from('user_activities')
          .select('activity_type, created_at')
          .order('created_at', { ascending: true })
          .limit(100),
        // Fetch security investigation logs for the user
        supabase
          .from('service_investigation_logs')
          .select('investigation_type, created_at, status')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
      ]);

      if (activitiesResponse.error) throw activitiesResponse.error;
      if (securityResponse.error) throw securityResponse.error;

      // Group activities by date with counts
      const groupedActivities = activitiesResponse.data?.reduce((acc: Record<string, any>, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = {
            date,
            activityCount: 0,
            securityEvents: 0
          };
        }
        acc[date].activityCount += 1;
        return acc;
      }, {});

      // Add security events to grouped data
      securityResponse.data?.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString();
        if (!groupedActivities[date]) {
          groupedActivities[date] = {
            date,
            activityCount: 0,
            securityEvents: 0
          };
        }
        groupedActivities[date].securityEvents += 1;
      });

      return Object.values(groupedActivities || {});
    },
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load user activity data",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000, // Refresh data every 30 seconds
  });
};