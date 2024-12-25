/**
 * @component ScanHeader
 * @description Header component for the security scan section that displays scan status and controls.
 * Shows the current scan type, progress, and provides options to start/stop scans.
 * 
 * @param {Object} props - Component props
 * @param {string} props.scanType - Type of security scan being performed
 * @param {boolean} props.isScanning - Whether a scan is currently in progress
 * @param {() => void} props.onStartScan - Callback function to initiate a new scan
 * @param {() => void} props.onStopScan - Callback function to stop an ongoing scan
 * 
 * @example
 * ```tsx
 * <ScanHeader 
 *   scanType="vulnerability"
 *   isScanning={false}
 *   onStartScan={() => startNewScan()}
 *   onStopScan={() => stopCurrentScan()}
 * />
 * ```
 */
import React from 'react';

interface ScanHeaderProps {
  scanType: string;
  isScanning: boolean;
  onStartScan: () => void;
  onStopScan: () => void;
}

export const ScanHeader: React.FC<ScanHeaderProps> = ({ scanType, isScanning, onStartScan, onStopScan }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold">{scanType} Scan</h2>
      <div>
        {isScanning ? (
          <button onClick={onStopScan} className="px-4 py-2 text-white bg-red-500 rounded">
            Stop Scan
          </button>
        ) : (
          <button onClick={onStartScan} className="px-4 py-2 text-white bg-blue-500 rounded">
            Start Scan
          </button>
        )}
      </div>
    </div>
  );
};
