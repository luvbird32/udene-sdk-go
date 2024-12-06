import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ErrorLogEntry {
  id: string;
  message: string;
  timestamp: string;
}

export const ErrorLog = () => {
  const { data: errors, isLoading } = useQuery({
    queryKey: ["errors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .eq('metric_name', 'error')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching error logs:', error);
        return [];
      }

      return data?.map(entry => ({
        id: entry.id,
        message: entry.metric_value.toString(),
        timestamp: entry.timestamp
      })) || [];
    },
    refetchInterval: 5000,
  });

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