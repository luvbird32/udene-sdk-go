import { FraudDetectionService } from "@/types/services";
import { abusePreventionServices } from "./abusePreventionServices";
import { botProtectionServices } from "./botProtectionServices";
import { fraudProtectionServices } from "./fraudProtectionServices";
import { identityServices } from "./identityServices";
import { securityServices } from "./securityServices";

export const FRAUD_DETECTION_SERVICES: FraudDetectionService[] = [
  ...abusePreventionServices,
  ...botProtectionServices,
  ...fraudProtectionServices,
  ...identityServices,
  ...securityServices
];

export * from "./abusePreventionServices";
export * from "./botProtectionServices";
export * from "./fraudProtectionServices";
export * from "./identityServices";
export * from "./securityServices";