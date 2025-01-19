import { AlertCircle } from "lucide-react";

export const EmptyState = () => (
  <div className="h-[300px] flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-white/60 mx-auto mb-2" />
      <p className="text-white">No transaction data available</p>
    </div>
  </div>
);