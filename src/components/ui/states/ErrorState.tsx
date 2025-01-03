interface ErrorStateProps {
  error: Error | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-destructive mb-2">Error</h4>
        <p className="text-muted-foreground">{error?.message || "An unexpected error occurred"}</p>
      </div>
    </div>
  );
};