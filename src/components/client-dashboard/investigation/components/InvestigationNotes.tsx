/**
 * InvestigationNotes Component
 * 
 * A textarea component for capturing detailed notes during security investigations.
 * Allows investigators to document observations, findings, and next steps.
 * 
 * Features:
 * - Multi-line text input
 * - Real-time updates
 * - Placeholder text for guidance
 * - Minimum height constraint
 * 
 * @param {Object} props
 * @param {string} props.value - The current content of the notes
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} props.onChange - Handler for note content changes
 * 
 * @example
 * ```tsx
 * <InvestigationNotes 
 *   value={notes} 
 *   onChange={handleNotesChange} 
 * />
 * ```
 */
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