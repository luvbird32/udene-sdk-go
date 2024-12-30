import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export const ScanHistory = () => {
  const { data: scans } = useQuery({
    queryKey: ["dependency-scans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dependency_scans')
        .select('*')
        .order('scan_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Recent Scans</h4>
      <div className="space-y-2">
        {scans?.map((scan) => (
          <Card key={scan.id} className="p-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">
                  {scan.vulnerabilities_found} vulnerabilities
                </span>
                <span className="text-muted-foreground"> in {scan.total_dependencies} dependencies</span>
              </div>
              <span className="text-muted-foreground">
                {format(new Date(scan.scan_date), 'PPp')}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};