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

export const generateMockScanResults = () => ({
  status: 'completed',
  end_time: new Date().toISOString(),
  total_vulnerabilities: Math.floor(Math.random() * 10),
  severity_breakdown: {
    critical: Math.floor(Math.random() * 3),
    high: Math.floor(Math.random() * 4),
    medium: Math.floor(Math.random() * 5),
    low: Math.floor(Math.random() * 6)
  },
  findings: []
});