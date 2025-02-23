
import { Card } from "@/components/ui/card";
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  details?: React.ReactNode;
}

export const MetricCard = ({ title, value, icon: Icon, description, details }: MetricCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-6 h-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between space-x-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{value}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Icon className="h-6 w-6 text-muted-foreground shrink-0" />
        </div>

        {details && (
          <>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-6 flex items-center justify-center gap-2"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show More Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              {details}
            </CollapsibleContent>
          </>
        )}
      </Collapsible>
    </Card>
  );
};
