import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "destructive" | "outline";
}

export const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  disabled = false,
  variant = "outline" 
}: ActionButtonProps) => {
  return (
    <Button 
      variant={variant}
      className="flex items-center gap-2 text-white/60"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
};