export interface BotIndicators {
  unnaturalSpeed: boolean;
  linearMovement: boolean;
  consistentTiming: boolean;
  noHumanErrors: boolean;
  suspiciousPatterns: boolean;
}

export type BotDetectionResult = {
  isBot: boolean;
  indicators: Record<string, boolean>;
};