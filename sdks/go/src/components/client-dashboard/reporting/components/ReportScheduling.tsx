import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface ReportSchedulingProps {
  scheduleName: string;
  scheduleFrequency: string;
  onScheduleNameChange: (name: string) => void;
  onScheduleFrequencyChange: (frequency: string) => void;
}

export const ReportScheduling = ({
  scheduleName,
  scheduleFrequency,
  onScheduleNameChange,
  onScheduleFrequencyChange,
}: ReportSchedulingProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <Label htmlFor="schedule-name">Schedule Name</Label>
        <Input
          id="schedule-name"
          value={scheduleName}
          onChange={(e) => onScheduleNameChange(e.target.value)}
          placeholder="Enter schedule name"
        />
      </div>
      <div>
        <Label htmlFor="frequency">Frequency</Label>
        <Select value={scheduleFrequency} onValueChange={onScheduleFrequencyChange}>
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};