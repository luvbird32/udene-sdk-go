import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeHtml } from '@/utils/security';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner';
import { useMetricsData } from '@/components/client-dashboard/metrics/useMetricsData';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch metrics data
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useMetricsData();
  
  // Implement session timeout monitoring
  useSessionTimeout();

  // Check for concurrent sessions
  useEffect(() => {
    const checkConcurrentSessions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: activities } = await supabase
            .from('user_activities')
            .select('*')
            .eq('profile_id', session.user.id)
            .eq('activity_type', 'login')
            .order('created_at', { ascending: false })
            .limit(2);

          if (activities && activities.length > 1) {
            const timeDiff = new Date(activities[0].created_at).getTime() - 
                           new Date(activities[1].created_at).getTime();
            
            // If less than 1 minute between logins from different devices/browsers
            if (timeDiff < 60000 && activities[0].metadata?.device_id !== activities[1].metadata?.device_id) {
              toast({
                title: "Security Alert",
                description: "Multiple active sessions detected. Please verify your account security.",
                variant: "destructive"
              });

              // Log security event
              await supabase.from('audit_logs').insert({
                event_type: 'concurrent_session_detected',
                user_id: session.user.id,
                changes: {
                  recent_activities: activities
                }
              });
            }
          }
        }
      } catch (error) {
        console.error('Error checking concurrent sessions:', error);
      }
    };

    checkConcurrentSessions();
  }, [toast]);

  // Protect against unauthenticated access
  useEffect(() => {
    if (!loading && !user) {
      console.log('Unauthorized access attempt to dashboard');
      navigate('/login');
      
      toast({
        title: "Access Denied",
        description: "Please log in to access the dashboard",
        variant: "destructive"
      });
    }
  }, [user, loading, navigate, toast]);

  // Show loading state while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Prevent rendering if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardContent 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
    </div>
  );
};

export default Dashboard;