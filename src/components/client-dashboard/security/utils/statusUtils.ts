/**
 * Utility functions for handling security status display and styling
 */

/**
 * Get the appropriate color classes for a status badge based on the status value.
 * 
 * @param {string} status - Status value to determine color scheme
 * @returns {string} Tailwind CSS classes for status styling
 */
export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500/10 text-green-500';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'inactive':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

/**
 * Determine the appropriate badge variant based on priority level.
 * 
 * @param {string | undefined} level - Priority level of the item
 * @returns {string | undefined} Badge variant name for styling
 */
export const getPriorityBadge = (level: string | undefined) => {
  switch (level?.toLowerCase()) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning';
    case 'low':
      return 'secondary';
    default:
      return undefined;
  }
};