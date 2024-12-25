/**
 * @component ReportActions
 * @description Provides action buttons for saving templates and scheduling reports.
 * 
 * @example
 * ```tsx
 * <ReportActions
 *   onSaveTemplate={handleSaveTemplate}
 *   onScheduleReport={handleScheduleReport}
 * />
 * ```
 */
interface ReportActionsProps {
  /** Handler for saving report template */
  onSaveTemplate: () => Promise<void>;
  /** Handler for scheduling report generation */
  onScheduleReport: () => Promise<void>;
}

export const ReportActions = ({ onSaveTemplate, onScheduleReport }: ReportActionsProps) => {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Button onClick={onSaveTemplate} variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Save as Template
        </Button>
        <Button onClick={onScheduleReport} variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Schedule Report
        </Button>
      </div>
    </Card>
  );
};