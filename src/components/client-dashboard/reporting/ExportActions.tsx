/**
 * ExportActions Component
 * 
 * Provides action buttons for exporting data in different formats.
 * Supports both CSV and PDF export options with consistent styling.
 * 
 * Features:
 * - CSV export functionality
 * - PDF export functionality
 * - Visual feedback with icons
 * - Consistent button styling
 * 
 * @param {Object} props
 * @param {() => void} props.onExportCSV - Handler for CSV export
 * @param {() => void} props.onExportPDF - Handler for PDF export
 * 
 * @example
 * ```tsx
 * <ExportActions 
 *   onExportCSV={handleCSVExport} 
 *   onExportPDF={handlePDFExport} 
 * />
 * ```
 */
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