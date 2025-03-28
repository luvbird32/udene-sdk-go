export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'text-red-500 bg-red-100';
    case 'high':
      return 'text-orange-500 bg-orange-100';
    case 'medium':
      return 'text-yellow-500 bg-yellow-100';
    case 'low':
      return 'text-green-500 bg-green-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};