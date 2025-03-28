import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StyledCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const StyledCard = ({ children, className, ...props }: StyledCardProps) => {
  return (
    <Card 
      className={cn(
        "p-6 shadow-lg border-2 border-border/50 hover:border-border/80 transition-colors",
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  );
};