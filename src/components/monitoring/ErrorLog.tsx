import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export const ErrorLog = () => {
  const { toast } = useToast();
  
  const { data: errors, isLoading } = useQuery({
    queryKey: ["errors"],
    queryFn: async () => {
      const response = await fetch("/api/v1/errors");
      return response.json();
    },
    refetchInterval: 5000,
    retry: 3,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error Loading Error Logs",
          description: error.message || "Failed to load error logs",
          variant: "destructive",
        });
      },
    },
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Error Log</h3>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          Loading error logs...
        </div>
      </Card>
    );
  }

  const hasErrors = errors && errors.length > 0;

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Error Log</h3>
      <ScrollArea className="h-[200px]">
        {!hasErrors ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p>No errors to display</p>
          </div>
        ) : (
          errors.map((error: any) => (
            <div key={error.id} className="mb-2 p-2 bg-red-50 rounded">
              <p className="text-sm font-medium text-red-800">{error.message}</p>
              <p className="text-xs text-red-600">
                {new Date(error.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </ScrollArea>
    </Card>
  );
};