import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReportTypeSelectorProps {
  reportType: string;
  onReportTypeChange: (value: string) => void;
}

export const ReportTypeSelector = ({ reportType, onReportTypeChange }: ReportTypeSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Report Type</label>
      <Select value={reportType} onValueChange={onReportTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="transactions">Transactions</SelectItem>
          <SelectItem value="risk">Risk Analysis</SelectItem>
          <SelectItem value="compliance">Compliance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};