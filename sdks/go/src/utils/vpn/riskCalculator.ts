interface NetworkAnalysis {
  multipleInterfaces: boolean;
  multiplePublicIPs: boolean;
  hasVPNRange: boolean;
}

export const calculateVPNRisk = async (networkAnalysis: NetworkAnalysis): Promise<{
  riskLevel: 'low' | 'medium' | 'high';
  details: string[];
}> => {
  const riskFactors: string[] = [];

  if (networkAnalysis.hasVPNRange) {
    riskFactors.push('VPN connection detected');
  }

  if (networkAnalysis.multipleInterfaces) {
    riskFactors.push('Multiple network interfaces detected');
  }

  if (networkAnalysis.multiplePublicIPs) {
    riskFactors.push('Multiple public IPs detected');
  }

  // Determine risk level based on factors
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (riskFactors.length >= 2) {
    riskLevel = 'high';
  } else if (riskFactors.length === 1) {
    riskLevel = 'medium';
  }

  return {
    riskLevel,
    details: riskFactors
  };
};