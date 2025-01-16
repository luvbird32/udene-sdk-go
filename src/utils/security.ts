import DOMPurify from 'dompurify';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
};

export const validateInput = (input: string): boolean => {
  // Check for common malicious patterns
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /onload=/gi,
    /onerror=/gi
  ];

  return !maliciousPatterns.some(pattern => pattern.test(input));
};

export const sanitizeMetrics = (metrics: Record<string, any>): Record<string, any> => {
  return Object.entries(metrics).reduce((acc, [key, value]) => {
    // Only allow numbers and strings
    if (typeof value === 'number' || typeof value === 'string') {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};