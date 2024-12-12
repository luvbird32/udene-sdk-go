import { BOT_PROTECTION_SERVICES } from './botProtectionServices';
import { FRAUD_PROTECTION_SERVICES } from './fraudProtectionServices';
import { ABUSE_PREVENTION_SERVICES } from './abusePreventionServices';
import { SECURITY_SERVICES } from './securityServices';
import { IDENTITY_SERVICES } from './identityServices';

export const FRAUD_DETECTION_SERVICES = [
  ...BOT_PROTECTION_SERVICES,
  ...FRAUD_PROTECTION_SERVICES,
  ...ABUSE_PREVENTION_SERVICES,
  ...SECURITY_SERVICES,
  ...IDENTITY_SERVICES
];