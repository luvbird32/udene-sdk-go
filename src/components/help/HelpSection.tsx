
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface HelpSectionProps {
  title: string;
  icon: LucideIcon;
  content: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const HelpSection = ({ 
  title, 
  icon: Icon, 
  content, 
  isExpanded, 
  onToggle 
}: HelpSectionProps) => {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggle}
      className="border border-primary/10 rounded-lg p-4 transition-all duration-200 hover:border-primary/20"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between gap-3 cursor-pointer">
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-semibold m-0">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-primary" />
          ) : (
            <ChevronDown className="w-6 h-6 text-primary" />
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        <div className="pl-11 space-y-4">
          {content.map((item, itemIndex) => (
            <div key={itemIndex}>
              <p className="text-gray-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
