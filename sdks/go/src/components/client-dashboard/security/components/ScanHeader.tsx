/**
 * ScanHeader Component
 * 
 * Displays the header section of a security scan result, showing the scan type
 * and total number of vulnerabilities found.
 * 
 * Features:
 * - Scan type indicator
 * - Total vulnerability count
 * - Visual status indicators
 * - Responsive layout
 * 
 * @param {Object} props
 * @param {number} props.totalVulnerabilities - Total number of vulnerabilities found
 * @param {string} props.scanType - Type of security scan performed
 * 
 * @example
 * ```tsx
 * <ScanHeader 
 *   totalVulnerabilities={5}
 *   scanType="Open Source"
 * />
 * ```
 */
import React from 'react';

export interface ScanHeaderProps {
  totalVulnerabilities?: number;
  scanType?: string;
  isScanning?: boolean;
  onStartScan?: () => void;
  onStopScan?: () => void;
}

export const ScanHeader: React.FC<ScanHeaderProps> = ({ 
  totalVulnerabilities = 0,
  scanType = 'Security',
  isScanning = false,
  onStartScan,
  onStopScan 
}) => {
  return (
    <div className="flex items-center justify-between p-4 dashboard-card">
      <div>
        <h2 className="text-lg font-semibold text-primary-light">{scanType} Scan</h2>
        <p className="text-sm text-muted-foreground">
          Total vulnerabilities found: {totalVulnerabilities}
        </p>
      </div>
      {(onStartScan || onStopScan) && (
        <div>
          {isScanning ? (
            <button 
              onClick={onStopScan} 
              className="px-4 py-2 text-white bg-destructive rounded hover:bg-destructive/90 transition-colors"
            >
              Stop Scan
            </button>
          ) : (
            <button 
              onClick={onStartScan} 
              className="dashboard-button px-4 py-2 rounded"
            >
              Start Scan
            </button>
          )}
        </div>
      )}
    </div>
  );
};