import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: Error;
  title?: string;
}

export const ErrorState = ({ error, title = "Error" }: ErrorStateProps) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {error.message || "An unexpected error occurred. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};