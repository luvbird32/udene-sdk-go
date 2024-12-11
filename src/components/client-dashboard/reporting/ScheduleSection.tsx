import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Clock } from "lucide-react";

interface ScheduleSectionProps {
  scheduleName: string;
  scheduleFrequency: string;
  onScheduleNameChange: (value: string) => void;
  onScheduleFrequencyChange: (value: string) => void;
  onSaveTemplate: () => void;
  onScheduleReport: () => void;
}

export const ScheduleSection = ({
  scheduleName,
  scheduleFrequency,
  onScheduleNameChange,
  onScheduleFrequencyChange,
  onSaveTemplate,
  onScheduleReport,
}: ScheduleSectionProps) => {
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-4">Schedule Report</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Schedule name"
          value={scheduleName}
          onChange={(e) => onScheduleNameChange(e.target.value)}
        />
        <Select value={scheduleFrequency} onValueChange={onScheduleFrequencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Button onClick={onSaveTemplate} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
          <Button onClick={onScheduleReport} variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};