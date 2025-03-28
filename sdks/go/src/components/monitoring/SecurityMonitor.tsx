import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const SecurityMonitor = () => {
  const { toast } = useToast();

  // Real-time monitoring for fraud alerts
  useEffect(() => {
    const channel = supabase
      .channel('security_alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fraud_alerts'
        },
        async (payload) => {
          console.log("New security alert detected:", payload);
          
          // Show real-time notification
          toast({
            title: "Security Alert",
            description: payload.new.description,
            variant: "destructive",
          });

          // Log detailed audit entry
          await supabase.from('audit_logs').insert({
            event_type: 'security_alert',
            entity_type: 'fraud_alert',
            entity_id: payload.new.id,
            changes: payload.new,
            performance_metrics: {
              detection_time: new Date().toISOString(),
              alert_type: payload.new.alert_type,
              severity: payload.new.severity
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Query recent security events
  const { data: recentAlerts } = useQuery({
    queryKey: ['security-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fraud_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Security Monitoring</h3>
      </div>

      <div className="space-y-4">
        {recentAlerts?.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg flex items-start gap-3 ${
              alert.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'
            }`}
          >
            <AlertTriangle className={`h-5 w-5 ${
              alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div>
              <p className="font-medium">{alert.alert_type}</p>
              <p className="text-sm text-gray-600">{alert.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(alert.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};