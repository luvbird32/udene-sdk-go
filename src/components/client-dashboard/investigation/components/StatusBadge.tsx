import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-500/10 text-green-500 border-green-500/20',
          label: 'Completed'
        };
      case 'in_progress':
        return {
          color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          label: 'In Progress'
        };
      case 'pending':
        return {
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
          label: 'Pending'
        };
      default:
        return {
          color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="outline" className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Current investigation status</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};