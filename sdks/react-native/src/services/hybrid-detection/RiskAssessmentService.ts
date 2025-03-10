
/**
 * RiskAssessmentService.ts
 * 
 * Handles local risk assessment and merging with cloud assessments.
 */

import { DeviceInfo, NetworkInfo, TransactionData, RiskAssessment } from '../../types';

/**
 * Service for handling risk assessment operations
 */
export class RiskAssessmentService {
  private localRiskThreshold: number;

  /**
   * Create a new risk assessment service
   * @param localRiskThreshold - Threshold for local risk assessment (0-100)
   */
  constructor(localRiskThreshold: number = 50) {
    this.localRiskThreshold = localRiskThreshold;
  }

  /**
   * Perform quick local analysis using on-device algorithms
   * This provides immediate feedback without network latency
   * @param transaction - Transaction data to analyze
   * @param deviceInfo - Information about the device
   * @param networkInfo - Information about the network
   * @returns Risk assessment result
   */
  public performLocalAnalysis(
    transaction: TransactionData,
    deviceInfo: DeviceInfo,
    networkInfo: NetworkInfo
  ): RiskAssessment {
    // Simple risk scoring logic - in production this would be more sophisticated
    let riskScore = 0;
    const riskFactors: string[] = [];
    
    // Check for basic risk signals
    if (transaction.amount > 1000) {
      riskScore += 20;
      riskFactors.push('high_amount');
    }
    
    if (networkInfo.isVpn) {
      riskScore += 15; 
      riskFactors.push('vpn_detected');
    }
    
    // Add null check for ipRiskScore
    if (networkInfo.ipRiskScore !== undefined && networkInfo.ipRiskScore > 50) {
      riskScore += 10;
      riskFactors.push('suspicious_ip');
    }
    
    if (deviceInfo.isEmulator) {
      riskScore += 25;
      riskFactors.push('emulator_detected');
    }
    
    // Determine if we need cloud verification
    // Add null check for ipRiskScore
    const requiresRemoteVerification = 
      riskScore > 30 || 
      transaction.amount > 500 ||
      (networkInfo.ipRiskScore !== undefined && networkInfo.ipRiskScore > 70);
      
    return {
      riskScore,
      riskFactors,
      requiresRemoteVerification,
      isLocalOnly: true,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Merge local and cloud assessment results
   * Combines signals from both sources for comprehensive risk analysis
   * @param local - Local risk assessment
   * @param cloud - Cloud risk assessment
   * @returns Merged risk assessment
   */
  public mergeAssessments(local: RiskAssessment, cloud: RiskAssessment): RiskAssessment {
    // Use Array.from to ensure compatibility with ES5 target
    const localFactors = local.riskFactors || [];
    const cloudFactors = cloud.riskFactors || [];
    const allFactors = [...localFactors, ...cloudFactors];
    const mergedFactors = Array.from(new Set(allFactors));
    
    return {
      // Use cloud score but adjust slightly based on local assessment
      riskScore: cloud.riskScore,
      riskFactors: mergedFactors,
      requiresRemoteVerification: false, // Already verified
      isLocalOnly: false,
      cloudVerified: true,
      timestamp: cloud.timestamp || new Date().toISOString(),
      localAssessmentTime: local.timestamp,
      additionalContext: cloud.additionalContext
    };
  }

  /**
   * Get the local risk threshold
   * @returns The current local risk threshold
   */
  public getLocalRiskThreshold(): number {
    return this.localRiskThreshold;
  }

  /**
   * Update the local risk threshold
   * @param threshold - New threshold value
   */
  public setLocalRiskThreshold(threshold: number): void {
    this.localRiskThreshold = threshold;
  }
}
