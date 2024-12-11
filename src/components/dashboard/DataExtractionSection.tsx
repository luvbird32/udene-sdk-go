import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Download, RefreshCw } from "lucide-react";

interface Extraction {
  id: string;
  extraction_type: string;
  status: string;
  file_url: string | null;
  record_count: number | null;
  created_at: string;
}

export const DataExtractionSection = () => {
  const { toast } = useToast();
  const [extractionType, setExtractionType] = useState("transactions");

  const { data: extractions, refetch } = useQuery({
    queryKey: ["admin-extractions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_data_extractions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Extraction[];
    }
  });

  const requestExtraction = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('admin_data_extractions')
        .insert({
          admin_id: user.id,
          extraction_type: extractionType,
          query_params: {},
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Extraction Requested",
        description: "Your data extraction has been queued.",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to request extraction",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6 border border-green-500/20 bg-black/50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-400">Data Extractions</h3>
        <Button variant="outline" onClick={() => refetch()} className="border-green-500/20">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="flex gap-4">
        <Select value={extractionType} onValueChange={setExtractionType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="fraud_alerts">Fraud Alerts</SelectItem>
            <SelectItem value="audit_logs">Audit Logs</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={requestExtraction} variant="outline" className="border-green-500/20">
          <Download className="h-4 w-4 mr-2" />
          Request Extraction
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-green-400">Recent Extractions</h4>
        <div className="space-y-2">
          {extractions?.map((extraction) => (
            <div
              key={extraction.id}
              className="flex justify-between items-center p-3 rounded-md border border-green-500/20 bg-black/30"
            >
              <div>
                <p className="text-sm font-medium">{extraction.extraction_type}</p>
                <p className="text-xs text-green-400">
                  {new Date(extraction.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {extraction.record_count ? `${extraction.record_count} records` : '-'}
                </span>
                <span className={`text-sm px-2 py-1 rounded ${
                  extraction.status === 'completed' ? 'bg-green-500/20' :
                  extraction.status === 'failed' ? 'bg-red-500/20' :
                  'bg-yellow-500/20'
                }`}>
                  {extraction.status}
                </span>
                {extraction.file_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(extraction.file_url, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};