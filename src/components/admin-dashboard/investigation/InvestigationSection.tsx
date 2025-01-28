import { useState } from "react";
import { Card } from "@/components/ui/card";
import { InvestigationNav } from "./InvestigationNav";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";

const sections = [
  "Active Investigations",
  "Completed Investigations",
  "Investigation Analytics"
];

export const InvestigationSection = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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
    <Card className="p-6">
      <InvestigationNav
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentSection={sections[currentSectionIndex]}
      />
      {renderSection()}
    </Card>
  );
};