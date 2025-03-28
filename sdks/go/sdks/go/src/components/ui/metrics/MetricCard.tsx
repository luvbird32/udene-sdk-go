
import { Card } from "@/components/ui/card";
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  isLoading?: boolean;
  details?: React.ReactNode;
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  isLoading,
  details 
}: MetricCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2 text-foreground">{value}</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        {details && (
          <>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 flex items-center justify-center gap-2"
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
