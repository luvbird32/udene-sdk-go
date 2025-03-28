import { Info } from "lucide-react";

interface DialogOverviewProps {
  description: string;
}

export const DialogOverview = ({ description }: DialogOverviewProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <Info className="h-5 w-5 text-muted-foreground mt-1" />
        <div>
          <h4 className="font-medium">Overview</h4>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};