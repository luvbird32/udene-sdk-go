import { v5 as uuidv5 } from 'uuid';

const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

interface BrowserInfo {
  userAgent: string;
  platform: string;
  cookiesEnabled: boolean;
  doNotTrack: string | null;
}

interface HardwareInfo {
  deviceMemory?: number;
  hardwareConcurrency: number;
  maxTouchPoints: number;
}

interface NetworkInfo {
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export const generateDeviceFingerprint = async () => {
  const browserInfo: BrowserInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
  };

  const osInfo = {
    platform: navigator.platform,
    oscpu: (navigator as any).oscpu,
    language: navigator.language,
  };

  const hardwareInfo: HardwareInfo = {
    deviceMemory: (navigator as any).deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
  };

  const networkInfo: NetworkInfo = {};
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    networkInfo.connectionType = connection?.type;
    networkInfo.effectiveType = connection?.effectiveType;
    networkInfo.downlink = connection?.downlink;
    networkInfo.rtt = connection?.rtt;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let canvasFingerprint = '';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = '#069';
    ctx.fillText('Hello, world!', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Hello, world!', 4, 17);
    canvasFingerprint = canvas.toDataURL();
  }

  const components = [
    JSON.stringify(browserInfo),
    JSON.stringify(osInfo),
    JSON.stringify(hardwareInfo),
    JSON.stringify(networkInfo),
    canvasFingerprint,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];

  const fingerprintHash = uuidv5(components.join(''), NAMESPACE);

  return {
    fingerprint_hash: fingerprintHash,
    browser_info: browserInfo,
    os_info: osInfo,
    hardware_info: hardwareInfo,
    network_info: networkInfo,
    canvas_fingerprint: canvasFingerprint,
    timezone_info: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language_info: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    color_depth: screen.colorDepth,
  };
};