import { Textarea } from "@/components/ui/textarea";

interface InvestigationNotesProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  showCount?: boolean;
}

export const InvestigationNotes = ({ 
  value, 
  onChange, 
  maxLength = 500,
  showCount = false 
}: InvestigationNotesProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60">Notes</label>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Enter investigation details, observations, and initial findings..."
        className="min-h-[100px] resize-y"
        maxLength={maxLength}
      />
      {showCount && (
        <div className="text-xs text-white/60 text-right">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};