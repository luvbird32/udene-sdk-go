import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";

export const DataExtractionSection = () => {
  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const { data: tableInfo } = useQuery({
    queryKey: ["table-info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('table_info')
        .select('*');

      if (error) throw error;
      return data;
    }
  });

  const handleExtract = async () => {
    try {
      setIsExtracting(true);
      
      const { data, error } = await supabase
        .from('extracted_data')
        .select('data')
        .limit(1000)
        .single();

      if (error) throw error;

      // Convert data to selected format
      const formattedData = format === 'csv' 
        ? convertToCSV(data.data)
        : JSON.stringify(data.data, null, 2);

      // Create and trigger download
      const blob = new Blob([formattedData], { 
        type: format === 'csv' ? 'text/csv' : 'application/json' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted_data.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Extraction Complete",
        description: `Data has been extracted in ${format.toUpperCase()} format`,
      });
    } catch (error) {
      console.error('Extraction error:', error);
      toast({
        title: "Extraction Failed",
        description: "There was an error extracting the data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (!data?.length) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => 
      headers.map(header => 
        typeof obj[header] === 'object' 
          ? JSON.stringify(obj[header]) 
          : obj[header]
      ).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Data Extraction</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Select
            value={format}
            onValueChange={(value: "csv" | "json") => setFormat(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleExtract}
            disabled={isExtracting}
          >
            {isExtracting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Extract Data
              </>
            )}
          </Button>
        </div>

        {tableInfo && (
          <div className="text-sm text-muted-foreground">
            Available tables: {tableInfo.length}
          </div>
        )}
      </div>
    </Card>
  );
};