import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const SavedTemplates = () => {
  const { data: savedTemplates, isLoading: templatesLoading } = useQuery({
    queryKey: ["report-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .eq('status', 'template')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div>
      <label className="block text-sm text-white/60 mb-2">Saved Templates</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={savedTemplates?.length ? "Load template" : "No templates saved"} />
        </SelectTrigger>
        <SelectContent>
          {savedTemplates?.length === 0 ? (
            <SelectItem value="none" disabled>No saved templates</SelectItem>
          ) : (
            savedTemplates?.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.report_type}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};