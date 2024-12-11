import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface ExportActionsProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export const ExportActions = ({ onExportCSV, onExportPDF }: ExportActionsProps) => {
  return (
    <div className="space-x-2">
      <Button onClick={onExportCSV} variant="outline">
        <FileDown className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      <Button onClick={onExportPDF} variant="outline">
        <FileDown className="mr-2 h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
};