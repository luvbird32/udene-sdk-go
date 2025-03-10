
/**
 * HybridDetectionEngine.ts
 * 
 * This service handles fraud detection using a hybrid approach - combining 
 * on-device processing with server-side analysis for optimal performance and accuracy.
 */

import { DeviceInfo, NetworkInfo, TransactionData, RiskAssessment } from '../types';
import { FraudClient } from './FraudClient';

/**
 * Class responsible for implementing hybrid fraud detection logic
 * Combines on-device analysis with cloud-based verification
 */
export class HybridDetectionEngine {
  private apiClient: FraudClient;
  private deviceFingerprint: string | null = null;
  private localRiskThreshold: number;
  private lastSyncTimestamp: number = 0;

  /**
   * Create a new instance of the hybrid detection engine
   * 
   * @param apiClient - Instance of FraudClient for API communication
   * @param localRiskThreshold - Threshold for local risk assessment (0-100)
   */
  constructor(apiClient: FraudClient, localRiskThreshold: number = 50) {
    this.apiClient = apiClient;
    this.localRiskThreshold = localRiskThreshold;
    this.initializeDeviceFingerprint();
  }

  /**
   * Initialize device fingerprinting for local device identification
   * This helps correlate device data across sessions
   */
  private async initializeDeviceFingerprint(): Promise<void> {
    try {
      // Generate or retrieve stored device fingerprint
      // Implementation would depend on device capabilities
      this.deviceFingerprint = await this.generateDeviceFingerprint();
      console.log('Device fingerprint initialized:', this.deviceFingerprint);
    } catch (error) {
      console.error('Error initializing device fingerprint:', error);
    }
  }

  /**
   * Generate a unique device fingerprint based on device characteristics
   * In a real implementation, this would use device-specific attributes
   */
  private async generateDeviceFingerprint(): Promise<string> {
    // Simplified implementation - in production this would use
    // device properties, hardware IDs, etc.
    return 'fp-' + Math.random().toString(36).substring(2, 15);
  }

  /**
   * Analyze transaction with hybrid approach
   * 1. First perform quick local analysis
   * 2. If risk exceeds threshold or requires additional verification,
   *    send to cloud for comprehensive analysis
   * 
   * @param transaction - Transaction data to analyze
   * @param deviceInfo - Current device information
   * @param networkInfo - Current network information
   * @returns Promise resolving to risk assessment result
   */
  public async analyzeTransaction(
    transaction: TransactionData,
    deviceInfo: DeviceInfo,
    networkInfo: NetworkInfo
  ): Promise<RiskAssessment> {
    // Step 1: Perform local analysis first (faster response)
    const localAssessment = this.performLocalAnalysis(transaction, deviceInfo, networkInfo);
    
    // If local risk is low, return immediately for better performance
    if (localAssessment.riskScore < this.localRiskThreshold && !localAssessment.requiresRemoteVerification) {
      console.log('Using local assessment only:', localAssessment);
      return localAssessment;
    }
    
    // Step 2: For higher risk or complex cases, supplement with cloud analysis
    try {
      console.log('Local assessment triggered remote verification');
      const cloudAssessment = await this.apiClient.analyzeTransaction({
        transaction,
        deviceFingerprint: this.deviceFingerprint,
        deviceInfo,
        networkInfo,
        localAssessment
      });
      
      // Combine insights from both local and cloud assessments
      return this.mergeAssessments(localAssessment, cloudAssessment);
    } catch (error) {
      console.error('Error in remote analysis, falling back to local assessment:', error);
      // Fallback to local assessment if remote fails
      return {
        ...localAssessment,
        error: 'Remote analysis failed, using local assessment only',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * Perform quick local analysis using on-device algorithms
   * This provides immediate feedback without network latency
   */
  private performLocalAnalysis(
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
    
    // Fix: Add null check for ipRiskScore
    if (networkInfo.ipRiskScore !== undefined && networkInfo.ipRiskScore > 50) {
      riskScore += 10;
      riskFactors.push('suspicious_ip');
    }
    
    if (deviceInfo.isEmulator) {
      riskScore += 25;
      riskFactors.push('emulator_detected');
    }
    
    // Determine if we need cloud verification
    // Fix: Add null check for ipRiskScore
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
   */
  private mergeAssessments(local: RiskAssessment, cloud: RiskAssessment): RiskAssessment {
    // Fix: Use Array.from to ensure compatibility with ES5 target
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
   * Update local detection models with latest patterns from the server
   * This keeps the on-device detection capabilities current
   */
  public async syncDetectionModels(): Promise<void> {
    try {
      // Only sync if more than 24 hours since last sync
      const now = Date.now();
      if (now - this.lastSyncTimestamp < 24 * 60 * 60 * 1000) {
        console.log('Skipping model sync, recently updated');
        return;
      }
      
      const modelData = await this.apiClient.getDetectionModels();
      console.log('Successfully synced detection models');
      this.lastSyncTimestamp = now;
      
      // Here we would update local detection algorithms based on new patterns
      // This is simplified for the example
    } catch (error) {
      console.error('Failed to sync detection models:', error);
    }
  }
}
