export interface IceServer {
  ip: string;
  type: string;
}

export const detectVPNConnection = (): Promise<{
  isVPN: boolean;
  publicIP: string | null;
  localIPs: string[];
  iceServers: IceServer[];
}> => {
  return new Promise((resolve) => {
    const iceServers = [];
    const localIPs: Set<string> = new Set();
    
    // Create RTCPeerConnection with STUN servers
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ]
    });

    // Handle ICE candidate events
    pc.onicecandidate = (event) => {
      if (!event.candidate) {
        pc.close();
        const result = {
          isVPN: false,
          publicIP: null,
          localIPs: Array.from(localIPs),
          iceServers
        };

        // VPN detection logic
        if (result.localIPs.length > 0) {
          const hasVPNRange = result.localIPs.some(ip => {
            // Common VPN IP ranges
            return (
              ip.startsWith('10.') ||
              ip.startsWith('192.168.') ||
              (ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31)
            );
          });
          result.isVPN = hasVPNRange;
        }

        resolve(result);
        return;
      }

      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
      const ipMatch = ipRegex.exec(event.candidate.candidate);
      
      if (ipMatch) {
        const ip = ipMatch[1];
        if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1]))/)) {
          localIPs.add(ip);
        } else {
          iceServers.push({
            ip,
            type: event.candidate.type || 'unknown'
          });
        }
      }
    };

    // Create data channel (required for STUN/TURN)
    pc.createDataChannel('');

    // Create offer to generate ICE candidates
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(err => {
        console.error('Error creating WebRTC offer:', err);
        resolve({
          isVPN: false,
          publicIP: null,
          localIPs: [],
          iceServers: []
        });
      });

    // Set timeout to handle cases where ICE gathering takes too long
    setTimeout(() => {
      if (pc.iceGatheringState !== 'complete') {
        pc.close();
        resolve({
          isVPN: false,
          publicIP: null,
          localIPs: Array.from(localIPs),
          iceServers
        });
      }
    }, 5000);
  });
};

// Function to analyze VPN risk based on WebRTC detection
export const analyzeVPNRisk = async (): Promise<{
  riskLevel: 'low' | 'medium' | 'high';
  details: string[];
}> => {
  try {
    const vpnData = await detectVPNConnection();
    const riskFactors: string[] = [];

    if (vpnData.isVPN) {
      riskFactors.push('VPN connection detected');
    }

    if (vpnData.localIPs.length > 2) {
      riskFactors.push('Multiple network interfaces detected');
    }

    if (vpnData.iceServers.length > 1) {
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
  } catch (error) {
    console.error('Error analyzing VPN risk:', error);
    return {
      riskLevel: 'low',
      details: ['Error analyzing VPN connection']
    };
  }
};