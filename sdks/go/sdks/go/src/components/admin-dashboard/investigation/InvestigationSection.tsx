import { useState } from "react";
import { Card } from "@/components/ui/card";
import { InvestigationNav } from "./InvestigationNav";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  "Active Investigations",
  "Completed Investigations",
  "Investigation Analytics"
];

export const InvestigationSection = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentSectionIndex((prev) => 
      prev > 0 ? prev - 1 : sections.length - 1
    );
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => 
      prev < sections.length - 1 ? prev + 1 : 0
    );
  };

  const renderSection = () => {
    switch (currentSectionIndex) {
      case 0:
        return <InvestigationLogs filterStatus="in_progress" />;
      case 1:
        return <InvestigationLogs filterStatus="completed" />;
      case 2:
        return (
          <div className="text-center py-8 text-muted-foreground">
            Investigation analytics coming soon
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Return to Admin Dashboard
        </Button>
      </div>
      <Card className="p-6">
        <InvestigationNav
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentSection={sections[currentSectionIndex]}
        />
        {renderSection()}
      </Card>
    </div>
  );
};