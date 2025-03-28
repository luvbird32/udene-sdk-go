import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorLogEntry {
  id: string;
  message: string;
  timestamp: string;
}

export const ErrorLog = () => {
  const { data: errors, isLoading, error } = useQuery({
    queryKey: ["errors"],
    queryFn: async () => {
      try {
        console.log("Fetching error logs...");
        const { data, error } = await supabase
          .from('metrics')
          .select('id, metric_value, timestamp')
          .eq('metric_name', 'error')
          .order('timestamp', { ascending: false })
          .limit(10);
        
        if (error) {
          console.error('Error fetching error logs:', error);
          throw error;
        }

        return data?.map(entry => ({
          id: entry.id,
          message: entry.metric_value.toString(),
          timestamp: entry.timestamp
        })) || [];
      } catch (error) {
        console.error('Error in error logs query:', error);
        return [];
      }
    },
    refetchInterval: 5000,
  });

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Error Log</h3>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load error logs. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Error Log</h3>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Error Log</h3>
      <ScrollArea className="h-[200px]">
        {errors && errors.length > 0 ? (
          errors.map((error: ErrorLogEntry) => (
            <div key={error.id} className="mb-2 p-2 bg-red-50 rounded">
              <p className="text-sm font-medium text-red-800">{error.message}</p>
              <p className="text-xs text-red-600">
                {new Date(error.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 p-2">No errors to display</p>
        )}
      </ScrollArea>
    </Card>
  );
};