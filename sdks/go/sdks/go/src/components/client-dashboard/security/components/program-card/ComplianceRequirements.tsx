import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface ComplianceRequirementsProps {
  requirements: Array<string>;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ComplianceRequirements = ({ requirements, isExpanded, onToggle }: ComplianceRequirementsProps) => {
  return (
    <div className="space-y-4">
      <button onClick={onToggle} className="text-lg font-semibold">
        {isExpanded ? "Hide Compliance Requirements" : "Show Compliance Requirements"}
      </button>
      {isExpanded && (
        <Accordion type="single" collapsible>
          {requirements.map((requirement, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{requirement}</AccordionTrigger>
              <AccordionContent>
                <p>Details about {requirement} compliance requirement.</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
