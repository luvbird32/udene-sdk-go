import { IceServer } from './types';

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
        resolve({
          isVPN: false,
          publicIP: null,
          localIPs: Array.from(localIPs),
          iceServers
        });
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