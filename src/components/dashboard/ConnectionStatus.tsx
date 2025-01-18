import { Card } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ConnectionStatus = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('metrics').select('*').limit(1);
        if (!error) {
          setConnectionStatus('connected');
          toast({
            title: "Connection Successful",
            description: "Your application is successfully connected to Udene",
          });
        } else {
          setConnectionStatus('error');
          throw error;
        }
      } catch (error) {
        console.error("Connection check failed:", error);
        setConnectionStatus('error');
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to Udene. Please check your configuration.",
        });
      }
    };

    checkConnection();
  }, [toast]);

  if (connectionStatus === 'checking') {
    return (
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent" />
          <span className="font-medium">Checking connection to Udene...</span>
        </div>
      </Card>
    );
  }

  if (connectionStatus === 'connected') {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-2 text-green-600">
          <Check className="h-5 w-5" />
          <span className="font-medium">Successfully connected to Udene</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-red-50 border-red-200">
      <div className="flex items-center space-x-2 text-red-600">
        <AlertTriangle className="h-5 w-5" />
        <span className="font-medium">Failed to connect to Udene</span>
      </div>
    </Card>
  );
};