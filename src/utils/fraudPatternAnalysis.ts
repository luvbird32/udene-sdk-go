import { Pattern, TransactionWithPatterns } from "@/types/fraud";

export const analyzeFraudPatterns = (transactions: TransactionWithPatterns[]): Pattern[] => {
  const cardNotPresentCount = transactions?.filter(t => t.card_present === false).length || 0;
  const recurringCount = transactions?.filter(t => t.recurring === true).length || 0;
  const highRiskCount = transactions?.filter(t => (t.risk_score || 0) >= 80).length || 0;
  
  const multipleDevicesCount = transactions?.filter(t => 
    t.interaction_patterns?.multiple_devices === true
  ).length || 0;
  
  const rapidProfileChangesCount = transactions?.filter(t => 
    Object.keys(t.profile_changes || {}).length > 3
  ).length || 0;
  
  const unusualLocationCount = transactions?.filter(t => 
    t.risk_factors?.location_mismatch === true
  ).length || 0;
  
  const highVelocityCount = transactions?.filter(t => 
    (t.message_velocity || 0) > 50
  ).length || 0;
  
  const vpnUsageCount = transactions?.filter(t => 
    t.interaction_patterns?.vpn_detected === true
  ).length || 0;
  
  const oddHoursCount = transactions?.filter(t => {
    const hour = new Date(t.timestamp).getHours();
    return hour >= 1 && hour <= 5;
  }).length || 0;

  const patterns: Pattern[] = [
    {
      type: "Card Not Present",
      count: cardNotPresentCount,
      description: "Fraudulent transactions without physical card presence",
      severity: 'high'
    },
    {
      type: "Multiple Devices",
      count: multipleDevicesCount,
      description: "Access from unusual number of devices",
      severity: 'high'
    },
    {
      type: "Rapid Profile Changes",
      count: rapidProfileChangesCount,
      description: "Multiple profile updates in short period",
      severity: 'medium'
    },
    {
      type: "Unusual Location",
      count: unusualLocationCount,
      description: "Transactions from unexpected locations",
      severity: 'high'
    },
    {
      type: "High Message Velocity",
      count: highVelocityCount,
      description: "Unusually high message frequency",
      severity: 'medium'
    },
    {
      type: "VPN Usage",
      count: vpnUsageCount,
      description: "Transactions through VPN connections",
      severity: 'medium'
    },
    {
      type: "Odd Hours Activity",
      count: oddHoursCount,
      description: "Suspicious activity during 1-5 AM",
      severity: 'medium'
    },
    {
      type: "Recurring Fraud",
      count: recurringCount,
      description: "Fraud detected in recurring transactions",
      severity: 'high'
    },
    {
      type: "High Risk Score",
      count: highRiskCount,
      description: "Transactions with risk score >= 80",
      severity: 'high'
    }
  ];

  return patterns.sort((a, b) => b.count - a.count);
};