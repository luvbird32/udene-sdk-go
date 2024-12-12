export function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => 
    Array(a.length + 1).fill(null)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
}

export function generateRecommendations(
  riskScore: number,
  patterns: string[],
  hasDomainSpoofing: boolean
): string[] {
  const recommendations = [];

  if (riskScore > 80) {
    recommendations.push('Immediately verify sender through alternative communication channel');
    recommendations.push('Do not act on any payment-related instructions');
  }

  if (patterns.includes('similar_domain')) {
    recommendations.push('Verify sender domain authenticity');
  }

  if (hasDomainSpoofing) {
    recommendations.push('Enable additional email authentication protocols');
  }

  return recommendations;
}