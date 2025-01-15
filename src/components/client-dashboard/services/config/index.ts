import { FraudDetectionService } from "@/types/services";
import { abusePreventionServices } from "./abusePreventionServices";
import { BOT_PROTECTION_SERVICES } from "./botProtectionServices";
import { FRAUD_PROTECTION_SERVICES } from "./fraudProtectionServices";
import { IDENTITY_SERVICES } from "./identityServices";
import { SECURITY_SERVICES } from "./securityServices";

export const FRAUD_DETECTION_SERVICES: FraudDetectionService[] = [
  ...abusePreventionServices,
  ...BOT_PROTECTION_SERVICES,
  ...FRAUD_PROTECTION_SERVICES,
  ...IDENTITY_SERVICES,
  ...SECURITY_SERVICES
];

export * from "./abusePreventionServices";
export * from "./botProtectionServices";
export * from "./fraudProtectionServices";
export * from "./identityServices";
export * from "./securityServices";