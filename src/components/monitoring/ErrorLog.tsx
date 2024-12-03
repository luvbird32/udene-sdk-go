import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

export const ErrorLog = () => {
  const { data: errors } = useQuery({
    queryKey: ["errors"],
    queryFn: async () => {
      const response = await fetch("/api/v1/errors");
      return response.json();
    },
    refetchInterval: 5000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Error Log</h3>
      <ScrollArea className="h-[200px]">
        {errors?.map((error: any) => (
          <div key={error.id} className="mb-2 p-2 bg-red-50 rounded">
            <p className="text-sm font-medium text-red-800">{error.message}</p>
            <p className="text-xs text-red-600">{new Date(error.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};