/**
 * Calculate the progress percentage of a security scan based on its status and completion time.
 * 
 * @param {string} status - Current status of the scan ('in_progress', 'completed', 'failed', etc.)
 * @param {string | null} endTime - Timestamp when the scan completed, or null if still running
 * @returns {number} Progress percentage (0-100)
 */
export const calculateScanProgress = (status: string, endTime: string | null) => {
  switch (status) {
    case 'in_progress':
      // Show 70% progress for ongoing scans without end time
      return !endTime ? 70 : 100;
    case 'completed':
      // Completed scans show full progress
      return 100;
    case 'failed':
      // Failed scans also show as complete but with error state
      return 100;
    default:
      // Default to 0 for unknown states
      return 0;
  }
};