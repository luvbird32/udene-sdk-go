import type { TransactionWithPatterns, RiskIndicator } from "@/types/risk";

export const analyzeDatingRiskIndicators = (transaction: TransactionWithPatterns): RiskIndicator[] => {
  const indicators: RiskIndicator[] = [];
  const { message_velocity, profile_changes, interaction_patterns, risk_factors } = transaction;

  if (message_velocity && message_velocity > 50) {
    indicators.push({
      iconType: 'message',
      title: "High Message Velocity",
      description: `Unusual messaging pattern detected: ${message_velocity.toFixed(1)} messages/hour`
    });
  }

  if (profile_changes && Object.keys(profile_changes).length > 0) {
    indicators.push({
      iconType: 'user',
      title: "Frequent Profile Changes",
      description: "Multiple profile updates in short period"
    });
  }

  if (interaction_patterns?.multiple_devices === true) {
    indicators.push({
      iconType: 'device',
      title: "Multiple Device Usage",
      description: "Access from unusual number of devices"
    });
  }

  if (risk_factors?.multiple_platforms) {
    indicators.push({
      iconType: 'mail',
      title: "Multiple Platform Usage",
      description: risk_factors.multiple_platforms
    });
  }

  if (risk_factors?.fraud_history) {
    indicators.push({
      iconType: 'info',
      title: "Previous Fraud History",
      description: risk_factors.fraud_history
    });
  }

  return indicators;
};