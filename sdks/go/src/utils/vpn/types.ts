export interface IceServer {
  ip: string;
  type: string;
}

export interface VPNDetectionResult {
  isVPN: boolean;
  publicIP: string | null;
  localIPs: string[];
  iceServers: IceServer[];
}

export interface VPNRiskAssessment {
  riskLevel: 'low' | 'medium' | 'high';
  details: string[];
}