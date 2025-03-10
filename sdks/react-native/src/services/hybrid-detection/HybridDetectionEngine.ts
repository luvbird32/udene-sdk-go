
/**
 * HybridDetectionEngine.ts
 * 
 * This service coordinates the hybrid approach to fraud detection,
 * combining on-device processing with server-side analysis.
 */

import { DeviceInfo, NetworkInfo, TransactionData, RiskAssessment } from '../../types';
import { FraudClient } from '../FraudClient';
import { DeviceFingerprintService } from './DeviceFingerprintService';
import { RiskAssessmentService } from './RiskAssessmentService';
import { ModelSyncService } from './ModelSyncService';

/**
 * Main class responsible for coordinating hybrid fraud detection
 * Combines on-device analysis with cloud-based verification
 */
export class HybridDetectionEngine {
  private apiClient: FraudClient;
  private deviceFingerprintService: DeviceFingerprintService;
  private riskAssessmentService: RiskAssessmentService;
  private modelSyncService: ModelSyncService;

  /**
   * Create a new instance of the hybrid detection engine
   * 
   * @param apiClient - Instance of FraudClient for API communication
   * @param localRiskThreshold - Threshold for local risk assessment (0-100)
   * @param modelSyncInterval - Interval for model synchronization in ms
   */
  constructor(
    apiClient: FraudClient, 
    localRiskThreshold: number = 50,
    modelSyncInterval: number = 24 * 60 * 60 * 1000
  ) {
    this.apiClient = apiClient;
    this.deviceFingerprintService = new DeviceFingerprintService();
    this.riskAssessmentService = new RiskAssessmentService(localRiskThreshold);
    this.modelSyncService = new ModelSyncService(apiClient, modelSyncInterval);
    
    // Initialize device fingerprinting
    this.initializeServices();
  }

  /**
   * Initialize all required services
   */
  private async initializeServices(): Promise<void> {
    await this.deviceFingerprintService.initialize();
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
    const localAssessment = this.riskAssessmentService.performLocalAnalysis(
      transaction,
      deviceInfo,
      networkInfo
    );
    
    // If local risk is low, return immediately for better performance
    if (
      localAssessment.riskScore < this.riskAssessmentService.getLocalRiskThreshold() && 
      !localAssessment.requiresRemoteVerification
    ) {
      console.log('Using local assessment only:', localAssessment);
      return localAssessment;
    }
    
    // Step 2: For higher risk or complex cases, supplement with cloud analysis
    try {
      console.log('Local assessment triggered remote verification');
      const cloudAssessment = await this.apiClient.analyzeTransaction({
        transaction,
        deviceFingerprint: this.deviceFingerprintService.getFingerprint(),
        deviceInfo,
        networkInfo,
        localAssessment
      });
      
      // Combine insights from both local and cloud assessments
      return this.riskAssessmentService.mergeAssessments(localAssessment, cloudAssessment);
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
   * Update local detection models with latest patterns from the server
   * This keeps the on-device detection capabilities current
   */
  public async syncDetectionModels(): Promise<void> {
    await this.modelSyncService.syncDetectionModels();
  }
}
