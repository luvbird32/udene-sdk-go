import { MessageCircle, UserCog, Smartphone, Mail, Info } from "lucide-react";
import type { Transaction, RiskIndicator } from "@/types/risk";

/**
 * Analyzes transaction data to identify dating-specific risk indicators
 */
export const analyzeDatingRiskIndicators = (transaction: Transaction): RiskIndicator[] => {
  const indicators: RiskIndicator[] = [];
  const { message_velocity, profile_changes, interaction_patterns, risk_factors } = transaction;

  // Check message velocity patterns
  if (message_velocity && message_velocity > 50) {
    indicators.push({
      icon: <MessageCircle className="w-4 h-4 mt-1 text-muted-foreground" />,
      title: "High Message Velocity",
      description: `Unusual messaging pattern detected: ${message_velocity.toFixed(1)} messages/hour`
    });
  }

  // Check profile changes
  if (Object.keys(profile_changes || {}).length > 0) {
    indicators.push({
      icon: <UserCog className="w-4 h-4 mt-1 text-muted-foreground" />,
      title: "Frequent Profile Changes",
      description: "Multiple profile updates in short period"
    });
  }

  // Check device patterns
  if (interaction_patterns?.multiple_devices === true) {
    indicators.push({
      icon: <Smartphone className="w-4 h-4 mt-1 text-muted-foreground" />,
      title: "Multiple Device Usage",
      description: "Access from unusual number of devices"
    });
  }

  // Check platform usage and fraud history
  if (risk_factors?.multiple_platforms) {
    indicators.push({
      icon: <Mail className="w-4 h-4 mt-1 text-muted-foreground" />,
      title: "Multiple Platform Usage",
      description: risk_factors.multiple_platforms
    });
  }

  if (risk_factors?.fraud_history) {
    indicators.push({
      icon: <Info className="w-4 h-4 mt-1 text-muted-foreground" />,
      title: "Previous Fraud History",
      description: risk_factors.fraud_history
    });
  }

  return indicators;
};