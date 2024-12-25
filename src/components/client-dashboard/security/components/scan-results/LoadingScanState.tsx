/**
 * @component LoadingScanState
 * @description Displays a loading state while security scan results are being fetched.
 * Shows a placeholder animation and message to indicate that scan data is loading.
 *
 * @example
 * ```tsx
 * // Use when fetching scan results
 * if (isLoading) {
 *   return <LoadingScanState />;
 * }
 * ```
 */
export const LoadingScanState = () => {
  return (
    <div className="text-center p-4 text-muted-foreground">
      Loading scan results...
    </div>
  );
};