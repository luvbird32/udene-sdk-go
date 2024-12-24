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
  const baseClasses = "flex items-center gap-2";
  const variantClasses = variant === "destructive" ? "text-destructive hover:text-destructive" : "";
  
  return (
    <Button 
      variant={variant}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
};