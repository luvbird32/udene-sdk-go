import { Card } from "@/components/ui/card";
import { useComplianceReports } from "./hooks/useComplianceReports";
import { ReportGenerationButtons } from "./components/ReportGenerationButtons";
import { ReportList } from "./components/ReportList";

export const ComplianceReporting = () => {
  const { reports, isLoading, userId, generateReport } = useComplianceReports();

  if (isLoading) {
    return (
      <Card className="glass-card p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-black/20 rounded w-1/4"></div>
          <div className="h-32 bg-black/20 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">Generate Compliance Report</h3>
        {!userId && (
          <p className="text-yellow-400 mb-4">Please sign in to generate reports</p>
        )}
        <ReportGenerationButtons userId={userId} onGenerateReport={generateReport} />
      </Card>
      
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">Recent Reports</h3>
        <ReportList reports={reports || []} />
      </Card>
    </div>
  );
};