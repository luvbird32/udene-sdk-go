import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const ReportGuide = () => {
  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Getting Started</AlertTitle>
      <AlertDescription>
        Select a date range and report type to begin. You can save report templates for future use or schedule regular report generation.
      </AlertDescription>
    </Alert>
  );
};