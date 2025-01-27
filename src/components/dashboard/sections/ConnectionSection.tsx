import { SystemHealth } from "@/components/client-dashboard/monitoring/SystemHealth";

/**
 * ConnectionSection Component
 * 
 * Displays comprehensive system health monitoring including:
 * - Overall system status
 * - API connectivity
 * - Database connection status
 * - Cache system availability
 * - Real-time health metrics
 */
export const ConnectionSection = () => {
  return (
    <div className="w-full">
      <SystemHealth />
    </div>
  );
};