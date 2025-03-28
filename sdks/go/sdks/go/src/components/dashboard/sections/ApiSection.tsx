import { ApiCreditsDisplay } from "@/components/client-dashboard/ApiCreditsDisplay";
import ErrorBoundary from "@/components/ErrorBoundary";

export const ApiSection = () => {
  return (
    <ErrorBoundary>
      <ApiCreditsDisplay />
    </ErrorBoundary>
  );
};