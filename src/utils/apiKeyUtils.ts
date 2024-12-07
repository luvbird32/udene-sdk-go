/**
 * Generates a cryptographically secure API key of specified length
 * @param length The desired length of the API key
 * @returns A secure random string suitable for use as an API key
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