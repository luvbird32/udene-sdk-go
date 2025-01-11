import { Badge } from "@/components/ui/badge";
import { Pattern } from "@/types/fraud";

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard = ({ pattern }: PatternCardProps) => {
  const getBadgeVariant = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-2 p-2 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex justify-between items-center">
        <span className="font-medium">{pattern.type}</span>
        <div className="flex gap-2 items-center">
          {pattern.severity && (
            <Badge variant={getBadgeVariant(pattern.severity)} className="capitalize">
              {pattern.severity}
            </Badge>
          )}
          <Badge variant="outline">{pattern.count} cases</Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{pattern.description}</p>
    </div>
  );
};