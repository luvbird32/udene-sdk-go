export const calculateScanProgress = (status: string, endTime: string | null) => {
  switch (status) {
    case 'in_progress':
      return !endTime ? 70 : 100;
    case 'completed':
      return 100;
    case 'failed':
      return 100;
    default:
      return 0;
  }
};