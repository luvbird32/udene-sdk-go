
/**
 * HybridDetectionEngine.ts
 * 
 * This file re-exports the HybridDetectionEngine from the new modular structure
 * to maintain backward compatibility with existing imports.
 * 
 * This ensures no references to non-existent directories like 'ist' are created during build.
 */

export { HybridDetectionEngine } from './hybrid-detection';
