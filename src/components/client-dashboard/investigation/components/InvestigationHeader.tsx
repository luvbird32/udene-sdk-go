import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvestigationHeaderProps {
  onNewInvestigation: () => void;
}

export const InvestigationHeader = ({ onNewInvestigation }: InvestigationHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Investigation Logs</h2>
      </div>
      <Button onClick={onNewInvestigation}>
        <Plus className="h-4 w-4 mr-2" />
        New Investigation
      </Button>
    </div>
  );
};