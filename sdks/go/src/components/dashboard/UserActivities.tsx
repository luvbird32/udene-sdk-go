import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Clock, AlertTriangle, Shield } from "lucide-react";

interface UserActivity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

export const UserActivities = () => {
  // Get current user's profile ID
  const { data: currentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      console.log("Fetching current user...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      return user;
    },
  });

  const { data: activities, isLoading } = useQuery({
    queryKey: ["user-activities", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return [];
      
      console.log("Fetching user activities for:", currentUser.id);
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('profile_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as UserActivity[];
    },
    enabled: !!currentUser?.id,
  });

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'login':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'action':
        return <Activity className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Recent Activities</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Activities</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="mt-1">
                {getActivityIcon(activity.activity_type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
          {(!activities || activities.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              No recent activities
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};