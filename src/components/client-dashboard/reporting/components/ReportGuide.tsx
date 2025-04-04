import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

/**
 * @component ReportGuide
 * @description Displays an informational alert with guidance on how to use the reporting system.
 * 
 * @example
 * ```tsx
 * <ReportGuide />
 * ```
 */
export const ReportGuide = () => {
  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Getting Started</AlertTitle>
      <AlertDescription className="text-white/60">
        Select a date range and report type to begin. You can save report templates for future use or schedule regular report generation.
      </AlertDescription>
    </Alert>
  );
};