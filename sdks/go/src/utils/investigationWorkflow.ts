
import { supabase } from "@/integrations/supabase/client";
import type { InvestigationLog } from "@/integrations/supabase/types/investigation";

type Priority = 'critical' | 'high' | 'medium' | 'low';

interface RiskMetrics {
  velocityScore: number;
  patternMatchScore: number;
  historicalRiskScore: number;
  userTrustScore: number;
  deviceRiskScore: number;
  monetaryImpact: number;
}

export const calculatePriority = (metrics: RiskMetrics): Priority => {
  const weightedScore = 
    metrics.velocityScore * 0.2 +
    metrics.patternMatchScore * 0.2 +
    metrics.historicalRiskScore * 0.15 +
    metrics.userTrustScore * 0.15 +
    metrics.deviceRiskScore * 0.15 +
    metrics.monetaryImpact * 0.15;

  if (weightedScore >= 0.8) return 'critical';
  if (weightedScore >= 0.6) return 'high';
  if (weightedScore >= 0.4) return 'medium';
  return 'low';
};

export const automatedInvestigationSteps = async (investigationId: string) => {
  console.log("Starting automated investigation steps for:", investigationId);
  
  try {
    // Fetch investigation details
    const { data: investigation, error: fetchError } = await supabase
      .from('service_investigation_logs')
      .select('*')
      .eq('id', investigationId)
      .single();

    if (fetchError) throw fetchError;

    // Step 1: Device Pattern Analysis
    const devicePatterns = await analyzeDevicePatterns(investigation.user_id);
    
    // Step 2: Network Analysis
    const networkAnalysis = await performNetworkAnalysis(investigation);
    
    // Step 3: Behavioral Analysis
    const behavioralPatterns = await analyzeBehavioralPatterns(investigation);
    
    // Step 4: Historical Pattern Matching
    const historicalPatterns = await analyzeHistoricalPatterns(investigation);

    // Step 5: Calculate Risk Metrics
    const riskMetrics: RiskMetrics = {
      velocityScore: calculateVelocityScore(behavioralPatterns),
      patternMatchScore: calculatePatternMatchScore(historicalPatterns),
      historicalRiskScore: calculateHistoricalRiskScore(investigation),
      userTrustScore: calculateUserTrustScore(investigation.user_id),
      deviceRiskScore: calculateDeviceRiskScore(devicePatterns),
      monetaryImpact: calculateMonetaryImpact(investigation)
    };

    // Step 6: Determine Priority
    const priority = calculatePriority(riskMetrics);

    // Step 7: Generate Automated Findings
    const findings = {
      priority,
      device_analysis: devicePatterns,
      network_analysis: networkAnalysis,
      behavioral_analysis: behavioralPatterns,
      historical_analysis: historicalPatterns,
      risk_metrics: riskMetrics,
      automated_recommendations: generateRecommendations(riskMetrics, priority)
    };

    // Step 8: Update Investigation with Findings
    const { error: updateError } = await supabase
      .from('service_investigation_logs')
      .update({
        findings: findings,
        status: priority === 'critical' ? 'urgent_review' : 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', investigationId);

    if (updateError) throw updateError;

    // Step 9: Create Automated Sanitization Steps
    const sanitizationSteps = generateSanitizationSteps(findings);
    await updateSanitizationSteps(investigationId, sanitizationSteps);

    return { success: true, findings };
  } catch (error) {
    console.error("Automated investigation error:", error);
    return { success: false, error };
  }
};

const analyzeDevicePatterns = async (userId: string) => {
  const { data: devices } = await supabase
    .from('device_fingerprints')
    .select('*')
    .eq('user_id', userId);

  return {
    unique_devices: devices?.length || 0,
    suspicious_patterns: devices?.filter(d => d.is_suspicious).length || 0,
    risk_factors: analyzeDeviceRiskFactors(devices || [])
  };
};

const performNetworkAnalysis = async (investigation: InvestigationLog) => {
  const { data: activities } = await supabase
    .from('user_activities')
    .select('*')
    .eq('profile_id', investigation.user_id)
    .order('created_at', { ascending: false })
    .limit(100);

  return {
    ip_variance: calculateIpVariance(activities || []),
    location_anomalies: detectLocationAnomalies(activities || []),
    connection_patterns: analyzeConnectionPatterns(activities || [])
  };
};

const analyzeBehavioralPatterns = async (investigation: InvestigationLog) => {
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('customer_id', investigation.user_id)
    .order('created_at', { ascending: false })
    .limit(50);

  return {
    velocity_metrics: calculateVelocityMetrics(transactions || []),
    pattern_deviations: detectPatternDeviations(transactions || []),
    time_based_anomalies: analyzeTimeBasedPatterns(transactions || [])
  };
};

const analyzeHistoricalPatterns = async (investigation: InvestigationLog) => {
  const { data: history } = await supabase
    .from('service_investigation_logs')
    .select('*')
    .eq('user_id', investigation.user_id)
    .order('created_at', { ascending: false });

  return {
    previous_cases: history?.length || 0,
    pattern_similarity: calculatePatternSimilarity(history || [], investigation),
    recurring_issues: identifyRecurringIssues(history || [])
  };
};

// Helper functions for calculating scores
const calculateVelocityScore = (patterns: any) => {
  return Math.min(patterns.velocity_metrics.hourly_rate / 100, 1);
};

const calculatePatternMatchScore = (patterns: any) => {
  return Math.min(patterns.pattern_similarity / 100, 1);
};

const calculateHistoricalRiskScore = (investigation: any) => {
  return investigation.risk_score ? investigation.risk_score / 100 : 0.5;
};

const calculateUserTrustScore = (userId: string) => {
  // Default to medium trust if no data available
  return 0.5;
};

const calculateDeviceRiskScore = (patterns: any) => {
  return Math.min(patterns.suspicious_patterns / patterns.unique_devices || 0, 1);
};

const calculateMonetaryImpact = (investigation: any) => {
  return investigation.findings?.monetary_impact || 0.5;
};

// Helper functions for pattern analysis
const analyzeDeviceRiskFactors = (devices: any[]) => {
  return devices.map(d => ({
    fingerprint: d.fingerprint_hash,
    risk_level: d.risk_score > 70 ? 'high' : 'low',
    anomalies: detectDeviceAnomalies(d)
  }));
};

const calculateIpVariance = (activities: any[]) => {
  const uniqueIps = new Set(activities.map(a => a.metadata?.ip_address));
  return uniqueIps.size;
};

const detectLocationAnomalies = (activities: any[]) => {
  return activities
    .filter(a => a.metadata?.location_risk_score > 70)
    .map(a => ({
      timestamp: a.created_at,
      location: a.metadata?.location,
      risk_score: a.metadata?.location_risk_score
    }));
};

const analyzeConnectionPatterns = (activities: any[]) => {
  return {
    concurrent_sessions: calculateConcurrentSessions(activities),
    unusual_timing: detectUnusualTiming(activities),
    connection_velocity: calculateConnectionVelocity(activities)
  };
};

const calculateVelocityMetrics = (transactions: any[]) => {
  if (!transactions.length) return { hourly_rate: 0, daily_rate: 0 };
  
  const hourlyGroups = new Map();
  const dailyGroups = new Map();
  
  transactions.forEach(tx => {
    const date = new Date(tx.created_at);
    const hourKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
    const dailyKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    
    hourlyGroups.set(hourKey, (hourlyGroups.get(hourKey) || 0) + 1);
    dailyGroups.set(dailyKey, (dailyGroups.get(dailyKey) || 0) + 1);
  });
  
  return {
    hourly_rate: Math.max(...Array.from(hourlyGroups.values())),
    daily_rate: Math.max(...Array.from(dailyGroups.values()))
  };
};

const detectPatternDeviations = (transactions: any[]) => {
  return transactions
    .filter(tx => tx.risk_score > 70)
    .map(tx => ({
      transaction_id: tx.id,
      risk_score: tx.risk_score,
      risk_factors: tx.risk_factors
    }));
};

const analyzeTimeBasedPatterns = (transactions: any[]) => {
  const hourlyDistribution = new Array(24).fill(0);
  transactions.forEach(tx => {
    const hour = new Date(tx.created_at).getHours();
    hourlyDistribution[hour]++;
  });
  
  return {
    peak_hours: findPeakHours(hourlyDistribution),
    unusual_hours: detectUnusualHours(hourlyDistribution)
  };
};

const calculatePatternSimilarity = (history: any[], current: any) => {
  if (!history.length) return 0;
  
  const similarCases = history.filter(h => 
    h.investigation_type === current.investigation_type &&
    h.findings?.risk_metrics?.velocityScore > 0.7
  );
  
  return (similarCases.length / history.length) * 100;
};

const identifyRecurringIssues = (history: any[]) => {
  const issueCount = new Map();
  history.forEach(h => {
    const type = h.investigation_type;
    issueCount.set(type, (issueCount.get(type) || 0) + 1);
  });
  
  return Array.from(issueCount.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
};

const generateRecommendations = (metrics: RiskMetrics, priority: Priority) => {
  const recommendations = [];
  
  if (metrics.velocityScore > 0.7) {
    recommendations.push({
      type: 'rate_limiting',
      description: 'Implement stricter rate limiting',
      priority: 'high'
    });
  }
  
  if (metrics.deviceRiskScore > 0.6) {
    recommendations.push({
      type: 'device_verification',
      description: 'Additional device verification required',
      priority: 'high'
    });
  }
  
  if (metrics.userTrustScore < 0.4) {
    recommendations.push({
      type: 'account_review',
      description: 'Manual account review recommended',
      priority: 'medium'
    });
  }
  
  return recommendations;
};

const generateSanitizationSteps = (findings: any) => {
  const steps = [];
  
  if (findings.device_analysis.suspicious_patterns > 0) {
    steps.push({
      type: 'device_validation',
      description: 'Validate suspicious devices',
      automated: true,
      status: 'pending'
    });
  }
  
  if (findings.network_analysis.location_anomalies.length > 0) {
    steps.push({
      type: 'location_verification',
      description: 'Verify suspicious login locations',
      automated: true,
      status: 'pending'
    });
  }
  
  if (findings.risk_metrics.velocityScore > 0.7) {
    steps.push({
      type: 'rate_limit',
      description: 'Apply temporary rate limiting',
      automated: true,
      status: 'pending'
    });
  }
  
  return steps;
};

const updateSanitizationSteps = async (investigationId: string, steps: any[]) => {
  const { error } = await supabase
    .from('service_investigation_logs')
    .update({
      sanitization_steps: steps,
      updated_at: new Date().toISOString()
    })
    .eq('id', investigationId);

  if (error) throw error;
};

// Utility functions
const detectDeviceAnomalies = (device: any) => {
  const anomalies = [];
  
  if (device.webgl_fingerprint && device.webgl_fingerprint.includes('anomaly')) {
    anomalies.push('suspicious_webgl');
  }
  
  if (device.canvas_fingerprint && device.canvas_fingerprint.includes('anomaly')) {
    anomalies.push('suspicious_canvas');
  }
  
  if (device.audio_fingerprint && device.audio_fingerprint.includes('anomaly')) {
    anomalies.push('suspicious_audio');
  }
  
  return anomalies;
};

const calculateConcurrentSessions = (activities: any[]) => {
  const sessions = new Map();
  activities.forEach(a => {
    const hour = new Date(a.created_at).getTime();
    sessions.set(hour, (sessions.get(hour) || 0) + 1);
  });
  
  return Math.max(...Array.from(sessions.values()));
};

const detectUnusualTiming = (activities: any[]) => {
  return activities.filter(a => {
    const hour = new Date(a.created_at).getHours();
    return hour >= 0 && hour <= 5; // Consider midnight to 5 AM as unusual
  });
};

const calculateConnectionVelocity = (activities: any[]) => {
  if (activities.length < 2) return 0;
  
  const timeSpan = new Date(activities[0].created_at).getTime() - 
                   new Date(activities[activities.length - 1].created_at).getTime();
  
  return activities.length / (timeSpan / (1000 * 60 * 60)); // Connections per hour
};

const findPeakHours = (distribution: number[]) => {
  const max = Math.max(...distribution);
  return distribution
    .map((count, hour) => ({ hour, count }))
    .filter(({ count }) => count > max * 0.8);
};

const detectUnusualHours = (distribution: number[]) => {
  const mean = distribution.reduce((a, b) => a + b, 0) / distribution.length;
  const threshold = mean * 2;
  
  return distribution
    .map((count, hour) => ({ hour, count }))
    .filter(({ count }) => count > threshold);
};
