export * from './apiKeyUtils';
export * from './botDetection';
export * from './deviceFingerprint';
export * from './fraudPatternAnalysis';
export * from './indexedDB';
export * from './interactionTracker';
export * from './riskAnalysis';
export * from './vpn';
export * from './websocket';

export const formatServiceType = (type: string): string => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};