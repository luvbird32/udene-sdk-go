/**
 * Utility functions for API key management
 * @module apiKeyUtils
 */

/**
 * Generates a cryptographically secure API key of specified length
 * @param {number} length - The desired length of the API key
 * @returns {string} A secure random string suitable for use as an API key
 * @example
 * ```typescript
 * const apiKey = generateSecureApiKey(32);
 * // Returns a random 32-character string like "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
 * ```
 */
export function generateSecureApiKey(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  
  return result;
}