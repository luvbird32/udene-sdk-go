import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvestigationNavProps {
  onPrevious: () => void;
  onNext: () => void;
  currentSection: string;
}

export const InvestigationNav = ({ onPrevious, onNext, currentSection }: InvestigationNavProps) => {
  return (
    <div className="flex items-center justify-between mb-6 bg-muted/50 p-4 rounded-lg">
      <Button variant="ghost" onClick={onPrevious} className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
        Previous Section
      </Button>
      <h2 className="text-xl font-semibold">{currentSection}</h2>
      <Button variant="ghost" onClick={onNext} className="flex items-center gap-2">
        Next Section
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};