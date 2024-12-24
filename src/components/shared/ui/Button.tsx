import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonProps } from "@/types/ui";

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ShadcnButton {...props}>{children}</ShadcnButton>;
};