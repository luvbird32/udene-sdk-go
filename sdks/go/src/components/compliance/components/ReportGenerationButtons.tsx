import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ReportGenerationButtonsProps {
  userId: string | null;
  onGenerateReport: (type: string) => Promise<void>;
}

export const ReportGenerationButtons = ({ userId, onGenerateReport }: ReportGenerationButtonsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        className="glass-button flex items-center gap-2 relative"
        onClick={() => onGenerateReport('gdpr_data_access')}
        disabled={!userId}
        title={!userId ? "Please sign in to generate reports" : "Generate GDPR Data Access Report"}
      >
        <FileText className="h-4 w-4" />
        GDPR Data Access Report
      </Button>
      <Button 
        variant="outline"
        className="glass-button flex items-center gap-2"
        onClick={() => onGenerateReport('psd2_transaction_log')}
        disabled={!userId}
        title={!userId ? "Please sign in to generate reports" : "Generate PSD2 Transaction Log"}
      >
        <FileText className="h-4 w-4" />
        PSD2 Transaction Log
      </Button>
      <Button 
        variant="outline"
        className="glass-button flex items-center gap-2"
        onClick={() => onGenerateReport('fraud_audit_trail')}
        disabled={!userId}
        title={!userId ? "Please sign in to generate reports" : "Generate Fraud Audit Trail"}
      >
        <FileText className="h-4 w-4" />
        Fraud Audit Trail
      </Button>
    </div>
  );
};