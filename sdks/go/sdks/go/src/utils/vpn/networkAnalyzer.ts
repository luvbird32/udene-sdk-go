import { IceServer } from './types';

export const analyzeNetworkInterfaces = (localIPs: string[], iceServers: IceServer[]) => {
  const networkAnalysis = {
    multipleInterfaces: localIPs.length > 2,
    multiplePublicIPs: iceServers.length > 1,
    hasVPNRange: false,
  };

  // Check for VPN IP ranges
  networkAnalysis.hasVPNRange = localIPs.some(ip => {
    return (
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      (ip.startsWith('172.') && 
       parseInt(ip.split('.')[1]) >= 16 && 
       parseInt(ip.split('.')[1]) <= 31)
    );
  });

  return networkAnalysis;
};