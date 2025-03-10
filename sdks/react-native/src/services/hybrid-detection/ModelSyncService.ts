
/**
 * ModelSyncService.ts
 * 
 * Handles synchronization of detection models between the server and device.
 */

import { FraudClient } from '../FraudClient';

/**
 * Service for synchronizing detection models
 */
export class ModelSyncService {
  private apiClient: FraudClient;
  private lastSyncTimestamp: number = 0;
  private syncIntervalMs: number;

  /**
   * Create a new model synchronization service
   * @param apiClient - FraudClient instance for API communication
   * @param syncIntervalMs - Interval between syncs in milliseconds (default: 24 hours)
   */
  constructor(apiClient: FraudClient, syncIntervalMs: number = 24 * 60 * 60 * 1000) {
    this.apiClient = apiClient;
    this.syncIntervalMs = syncIntervalMs;
  }

  /**
   * Update local detection models with latest patterns from the server
   * This keeps the on-device detection capabilities current
   * @returns Promise resolving when sync is complete
   */
  public async syncDetectionModels(): Promise<void> {
    try {
      // Only sync if more than the specified interval since last sync
      const now = Date.now();
      if (now - this.lastSyncTimestamp < this.syncIntervalMs) {
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

  /**
   * Get the timestamp of the last successful sync
   * @returns Timestamp of the last sync
   */
  public getLastSyncTimestamp(): number {
    return this.lastSyncTimestamp;
  }

  /**
   * Set the sync interval
   * @param intervalMs - New interval in milliseconds
   */
  public setSyncInterval(intervalMs: number): void {
    this.syncIntervalMs = intervalMs;
  }
}
