import { Textarea } from "@/components/ui/textarea";

interface InvestigationNotesProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InvestigationNotes = ({ value, onChange }: InvestigationNotesProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Notes</label>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Enter investigation details, observations, and initial findings..."
        className="min-h-[100px]"
      />
    </div>
  );
};