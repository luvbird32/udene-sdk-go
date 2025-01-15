import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-lg">Loading Udene Dashboard...</p>
    </div>
  );
};