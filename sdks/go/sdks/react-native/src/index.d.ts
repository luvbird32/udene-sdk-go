import React, { ReactNode } from 'react';
import { UdeneClient, UdeneInteraction, UdeneMetrics } from './services/FraudClient';
interface FraudContextType {
    client: UdeneClient | null;
    trackInteraction: (interaction: UdeneInteraction) => Promise<void>;
    getMetrics: () => Promise<UdeneMetrics>;
}
interface FraudProviderProps {
    apiKey: string;
    baseUrl?: string;
    children: ReactNode;
}
export declare const FraudProvider: React.FC<FraudProviderProps>;
export declare const useFraud: () => FraudContextType;
export { UdeneClient, UdeneInteraction, UdeneMetrics };
export default UdeneClient;
interface UdeneClientConfig {
    apiKey: string;
    baseURL?: string;
    platform?: 'ios' | 'android';
}
/**
 * UdeneClient for React Native
 * A client for interacting with the Udene Fraud Detection API
 */
export declare class UdeneClient {
    private client;
    private platform;
    /**
     * Create a new UdeneClient instance
     * @param config - Configuration options for the client
     */
    constructor({ apiKey, baseURL, platform }: UdeneClientConfig);
    /**
     * Get fraud metrics for the current user/device
     * @returns Fraud metrics data
     */
    getMetrics(): Promise<any>;
    /**
     * Get activity data for analysis
     * @returns Activity data
     */
    getActivity(): Promise<any>;
    /**
     * Track a user interaction for fraud analysis
     * @param data - Interaction data to track
     * @returns Tracking confirmation
     */
    trackInteraction(data: any): Promise<any>;
    /**
     * Analyze an email for Business Email Compromise (BEC) threats
     * @param emailData - Email data to analyze
     * @returns BEC analysis results
     */
    analyzeBEC(emailData: any): Promise<any>;
}
interface FraudContextType {
    client: UdeneClient | null;
    trackInteraction: (data: any) => Promise<any>;
    getMetrics: () => Promise<any>;
}
interface FraudProviderProps {
    apiKey: string;
    baseURL?: string;
    children: ReactNode;
}
/**
 * Provider component for Fraud detection features
 */
export declare const FraudProvider: React.FC<FraudProviderProps>;
/**
 * Hook for accessing fraud detection functionality
 * @returns Fraud detection methods and client
 */
export declare const useFraud: () => FraudContextType;
