import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginErrorAlertProps {
  error: string | null;
}

/**
 * Displays login-related error messages in a styled alert component
 * Only renders when there is an error message to display
 */
export const LoginErrorAlert = ({ error }: LoginErrorAlertProps) => {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="border-red-500 bg-red-50">
      <AlertDescription className="text-sm font-medium text-red-800">
        {error}
      </AlertDescription>
    </Alert>
  );
};